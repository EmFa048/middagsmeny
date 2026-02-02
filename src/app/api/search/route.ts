import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface Distributor {
    id: string;
    name: string;
    organization?: string;
    address?: {
        addressLocality?: string;
    };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();

    if (!query) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    try {
        // 1. Fetch the homepage
        const response = await fetch('https://menu.matildaplatform.com/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch Matilda homepage' }, { status: response.status });
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const nextDataScript = $('#__NEXT_DATA__').html();

        if (!nextDataScript) {
            return NextResponse.json({ error: 'Could not find data on page' }, { status: 404 });
        }

        const json = JSON.parse(nextDataScript);
        const distributors: Distributor[] = json.props?.pageProps?.distributors || [];

        // 2. Filter locally
        const results = distributors.filter(d =>
            (d.name && d.name.toLowerCase().includes(query)) ||
            (d.address?.addressLocality && d.address.addressLocality.toLowerCase().includes(query))
        ).map(d => ({
            id: d.id,
            name: d.name,
            locality: d.address?.addressLocality || '',
            // Matilda URLs use [id]_[organization] or [id]_[slugified-name]
            url: `https://menu.matildaplatform.com/meals/week/${d.id}_${d.organization || slugify(d.name)}`
        }));

        return NextResponse.json({ results: results.slice(0, 100) }); // Limit to 100

    } catch (error) {
        console.error('Error searching:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

function slugify(text: string) {
    const swedishMap: { [key: string]: string } = { 'å': 'a', 'ä': 'a', 'ö': 'o', 'Å': 'a', 'Ä': 'a', 'Ö': 'o' };
    return text
        .toString()
        .split('')
        .map(char => swedishMap[char] || char)
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

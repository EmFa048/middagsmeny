import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const menuUrl = searchParams.get('url');

    if (!menuUrl) {
        return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    try {
        const response = await fetch(menuUrl);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch menu from Matilda' }, { status: response.status });
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        const nextDataScript = $('#__NEXT_DATA__').html();

        if (!nextDataScript) {
            return NextResponse.json({ error: 'Could not find menu data on page' }, { status: 404 });
        }

        const json = JSON.parse(nextDataScript);

        // Extract relevant parts
        const meals = json.props?.pageProps?.meals;
        const nextURL = json.props?.pageProps?.nextURL;
        const previousURL = json.props?.pageProps?.previousURL;

        if (!meals) {
            return NextResponse.json({ error: 'Invalid data structure from Matilda' }, { status: 500 });
        }

        return NextResponse.json({
            meals,
            previousURL: previousURL ? `https://menu.matildaplatform.com${previousURL}` : null,
            nextURL: nextURL ? `https://menu.matildaplatform.com${nextURL}` : null
        });

    } catch (error) {
        console.error('Error scraping menu:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

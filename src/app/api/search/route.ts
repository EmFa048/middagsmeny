import { NextResponse } from 'next/server';

interface Distributor {
    id: string;
    name: string;
    address?: {
        addressLocality?: string | null;
    };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();

    if (!query) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    try {
        const response = await fetch('https://menu.matildaplatform.com/api/distributors', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch distributors from Matilda' }, { status: response.status });
        }

        const json = await response.json();
        const distributors: Distributor[] = json.distributors || [];

        const results = distributors.filter(d =>
            (d.name && d.name.toLowerCase().includes(query)) ||
            (d.address?.addressLocality && d.address.addressLocality.toLowerCase().includes(query))
        ).map(d => ({
            id: d.id,
            name: d.name,
            locality: d.address?.addressLocality || '',
        }));

        return NextResponse.json({ results: results.slice(0, 100) });

    } catch (error) {
        console.error('Error searching:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

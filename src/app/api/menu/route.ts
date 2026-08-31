import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const distributorId = searchParams.get('distributorId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!distributorId || !startDate || !endDate) {
        return NextResponse.json(
            { error: 'Missing required parameters: distributorId, startDate, endDate' },
            { status: 400 }
        );
    }

    try {
        const matildaParams = new URLSearchParams({
            distributorId,
            startDate,
            endDate,
            lang: 'sv',
        });

        const response = await fetch(
            `https://menu.matildaplatform.com/api/menu?${matildaParams.toString()}`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                },
            }
        );

        if (response.status === 404) {
            return NextResponse.json({ meals: [] });
        }

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch menu from Matilda' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const meals = data.meals || [];

        return NextResponse.json({ meals });

    } catch (error) {
        console.error('Error fetching menu:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

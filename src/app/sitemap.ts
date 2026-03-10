import { MetadataRoute } from 'next';

const POPULAR_SCHOOLS = [
    { id: '18606000', name: 'Engelbrektsskolan' },
    { id: '14264000', name: 'Gärdesskolan' },
    { id: '19001000', name: 'Eriksdalsskolan' },
    { id: '14261000', name: 'Gustav Vasa skola' },
    { id: '18683000', name: 'Katarina Norra skola' },
    { id: '18610000', name: 'Matteusskolan' },
    { id: '18608000', name: 'Norra Real' },
    { id: '18607000', name: 'Östra Real' },
    { id: '18681000', name: 'Kungsholmens gymnasium' },
    { id: '18682000', name: 'Södra Latin' },
];

function slugify(text: string) {
    const swedishMap: { [key: string]: string } = { 'å': 'a', 'ä': 'a', 'ö': 'o', 'Å': 'a', 'Ä': 'a', 'Ö': 'o' };
    return text
        .toString()
        .split('')
        .map(char => swedishMap[char] || char)
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://middagsmeny.se';

    const schoolUrls = POPULAR_SCHOOLS.map(school => ({
        url: `${baseUrl}/?school=${encodeURIComponent(`https://menu.matildaplatform.com/meals/week/${school.id}_${slugify(school.name)}`)}&name=${encodeURIComponent(school.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        ...schoolUrls,
    ];
}

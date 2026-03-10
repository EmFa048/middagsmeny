import { MetadataRoute } from 'next';

const POPULAR_SCHOOLS = [
    { id: '644bb58335c2a5fea7d2d9e3', name: 'Arenaskolan' },
    { id: '6474928f5ed89d169f45b876', name: 'LID Dalängskolan' },
    { id: '64a411c6469920bc655c117a', name: 'Härnösand Skola/Förskola' },
    { id: '659fee1037b0fb7f7caca147', name: 'Strängnäs matsedel' },
    { id: '63fc92f1ccb95f5ce570f7b3', name: 'Vasaskolan' },
    { id: '63fc8cc3ccb95f5ce57053fa', name: 'Junibackens skola' },
    { id: '6438f54a9545101593546fcb', name: 'Björkängsskolan' },
    { id: '6436962095451015931bf7b7', name: 'Skola - Bergsjö skola 4-9' },
    { id: '6438f76a954510159354a7fa', name: 'Moholm skola' },
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

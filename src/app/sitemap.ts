import { MetadataRoute } from 'next';

const POPULAR_SCHOOLS = [
    { id: '6400747a41b4e4e00179ce82', name: 'Förskolor', url: 'https://menu.matildaplatform.com/meals/week/6400747a41b4e4e00179ce82_alvkarleby' },
    { id: '64a7cb24469920bc655c117a', name: 'Härnösand Skola/Förskola', url: 'https://menu.matildaplatform.com/meals/week/64a411c6469920bc655c117a_harnosand' },
    { id: '64a7cb24469920bc65b4e835', name: 'Fryele skola', url: 'https://menu.matildaplatform.com/meals/week/64a7cb24469920bc65b4e835_varnamo' },
    { id: '6436962095451015931bf7ce', name: 'Skola - Gnarp skola', url: 'https://menu.matildaplatform.com/meals/week/6436962095451015931bf7ce_nordanstig' },
    { id: '6474928f5ed89d169f45b876', name: 'LID Dalängskolan', url: 'https://menu.matildaplatform.com/meals/week/6474928f5ed89d169f45b876_goliska' },
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
        url: `${baseUrl}/?school=${encodeURIComponent(school.url)}&name=${encodeURIComponent(school.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
        { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
        { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
        { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
        { url: `${baseUrl}/om-oss`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
        { url: `${baseUrl}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
        { url: `${baseUrl}/hur-det-fungerar`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
        { url: `${baseUrl}/artiklar/matplanering-tips`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/variation-i-kosten`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/hur-skolmaten-fungerar`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/nyttig-mat-for-barn`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/matsvinn-tips`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/vegetariska-barnfavoriter`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/budget-smart-mat`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/mellis-tips`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/matlagning-med-barn`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/sasongsmat-guide`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/frukost-inspiration`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/atstorningar-prevention`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/hell-hour-overlevnad`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/artiklar/trevlig-stamning-middag`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    ];

    return [
        ...staticPages,
        ...schoolUrls,
    ];
}

'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO, startOfWeek, endOfWeek, addWeeks } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Search, Utensils, ChefHat, Leaf, Fish, AlertCircle, Heart, RefreshCw, Share2, Coffee, X, ExternalLink, Cookie, Pencil } from 'lucide-react';
import { DayMenu, SchoolMeal, Dish, DEFAULT_DISHES, generateMockSuggestion, processMenu, extractDistributorId } from '@/utils/menuUtils';


interface DinnerAppProps {
  initialMenu?: DayMenu[];
  initialSchool?: { distributorId: string; name: string };
}

export default function DinnerApp({ initialMenu, initialSchool }: DinnerAppProps) {
  const router = useRouter();

  // Navigation State — week offset relative to current week
  const [weekOffset, setWeekOffset] = useState(0);

  // Initialise state with SSR data if provided
  const [distributorId, setDistributorId] = useState(extractDistributorId(initialSchool?.distributorId || ''));
  const [searchQuery, setSearchQuery] = useState(initialSchool?.name || '');
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState<DayMenu[]>(initialMenu || []);
  const [error, setError] = useState('');

  // Search State
  const [searchResults, setSearchResults] = useState<{ id: string, name: string, locality: string, url: string }[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Favorites & Custom Dishes State
  const [favorites, setFavorites] = useState<{ name: string; url: string }[]>([]);
  const [favoriteDishNames, setFavoriteDishNames] = useState<string[]>([]);
  const [customDishes, setCustomDishes] = useState<any[]>([]); // Using any for simplicity in this specific block, ideally typed
  const [showAddDish, setShowAddDish] = useState(false);
  const [newDish, setNewDish] = useState({ dish: '', description: '', vegetarian: false, tags: '' });
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editSearchQuery, setEditSearchQuery] = useState('');

  // Ad Overlay State
  const [showAd, setShowAd] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);

    // Öppna Mathem (byt ut länken till din affiliate-länk senare)
    setTimeout(() => {
      window.open('https://www.mathem.se', '_blank');
    }, 500);
  };

  // Load from LocalStorage on Mount AND Check Ad Status
  useEffect(() => {
    const savedFavs = localStorage.getItem('mm_favorites');
    if (savedFavs) {
      try {
        const parsed = JSON.parse(savedFavs);
        const sanitized = parsed.map((f: any) => ({ ...f, url: extractDistributorId(f.url) }));
        setFavorites(sanitized);
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }

    const savedDishes = localStorage.getItem('mm_custom_dishes');
    if (savedDishes) setCustomDishes(JSON.parse(savedDishes));

    const savedFavDishes = localStorage.getItem('mm_favorite_dishes');
    if (savedFavDishes) setFavoriteDishNames(JSON.parse(savedFavDishes));

    // REMOVED: Autopopup of Ads. This is frowned upon by AdSense crawlers
    // if there is no high-value user interaction first.
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('mm_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('mm_custom_dishes', JSON.stringify(customDishes));
  }, [customDishes]);

  useEffect(() => {
    localStorage.setItem('mm_favorite_dishes', JSON.stringify(favoriteDishNames));
  }, [favoriteDishNames]);


  const [preferences, setPreferences] = useState({
    vegetarian: false,
    noPork: false,
    noFish: false,
  });

  // Read URL param and fetch
  // Track fetching to prevent loops
  const lastFetchedKey = useRef('');
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const currentDistributorId = useRef(extractDistributorId(initialSchool?.distributorId || ''));

  // Helper to compute week start/end dates from offset
  const getWeekDates = (offset: number) => {
    const targetWeek = addWeeks(new Date(), offset);
    const start = startOfWeek(targetWeek, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(targetWeek, { weekStartsOn: 1 }); // Sunday
    return {
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd'),
    };
  };

  // Load params on mount (Client Side Only)
  useEffect(() => {
    if (initialLoadDone) return;

    const params = new URLSearchParams(window.location.search);
    const schoolParam = params.get('school');
    const nameParam = params.get('name');

    if (schoolParam) {
      setDistributorId(extractDistributorId(schoolParam));
      if (nameParam) {
        setSearchQuery(nameParam);
      }
    }

    setInitialLoadDone(true);
  }, [initialLoadDone]);


  // Sync state BACK to URL (Deep linking)
  useEffect(() => {
    if (!distributorId || !initialLoadDone) return;
    if (currentDistributorId.current !== distributorId) return;

    const params = new URLSearchParams(window.location.search);
    let needsUpdate = false;

    // Sync School
    if (params.get('school') !== distributorId) {
      params.set('school', distributorId);
      needsUpdate = true;
    }

    // Sync Name (to preserve characters like Ö)
    const currentNameParam = params.get('name');
    if (searchQuery && currentNameParam !== searchQuery) {
      params.set('name', searchQuery);
      needsUpdate = true;
    }

    // Sync Suggestions
    menu.forEach(day => {
      if (day.dinnerSuggestion) {
        const key = `s_${day.date}`;
        if (params.get(key) !== day.dinnerSuggestion.dish) {
          params.set(key, day.dinnerSuggestion.dish);
          needsUpdate = true;
        }
      }
    });

    if (needsUpdate) {
      window.history.replaceState(null, '', `?${params.toString()}`);
    }
  }, [distributorId, menu, searchQuery]);

  const handleShare = async () => {
    const shareTitle = 'Middagsmeny';

    // 1. Skapa den snygga listan för textmeddelandet
    const dishList = menu
      .filter(day => day.dinnerSuggestion)
      .map(day => {
        const dayName = format(parseISO(day.date), 'eeee', { locale: sv });
        const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        return `• ${capitalizedDay}: ${day.dinnerSuggestion!.dish}`;
      })
      .join('\n');

    const finalUrl = window.location.href;
    const shareText = `Här är veckans middagsplanering:\n\n${dishList}\n\nKolla in hela matsedeln här:`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: finalUrl,
        });
      }
      else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${shareText}\n${finalUrl}`);
        alert('Planeringen och länk är kopierad!');
      }
      else {
        const textArea = document.createElement("textarea");
        textArea.value = `${shareText}\n${finalUrl}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        alert('Planeringen och länk är kopierad!');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') console.error('Error sharing:', err);
    }
  };

  // Debounce search could be better, but simple async for now
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setError('');
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.results) {
        const sorted = data.results.sort((a: any, b: any) => a.name.localeCompare(b.name, 'sv'));
        setSearchResults(sorted);
        setShowResults(true);
      }
    } catch (e) {
      console.error("Search failed", e);
    }
  };

  const selectSchool = (school: { id: string, name: string }) => {
    setDistributorId(extractDistributorId(school.id));
    setSearchQuery(school.name);
    setWeekOffset(0);
    setSearchResults([]);
    setShowResults(false);
  };

  const toggleFavorite = () => {
    const cleanId = extractDistributorId(distributorId);
    const exists = favorites.find(f => extractDistributorId(f.url) === cleanId);
    if (exists) {
      setFavorites(favorites.filter(f => extractDistributorId(f.url) !== cleanId));
    } else {
      const name = searchQuery && searchQuery.length > 2 ? searchQuery : 'Min Skola';
      setFavorites([...favorites, { name, url: cleanId }]);
    }
  };

  const toggleDishFavorite = (dishName: string) => {
    if (favoriteDishNames.includes(dishName)) {
      setFavoriteDishNames(favoriteDishNames.filter(n => n !== dishName));
    } else {
      setFavoriteDishNames([...favoriteDishNames, dishName]);
    }
  };

  // Helper to get current favorite status
  const isFavorite = favorites.some(f => extractDistributorId(f.url) === extractDistributorId(distributorId));

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.dish) return;

    const dishObj = {
      dish: newDish.dish,
      description: newDish.description,
      vegetarian: newDish.vegetarian,
      tags: newDish.tags.split(',').map(t => t.trim()),
      avoidIfSchoolServes: [] // Simplified for custom dishes
    };

    setCustomDishes([...customDishes, dishObj]);
    setNewDish({ dish: '', description: '', vegetarian: false, tags: '' });
    setShowAddDish(false);
  };

  const handleSelectManualDish = (date: string, selectedDish: any) => {
    setMenu(prevMenu => prevMenu.map(day => {
      if (day.date === date) {
        return {
          ...day,
          dinnerSuggestion: {
            dish: selectedDish.dish,
            description: selectedDish.description,
            vegetarian: selectedDish.vegetarian,
            recipeLink: `https://www.google.com/search?q=recept+${encodeURIComponent(selectedDish.dish)}`,
            matchReason: 'Manuellt valt förslag'
          }
        };
      }
      return day;
    }));
    setEditingDay(null);
    setEditSearchQuery('');
  };

  const handleSetCustomManualDish = (date: string, dishName: string) => {
    if (!dishName) return;
    const selectedDish = {
      dish: dishName,
      description: 'Eget förslag',
      vegetarian: false,
    };
    handleSelectManualDish(date, selectedDish);
  };


  const regenerateSuggestion = (date: string) => {
    setMenu(prevMenu => {
      // Collect all OTHER dishes currently showing to avoid duplicates
      const otherDishes = prevMenu
        .filter(day => day.date !== date && day.dinnerSuggestion)
        .map(day => day.dinnerSuggestion!.dish);

      // Add potentially the CURRENT dish to avoid list too? 
      // Yes, if we are regenerating, we probably don't want the SAME one back immediately.
      const currentDay = prevMenu.find(d => d.date === date);
      if (currentDay?.dinnerSuggestion) {
        otherDishes.push(currentDay.dinnerSuggestion.dish);
      }

      return prevMenu.map(day => {
        if (day.date === date) {
          return {
            ...day,
            dinnerSuggestion: generateMockSuggestion(day.schoolMeals, preferences, customDishes, favoriteDishNames, otherDishes)
          };
        }
        return day;
      });
    });
  };

  const fetchMenu = async (overrideOffset?: number, clearSuggestions = false) => {
    const activeId = extractDistributorId(distributorId);
    const activeOffset = overrideOffset !== undefined ? overrideOffset : weekOffset;

    if (!activeId) return;

    // Build a unique key to prevent re-fetching the same data
    const fetchKey = `${activeId}_${activeOffset}`;
    if (fetchKey === lastFetchedKey.current && !clearSuggestions) return;
    lastFetchedKey.current = fetchKey;

    if (clearSuggestions) {
      // Clear all suggestion params from the URL to allow a fresh shuffle
      const params = new URLSearchParams(window.location.search);
      Array.from(params.keys()).forEach(key => {
        if (key.startsWith('s_')) params.delete(key);
      });
      window.history.replaceState(null, '', `?${params.toString()}`);
    }

    setLoading(true);
    setError('');

    try {
      const { startDate, endDate } = getWeekDates(activeOffset);
      const res = await fetch(`/api/menu?distributorId=${encodeURIComponent(activeId)}&startDate=${startDate}&endDate=${endDate}`);

      // If a newer fetch has started, discard this stale response
      if (fetchKey !== lastFetchedKey.current) return;

      if (!res.ok) throw new Error('Kunde inte hämta menyn');
      const data = await res.json();

      if (fetchKey !== lastFetchedKey.current) return;

      if (!data.meals || data.meals.length === 0) {
        setMenu([]);
        currentDistributorId.current = activeId;
        setLoading(false);
        return;
      }

      // Group by date
      const grouped = new Map<string, SchoolMeal[]>();
      data.meals.forEach((m: SchoolMeal) => {
        const date = m.date.split('T')[0];
        if (!grouped.has(date)) grouped.set(date, []);
        grouped.get(date)?.push(m);
      });

      const processedMenu: DayMenu[] = [];
      const usedDishes: string[] = [];
      const sortedDates = Array.from(grouped.keys()).sort();
      const currentParams = new URLSearchParams(window.location.search);

      for (const date of sortedDates) {
        const mealsForDay = grouped.get(date)!;
        const sharedDish = currentParams.get('s_' + date) || undefined;
        const suggestion = generateMockSuggestion(mealsForDay, preferences, customDishes, favoriteDishNames, usedDishes, sharedDish);

        if (suggestion) {
          usedDishes.push(suggestion.dish);
        }

        processedMenu.push({
          date,
          schoolMeals: mealsForDay,
          dinnerSuggestion: suggestion,
        });
      }

      setMenu(processedMenu);
      currentDistributorId.current = activeId;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when distributorId or weekOffset changes
  useEffect(() => {
    fetchMenu();
  }, [distributorId, weekOffset]);


  return (
    <>
      <main className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Settings / Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 border border-slate-100">

          {/* RAD 1: Sökfält & Se meny */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 md:flex-[4] relative group">
              <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowResults(true)}
                placeholder="Sök skola (t.ex. Malmö)..."
                className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none transition-all h-[42px]"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setShowResults(false);
                  }}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-brand-blue"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-[100] mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 border-b border-slate-50 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Sökresultat</span>
                  </div>
                  {searchResults.map((school) => (
                    <button
                      key={school.id}
                      onClick={() => selectSchool(school)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 flex flex-col gap-0.5"
                    >
                      <span className="text-sm font-semibold text-slate-800">{school.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{school.locality}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { lastFetchedKey.current = ''; fetchMenu(undefined, true); }}
              disabled={loading}
              className="md:flex-1 h-[42px] bg-brand-blue hover:bg-brand-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 whitespace-nowrap shadow-sm"
            >
              {loading ? 'Hämtar...' : 'Se meny'}
            </button>
          </div >

          {/* RAD 2: Funktioner */}
          < div className="grid grid-cols-1 md:grid-cols-3 gap-3" >
            <button
              onClick={toggleFavorite}
              className={`h-[42px] rounded-lg border transition-colors flex items-center justify-center gap-2 group ${isFavorite ? 'bg-brand-yellow text-brand-dark border-brand-yellow shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:text-brand-yellow hover:border-brand-yellow'}`}
              title={isFavorite ? "Ta bort från genvägar" : "Spara skola till dina genvägar"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="text-sm font-bold">{isFavorite ? 'Sparad skola' : 'Spara skola'}</span>
            </button>

            <button
              onClick={handleShare}
              className="h-[42px] rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-brand-blue hover:border-brand-blue transition-colors flex items-center justify-center gap-2"
              title="Kopiera och dela veckans middagar"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Dela veckomeny</span>
            </button>

            <button
              onClick={() => { lastFetchedKey.current = ''; fetchMenu(undefined, true); }}
              disabled={loading}
              className="h-[42px] bg-brand-yellow hover:bg-[#ffc800] text-brand-dark rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-sm">Slumpa ny meny</span>
            </button>
          </div >

          {
            favorites.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-brand-red" /> Mina sparade skolor
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide py-1">
                  {favorites.map((fav, i) => (
                    <div key={i} className="relative group/fav">
                      <button
                        onClick={() => {
                          setDistributorId(fav.url);
                          setSearchQuery(fav.name);
                          setWeekOffset(0);
                        }}
                        className={`whitespace-nowrap px-3 py-1.5 pr-8 text-xs font-medium rounded-full border transition-all ${distributorId === fav.url ? 'bg-brand-blue text-white border-brand-blue shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue hover:text-brand-blue'}`}
                      >
                        {fav.name}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFavorites(favorites.filter(f => f.url !== fav.url));
                        }}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-black/10 transition-colors ${distributorId === fav.url ? 'text-white/70 hover:text-white' : 'text-slate-400 hover:text-brand-red'}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          < div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-y-3 gap-x-4 mt-2" >
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPreferences({ ...preferences, vegetarian: !preferences.vegetarian })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${preferences.vegetarian
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-green-200 hover:text-green-700'
                  }`}
              >
                <Leaf className="w-4 h-4" />
                Vegetariskt
              </button>

              <button
                onClick={() => setPreferences({ ...preferences, noPork: !preferences.noPork })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${preferences.noPork
                  ? 'bg-rose-100 text-rose-800 border-rose-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-rose-200 hover:text-rose-700'
                  }`}
              >
                <span className="text-lg leading-none" role="img" aria-label="No Pork">🐷</span>
                Fläskfritt
              </button>

              <button
                onClick={() => setPreferences({ ...preferences, noFish: !preferences.noFish })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${preferences.noFish
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-700'
                  }`}
              >
                <Fish className="w-4 h-4" />
                Fiskfritt
              </button>
            </div>

            <button
              onClick={() => setShowAddDish(!showAddDish)}
              className="text-sm font-medium text-brand-blue hover:text-brand-dark hover:underline"
            >
              + Lägg till egen rätt
            </button>
          </div >

          {/* Add Custom Dish Form */}
          {
            showAddDish && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-2 animate-in fade-in slide-in-from-top-2">
                <h3 className="font-semibold text-slate-700 mb-3 text-sm">Lägg till egen maträtt</h3>
                <form onSubmit={handleAddDish} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Namn på maträtt..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-brand-blue outline-none"
                      value={newDish.dish}
                      onChange={e => setNewDish({ ...newDish, dish: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Kort beskrivning..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-brand-blue outline-none"
                      value={newDish.description}
                      onChange={e => setNewDish({ ...newDish, description: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <input
                      type="text"
                      placeholder="Taggar (t.ex. pasta, soup)..."
                      className="flex-1 min-w-[150px] px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-brand-blue outline-none"
                      value={newDish.tags}
                      onChange={e => setNewDish({ ...newDish, tags: e.target.value })}
                    />
                    <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 border border-slate-300 rounded shrink-0">
                      <input
                        type="checkbox"
                        checked={newDish.vegetarian}
                        onChange={e => setNewDish({ ...newDish, vegetarian: e.target.checked })}
                        className="rounded text-brand-blue"
                      />
                      <span className="text-sm text-slate-600">Vegetarisk</span>
                    </label>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddDish(false)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700"
                    >
                      Avbryt
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-1.5 text-xs font-medium bg-brand-blue text-white rounded hover:bg-brand-dark transition-colors"
                    >
                      Spara rätt
                    </button>
                  </div>
                </form>
              </div>
            )
          }
        </div >

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )
        }

        {/* Weekly Navigation */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => setWeekOffset(prev => prev - 1)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-blue hover:border-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            &larr; Föregående vecka
          </button>

          <button
            onClick={() => setWeekOffset(prev => prev + 1)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-blue hover:border-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Nästa vecka &rarr;
          </button>
        </div>

        {/* current school title */}
        {
          menu.length > 0 && searchQuery && (
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-slate-800">{searchQuery}</h2>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Aktuell matsedel</p>
            </div>
          )
        }

        {/* Inline Advertisement Block - Only visible when menu exists */}
        {menu.length > 0 && (
          <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center my-6 min-h-[150px] relative">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 bg-slate-100 px-2 py-1 rounded">Annonsplats</span>

            {/* Ad Container */}
            <div className="w-full max-w-[728px] flex items-center justify-center text-slate-300 text-xs min-h-[100px]">
              {/* This text is behind the ad, visible only until ad loads */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <p className="text-slate-300 font-medium">Här kommer en annons...</p>
              </div>

              <div className="relative z-10 w-full">
                <ins className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-5713849466989513"
                  data-ad-slot="auto"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
                <script>
                  {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                </script>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Menu */}
        <div className="space-y-6">
          {menu.length === 0 && !loading && distributorId && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Ingen matsedel hittad</h3>
                <p className="text-slate-500 max-w-xs mx-auto text-sm mt-1">
                  Vi kunde inte hitta någon matsedel för den valda skolan den här veckan. Det kan bero på lov eller att skolan inte har publicerat någon meny än.
                </p>
              </div>
            </div>
          )}
          {menu.map((day) => (
            <div key={day.date} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transform transition hover:shadow-md">

              {/* Date Header */}
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-700 first-letter:capitalize">
                  {format(parseISO(day.date), 'EEEE d MMMM', { locale: sv })}
                </h2>
                <span className="text-xs font-medium px-2 py-1 bg-slate-200 text-slate-600 rounded-full">Vecka {format(parseISO(day.date), 'w', { locale: sv })}</span>
              </div>

              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                {/* School Lunch */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                      <ChefHat className="w-5 h-5" />
                    </div>
                    <h3 className="uppercase tracking-wider text-xs font-bold text-slate-400">Skollunch</h3>
                  </div>

                  <div className="space-y-3">
                    {day.schoolMeals.map((meal, idx) => (
                      <div key={idx} className="text-sm">
                        <span className={`${meal.name === 'Vegetarian' ? 'text-green-600' : 'text-slate-500'} font-medium text-xs uppercase block mb-1`}>{meal.name}</span>
                        {meal.courses.map((c, i) => (
                          <p key={`${c.id}-${i}`} className="text-slate-800">
                            {c.name}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dinner Suggestion */}
                <div className="p-6 bg-brand-yellow/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-yellow/20 text-brand-dark flex items-center justify-center">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <h3 className="uppercase tracking-wider text-xs font-bold text-brand-dark/70">Middagsförslag</h3>
                    </div>
                    {day.dinnerSuggestion && (
                      <div className="flex gap-1 items-center">
                        <button
                          onClick={() => setEditingDay(editingDay === day.date ? null : day.date)}
                          className="text-slate-400 hover:text-brand-blue transition-colors p-1"
                          title="Välj rätt manuellt"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => regenerateSuggestion(day.date)}
                          className="text-brand-dark/30 hover:text-brand-blue transition-colors p-1"
                          title="Slumpa nytt förslag"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => toggleDishFavorite(day.dinnerSuggestion!.dish)}
                          className={`transition-colors p-1 ${favoriteDishNames.includes(day.dinnerSuggestion.dish) ? 'text-brand-red fill-brand-red' : 'text-brand-dark/30 hover:text-brand-red'}`}
                          title={favoriteDishNames.includes(day.dinnerSuggestion.dish) ? "Ta bort från favoriter" : "Spara som favoriträtt"}
                        >
                          <Heart className={`w-5 h-5 ${favoriteDishNames.includes(day.dinnerSuggestion.dish) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    )}
                  </div>

                  {editingDay === day.date && (
                    <div className="mb-4 p-4 bg-white rounded-lg border border-brand-yellow/30 shadow-sm space-y-3 animate-in fade-in slide-in-from-top-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sök eller skriv egen rätt</span>
                        <button onClick={() => setEditingDay(null)} className="text-slate-400 hover:text-slate-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        autoFocus
                        value={editSearchQuery}
                        onChange={(e) => setEditSearchQuery(e.target.value)}
                        placeholder="T.ex. Pasta, Lax..."
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                      />
                      <div className="max-h-40 overflow-y-auto space-y-1">
                        {[...DEFAULT_DISHES, ...customDishes]
                          .filter(d => d.dish.toLowerCase().includes(editSearchQuery.toLowerCase()))
                          .slice(0, 10)
                          .map((d, i) => (
                            <button
                              key={i}
                              onClick={() => handleSelectManualDish(day.date, d)}
                              className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm rounded transition-colors flex justify-between items-center group"
                            >
                              <span className="font-medium text-slate-700">{d.dish}</span>
                              <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 uppercase tracking-tighter transition-opacity">Välj</span>
                            </button>
                          ))}
                        {editSearchQuery.length > 2 && ![...DEFAULT_DISHES, ...customDishes].some(d => d.dish.toLowerCase() === editSearchQuery.toLowerCase()) && (
                          <button
                            onClick={() => handleSetCustomManualDish(day.date, editSearchQuery)}
                            className="w-full text-left px-3 py-2 hover:bg-brand-blue/5 text-sm rounded transition-colors flex items-center gap-2 text-brand-blue font-medium"
                          >
                            <span>Använd "{editSearchQuery}"</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {day.dinnerSuggestion && editingDay !== day.date && (
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">{day.dinnerSuggestion.dish}</h4>
                        <p className="text-slate-600 text-sm mt-1">{day.dinnerSuggestion.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {day.dinnerSuggestion.vegetarian && (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            <Leaf className="w-3 h-3" /> Eko/Veg
                          </span>
                        )}
                        {day.dinnerSuggestion.matchReason && (
                          <span className="text-xs text-slate-400 italic border-l border-slate-300 pl-2">
                            {day.dinnerSuggestion.matchReason}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-yellow/20">
                        <a
                          href={day.dinnerSuggestion.recipeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-brand-red hover:text-brand-dark transition-colors group"
                        >
                          <span>Sök recept</span>
                          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>

                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>







      </main>
    </>
  );
}



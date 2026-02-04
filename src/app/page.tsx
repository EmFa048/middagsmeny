'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Search, Utensils, ChefHat, Leaf, Fish, AlertCircle, Heart, RefreshCw, Share2, Coffee, X, ExternalLink, Cookie } from 'lucide-react';

interface Dish {
  id: string;
  name: string;
  description: string | null;
}

interface SchoolMeal {
  name: string; // e.g., "Main course", "Vegetarian"
  date: string;
  courses: Dish[];
}

interface DayMenu {
  date: string;
  schoolMeals: SchoolMeal[];
  dinnerSuggestion?: {
    dish: string;
    description: string;
    vegetarian: boolean;
    recipeLink: string;
    matchReason: string; // Why did we pick this?
  };
}



// Dish Database moved outside for shared access
const DEFAULT_DISHES = [
  // --- FRÅN MATLISTA.MD ---
  { dish: 'Köttfärssås', description: 'Klassisk favorit med spagetti och parmesan.', vegetarian: false, tags: ['minced_sausage', 'pasta'], avoidIfSchoolServes: ['köttfärssås', 'bolognese', 'pasta'] },
  { dish: 'Hemlagade köttbullar', description: 'Klassiska köttbullar med potatismos, gräddsås och lingon.', vegetarian: false, tags: ['minced_sausage', 'potato'], avoidIfSchoolServes: ['köttbullar', 'potatismos'] },
  { dish: 'Köttfärsbiffar', description: 'Saftiga färsbiffar med ugnsrostad potatis och brunsås.', vegetarian: false, tags: ['minced_sausage', 'potato'], avoidIfSchoolServes: ['biffar', 'färsbiffar'] },
  { dish: 'Köttfärslimpa', description: 'Klassisk husman med gräddsås och kokt potatis.', vegetarian: false, tags: ['minced_sausage', 'potato'], avoidIfSchoolServes: ['köttfärslimpa'] },
  { dish: 'Lax med citronsås', description: 'Ugnsbakad laxfilé med frisk citronsås och kokt potatis.', vegetarian: false, tags: ['fish', 'potato'], avoidIfSchoolServes: ['fisk', 'lax'] },
  { dish: 'Lax med teriyakisås', description: 'Asiatiskt inspirerad lax med teriyakiglasyr och jasminris.', vegetarian: false, tags: ['fish', 'rice', 'asian'], avoidIfSchoolServes: ['lax', 'ris'] },
  { dish: 'Laxnuggets', description: 'Frasiga laxbitar med klyftpotatis och remouladsås.', vegetarian: false, tags: ['fish', 'potato'], avoidIfSchoolServes: ['fisk', 'nuggets'] },
  { dish: 'Kycklingnuggets', description: 'Hemgjorda kycklingnuggets med ris och currysås.', vegetarian: false, tags: ['chicken', 'rice'], avoidIfSchoolServes: ['kyckling', 'nuggets'] },
  { dish: 'Pastasallad', description: 'Fräsch pastasallad med kyckling, pesto och soltorkade tomater.', vegetarian: false, tags: ['pasta', 'chicken', 'salad'], avoidIfSchoolServes: ['pasta', 'sallad'] },
  { dish: 'Ost och skinkpaj', description: 'Klassisk matpaj med rökt skinka och smakrik ost.', vegetarian: false, tags: ['pork', 'pie'], avoidIfSchoolServes: ['paj', 'skinka'] },
  { dish: 'Biff med broccoli', description: 'Strimlad biff i smakrik sojasås med broccoli och ris.', vegetarian: false, tags: ['meat', 'rice', 'asian'], avoidIfSchoolServes: ['biff', 'broccoli', 'ris'] },
  { dish: 'Kyckling med sötsursås', description: 'Krispig kyckling med klassisk sötsursås och ris.', vegetarian: false, tags: ['chicken', 'rice', 'asian'], avoidIfSchoolServes: ['kyckling', 'ris'] },
  { dish: 'Kycklingvingar', description: 'Glacerade kycklingvingar med klyftpotatis och dipp.', vegetarian: false, tags: ['chicken', 'potato'], avoidIfSchoolServes: ['kyckling'] },
  { dish: 'Citronpasta med brynt smör och kyckling', description: 'Elegant pasta med frisk citron och stekt kycklingfilé.', vegetarian: false, tags: ['pasta', 'chicken'], avoidIfSchoolServes: ['pasta', 'kyckling'] },
  { dish: 'Potatisgratäng med rökt skinka', description: 'Krämig gratäng med massor av vitlök och strimlad skinka.', vegetarian: false, tags: ['pork', 'potato'], avoidIfSchoolServes: ['potatisgratäng', 'skinka'] },
  { dish: 'Varma mackor', description: 'Enkelt och gott med svampstuvning eller skinka och tomat.', vegetarian: false, tags: ['bread'], avoidIfSchoolServes: ['macka', 'smörgås'] },
  { dish: 'Ugnspannkaka', description: 'Tjock pannkaka i ugn med pizzasallad och lingonsylt.', vegetarian: true, tags: ['vegetarian', 'egg'], avoidIfSchoolServes: ['pannkaka', 'soppa'] },
  { dish: 'Världens nudlar', description: 'Snabb och god nudelrätt med massor av grönsaker.', vegetarian: true, tags: ['vegetarian', 'noodles', 'asian'], avoidIfSchoolServes: ['nudlar'] },
  { dish: 'Ramen', description: 'Värmande nudelsoppa med ägg, grönsaker och valfritt protein.', vegetarian: false, tags: ['soup', 'noodles', 'asian'], avoidIfSchoolServes: ['soppa', 'nudlar'] },
  { dish: 'Fläskkotlett i ugn', description: 'Möra kotletter i en krämig sås med örter och potatis.', vegetarian: false, tags: ['pork', 'potato'], avoidIfSchoolServes: ['kotlett', 'fläsk'] },
  { dish: 'Schnitzel', description: 'Panerad schnitzel med sardeller, kapris, citron och potatis.', vegetarian: false, tags: ['pork', 'potato'], avoidIfSchoolServes: ['schnitzel', 'fläsk'] },
  { dish: 'Tonkatsu', description: 'Japansk panerad fläskkotlett med kål och sesammål.', vegetarian: false, tags: ['pork', 'rice', 'asian'], avoidIfSchoolServes: ['schnitzel', 'ris'] },
  { dish: 'Stekt ris', description: 'Smakrikt stekt ris med ägg, små grönsaker och kyckling.', vegetarian: false, tags: ['rice', 'asian', 'chicken'], avoidIfSchoolServes: ['ris'] },
  { dish: 'Fisksoppa', description: 'Mustig soppa med lax, torsk, saffran och aioli.', vegetarian: false, tags: ['fish', 'soup'], avoidIfSchoolServes: ['fisksoppa', 'fisk'] },
  { dish: 'Fisktacos', description: 'Panerad fisk i små tortillas med mangosalsa.', vegetarian: false, tags: ['fish', 'texmex'], avoidIfSchoolServes: ['fisk', 'tacos'] },
  { dish: 'Kycklingtacos', description: 'Strimlad kyckling med tacokryddor och tillbehör.', vegetarian: false, tags: ['chicken', 'texmex'], avoidIfSchoolServes: ['kyckling', 'tacos'] },
  { dish: 'Kycklingkebab', description: 'Kebabkryddad kyckling i pitabröd med vitlökssås.', vegetarian: false, tags: ['chicken', 'bread'], avoidIfSchoolServes: ['kyckling', 'kebab'] },
  { dish: 'Köttfärstacos', description: 'Hela familjens fredagsfavorit.', vegetarian: false, tags: ['minced_sausage', 'texmex'], avoidIfSchoolServes: ['köttfärs', 'tacos'] },
  { dish: 'Tomatsoppa', description: 'Slät och krämig tomatsoppa med brödkrutonger.', vegetarian: true, tags: ['soup', 'vegetarian'], avoidIfSchoolServes: ['tomatsoppa', 'soppa'] },
  { dish: 'Pumpasoppa', description: 'Värmande krämig soppa med rostad pumpa och ingefära.', vegetarian: true, tags: ['soup', 'vegetarian'], avoidIfSchoolServes: ['soppa'] },
  { dish: 'Gulaschsoppa', description: 'Mustig ungersk soppa med nötkött, paprika och potatis.', vegetarian: false, tags: ['meat', 'soup'], avoidIfSchoolServes: ['gulasch', 'soppa'] },
  { dish: 'Potatis och purjolökssoppa', description: 'En mättande fransk klassiker.', vegetarian: true, tags: ['soup', 'potato', 'vegetarian'], avoidIfSchoolServes: ['potatissoppa', 'soppa'] },
  { dish: 'Helstekt kyckling', description: 'Saftig kyckling stekt i ugn med citron och örter.', vegetarian: false, tags: ['chicken', 'potato'], avoidIfSchoolServes: ['kyckling'] },
  { dish: 'Fransk kyckling med vitlök och vinäger', description: 'Smakrik kycklinggryta med inspiration från Lyon.', vegetarian: false, tags: ['chicken', 'stew'], avoidIfSchoolServes: ['kyckling', 'gryta'] },
  { dish: 'Quesadillas', description: 'Stekta tortillas fyllda med ost och jalapeños.', vegetarian: true, tags: ['vegetarian', 'texmex'], avoidIfSchoolServes: ['tacos', 'tortilla'] },
  { dish: 'Sushi', description: 'Fräsch sushi med lax, avokado och räkor.', vegetarian: false, tags: ['fish', 'rice', 'asian'], avoidIfSchoolServes: ['fisk', 'ris'] },
  { dish: 'Flatbreads m grillspett', description: 'Mjuka bröd med grillade spett och hummus.', vegetarian: false, tags: ['meat', 'bread'], avoidIfSchoolServes: ['spett', 'bröd'] },
  { dish: 'Lasagne', description: 'Klassisk italiensk lasagne med mustig köttfärssås.', vegetarian: false, tags: ['minced_sausage', 'pasta'], avoidIfSchoolServes: ['lasagne', 'pasta'] },
  { dish: 'Blodpudding', description: 'Serveras stekt med bacon och lingonsylt.', vegetarian: false, tags: ['pork'], avoidIfSchoolServes: ['blodpudding'] },
  { dish: 'Smashburgare', description: 'Hemgjorda burgare med karamelliserad lök och ost.', vegetarian: false, tags: ['minced_sausage', 'potato'], avoidIfSchoolServes: ['hamburgare', 'biff'] },
  { dish: 'Halloumiburgare', description: 'Gyllene halloumi i burgarbröd med chilimajonnäs.', vegetarian: true, tags: ['vegetarian', 'cheese'], avoidIfSchoolServes: ['hamburgare', 'halloumi'] },
  { dish: 'Dillstuvad potatis med lax', description: 'Klassisk svensk husmanskost med stekt laxfilé.', vegetarian: false, tags: ['fish', 'potato'], avoidIfSchoolServes: ['lax', 'fisk'] },
  { dish: 'Baguetter med fyllning', description: 'Matiga baguetter med t.ex. kycklingröra eller tonfisk.', vegetarian: false, tags: ['bread'], avoidIfSchoolServes: ['smörgås', 'baguette'] },
  { dish: 'Dumplings', description: 'Ångade eller stekta dumplings med god dippsås.', vegetarian: true, tags: ['vegetarian', 'asian'], avoidIfSchoolServes: ['dumplings', 'degnyten'] },
  { dish: 'Arrabiata', description: 'Het pasta med tomatsås, vitlök och chili.', vegetarian: true, tags: ['pasta', 'vegetarian'], avoidIfSchoolServes: ['pasta'] },
  { dish: 'Carbonara', description: 'Italiensk pasta med pancetta, pecorino och peppar.', vegetarian: false, tags: ['pork', 'pasta'], avoidIfSchoolServes: ['pasta', 'carbonara'] },
  { dish: 'Salsicciapasta', description: 'Lyxig pasta med smulad salsicciakorv och örter.', vegetarian: false, tags: ['minced_sausage', 'pasta'], avoidIfSchoolServes: ['pasta', 'korv'] },
  { dish: 'Korv stroganoff', description: 'En barnfavorit med falukorv, tomat och ris.', vegetarian: false, tags: ['minced_sausage', 'rice'], avoidIfSchoolServes: ['korv', 'ris'] },
  { dish: 'Mexikansk Lax', description: 'Lax med taco-smaker, majs och bönor, serveras med ris.', vegetarian: false, tags: ['fish', 'rice', 'texmex'], avoidIfSchoolServes: ['lax', 'fisk'] },
  { dish: 'Halloumi i cashewsås', description: 'En vegetarisk variant av "Butter chicken", serveras med ris.', vegetarian: true, tags: ['vegetarian', 'rice', 'asian'], avoidIfSchoolServes: ['halloumi', 'ris'] },
  { dish: 'Linsgryta', description: 'Mustig och värmande gryta med kokosmjölk och kryddor.', vegetarian: true, tags: ['vegetarian', 'stew'], avoidIfSchoolServes: ['linser', 'gryta'] },
  { dish: 'Minestronesoppa', description: 'Klassisk italiensk grönsakssoppa med småpasta.', vegetarian: true, tags: ['soup', 'vegetarian', 'pasta'], avoidIfSchoolServes: ['soppa', 'pasta'] },
  { dish: 'Flygande Jacob', description: 'Klassisk gratäng med kyckling banan, jordnötter och chili.', vegetarian: false, tags: ['chicken', 'rice'], avoidIfSchoolServes: ['kyckling', 'gratäng'] },
  { dish: 'Vegetarisk lasagne', description: 'Fylld med spenat, keso och en mustig tomatsås.', vegetarian: true, tags: ['vegetarian', 'pasta'], avoidIfSchoolServes: ['lasagne', 'pasta'] },
  { dish: 'Shepherds pie', description: 'Köttfärsgryta under ett täcke av krämigt potatismos.', vegetarian: false, tags: ['minced_sausage', 'potato'], avoidIfSchoolServes: ['köttfärs', 'potatismos'] },
  { dish: 'Bangers and mash', description: 'Brittisk klassiker med smakrik korv och potatismos.', vegetarian: false, tags: ['pork', 'potato'], avoidIfSchoolServes: ['korv', 'potatismos'] },
  { dish: 'Fiskpinnar', description: 'Frasiga fiskpinnar med potatismos och remouladsås.', vegetarian: false, tags: ['fish', 'potato'], avoidIfSchoolServes: ['fiskpinnar', 'fisk'] },
  { dish: 'Hemgjord pizza', description: 'Välj dina favorittoppings själv!', vegetarian: true, tags: ['bread'], avoidIfSchoolServes: ['pizza'] },
  { dish: 'Blomkålsgratäng', description: 'Krämig gratäng med blomkål och örter.', vegetarian: true, tags: ['vegetarian', 'blomkål'], avoidIfSchoolServes: ['blomkål', 'gratäng'] },
  { dish: 'Kyckling adobo', description: 'Filippinsk kycklinggryta med soja, vinäger och vitlök.', vegetarian: false, tags: ['chicken', 'rice', 'asian'], avoidIfSchoolServes: ['kyckling', 'ris'] },
  { dish: 'Mango chutney kyckling', description: 'Krämig kycklinggratäng med mango chutney och paprika.', vegetarian: false, tags: ['chicken', 'rice'], avoidIfSchoolServes: ['kyckling', 'gratäng'] },
  { dish: 'Kålpudding', description: 'Klassisk husman med vitkål och köttfärs.', vegetarian: false, tags: ['minced_sausage', 'potato'], avoidIfSchoolServes: ['kålpudding', 'köttfärs'] },
  { dish: 'Pulled pork/carnitas', description: 'Långkokt kött som serveras i tacos eller med coleslaw.', vegetarian: false, tags: ['pork', 'texmex'], avoidIfSchoolServes: ['pulled pork', 'tacos'] },
  { dish: 'Kåldolmar', description: 'Klassisk husmanskost fyllda med färs och ris.', vegetarian: false, tags: ['minced_sausage', 'potato'], avoidIfSchoolServes: ['kål', 'färs'] },
  { dish: 'Djungelgryta', description: 'En barnfavorit: korvgryta med banan och curry.', vegetarian: false, tags: ['minced_sausage', 'rice'], avoidIfSchoolServes: ['korv', 'ris'] },
  { dish: 'Spenatsoppa', description: 'Grön och nyttig soppa, serveras med kokta ägg.', vegetarian: true, tags: ['soup', 'vegetarian'], avoidIfSchoolServes: ['spenatsoppa', 'soppa'] },
  { dish: 'Kålmaja', description: 'Enkel vardagsrätt med vitkål och köttfärs i en panna.', vegetarian: false, tags: ['minced_sausage'], avoidIfSchoolServes: ['kål', 'färs'] },

  // --- 50 NYA FÖRSLAG ---
  // Vegetariska (15 st)
  { dish: 'Shakshuka', description: 'Ägg pocherade i en kryddig tomatsås med paprika och lök.', vegetarian: true, tags: ['vegetarian', 'egg'], avoidIfSchoolServes: ['ägg', 'tomatsås'] },
  { dish: 'Sötpotatiscurry', description: 'Krämig vegansk curry med jordnötssmör och spenat.', vegetarian: true, tags: ['vegetarian', 'rice', 'stew'], avoidIfSchoolServes: ['curry', 'ris'] },
  { dish: 'Falafel i pitabröd', description: 'Frasiga falafel med hummus och picklad rödlök.', vegetarian: true, tags: ['vegetarian', 'bread'], avoidIfSchoolServes: ['falafel'] },
  { dish: 'Pasta med rostad röd paprika', description: 'Krämig sås på mixad rostad paprika och valnötter.', vegetarian: true, tags: ['vegetarian', 'pasta'], avoidIfSchoolServes: ['pasta'] },
  { dish: 'Zucchini- och halloumiplättar', description: 'Serveras med en frisk citronyoghurt.', vegetarian: true, tags: ['vegetarian', 'cheese'], avoidIfSchoolServes: ['pannkaka', 'plättar'] },
  { dish: 'Grönsakslasagne med aubergine', description: 'Moussaka-vibe men med lasagneplattor.', vegetarian: true, tags: ['vegetarian', 'pasta'], avoidIfSchoolServes: ['lasagne'] },
  { dish: 'Poke bowl med tofu', description: 'Marinerad tofu, edamame och sushiris.', vegetarian: true, tags: ['vegetarian', 'rice', 'asian'], avoidIfSchoolServes: ['ris', 'bowl'] },
  { dish: 'Ärtsoppa (Vegetarisk)', description: 'Klassisk svensk ärtsoppa utan fläsk.', vegetarian: true, tags: ['vegetarian', 'soup'], avoidIfSchoolServes: ['ärtsoppa', 'soppa'] },
  { dish: 'Rödbetsbiffar med getost', description: 'Söta rödbetor i kombination med salt ost.', vegetarian: true, tags: ['vegetarian', 'cheese'], avoidIfSchoolServes: ['biffar'] },
  { dish: 'Nudlar med jordnötssås', description: 'Snabb wok med massor av krispiga grönsaker.', vegetarian: true, tags: ['vegetarian', 'noodles', 'asian'], avoidIfSchoolServes: ['nudlar'] },
  { dish: 'Broccoligratäng med ädelost', description: 'Mustig gratäng som mättar bra.', vegetarian: true, tags: ['vegetarian', 'cheese'], avoidIfSchoolServes: ['broccoli', 'gratäng'] },
  { dish: 'Vietnamesiska vårrullar', description: 'Rice paper rolls fyllda med grönsaker och tofu.', vegetarian: true, tags: ['vegetarian', 'asian'], avoidIfSchoolServes: ['vårrullar'] },
  { dish: 'Minipizzor på tortillas', description: 'Snabbt, enkelt och barnsligt gott.', vegetarian: true, tags: ['vegetarian', 'bread'], avoidIfSchoolServes: ['pizza'] },
  { dish: 'Risotto med sparris', description: 'Krämig lyxig risotto med citron och parmesan.', vegetarian: true, tags: ['vegetarian', 'rice'], avoidIfSchoolServes: ['ris'] },
  { dish: 'Grekisk sallad med feta', description: 'Fräsch och snabb sommarmat.', vegetarian: true, tags: ['vegetarian', 'salad'], avoidIfSchoolServes: ['sallad'] },
  { dish: 'Röd linssoppa', description: 'Mustig soppa med ingefära, kokosmjölk och koriander.', vegetarian: true, tags: ['vegetarian', 'soup', 'stew'], avoidIfSchoolServes: ['soppa', 'linser'] },
  { dish: 'Vegetarisk Bibimbap', description: 'Koreansk risrätt med stekta grönsaker, ägg och gochujangsås.', vegetarian: true, tags: ['vegetarian', 'rice', 'asian'], avoidIfSchoolServes: ['ris', 'bibimbap'] },
  { dish: 'Pasta med valnötssås', description: 'Krämig sås på valnötter, parmesan och vitlök.', vegetarian: true, tags: ['vegetarian', 'pasta'], avoidIfSchoolServes: ['pasta'] },
  { dish: 'Chili sin carne', description: 'Vegetarisk chili med quornfärs, bönor och choklad.', vegetarian: true, tags: ['vegetarian', 'stew'], avoidIfSchoolServes: ['chili', 'gryta'] },
  { dish: 'Marockansk kikärtsgryta', description: 'Kryddig gryta med spiskummin, kanel och aprikoser.', vegetarian: true, tags: ['vegetarian', 'stew'], avoidIfSchoolServes: ['gryta', 'kikärtor'] },
  { dish: 'Ugnspannkaka med äpple', description: 'Variant med stekta äpplen och kanel, serveras med keso.', vegetarian: true, tags: ['vegetarian', 'egg'], avoidIfSchoolServes: ['pannkaka'] },
  { dish: 'Gnocchi med salviasmör', description: 'Smörstekt gnocchi med salvia, hasselnötter och parmesan.', vegetarian: true, tags: ['vegetarian', 'pasta'], avoidIfSchoolServes: ['gnocchi', 'pasta'] },
  { dish: 'Tofustroganoff', description: 'Klassisk stroganoff men med rökt tofu istället för korv.', vegetarian: true, tags: ['vegetarian', 'rice', 'stew'], avoidIfSchoolServes: ['korv', 'stroganoff'] },
  { dish: 'Vegetariska kåldolmar', description: 'Savoykål fylld med linser och ris, serveras med sås och potatis.', vegetarian: true, tags: ['vegetarian', 'potato'], avoidIfSchoolServes: ['kåldolmar'] },
  { dish: 'Melanzane alla Parmigiana', description: 'Gratäng med aubergine, tomatsås och mozzarella.', vegetarian: true, tags: ['vegetarian', 'stew'], avoidIfSchoolServes: ['gratäng', 'lasagne'] },
  { dish: 'Spenat- och ricottapaj', description: 'Hög paj med krämig fyllning och frasigt skal.', vegetarian: true, tags: ['vegetarian', 'pie'], avoidIfSchoolServes: ['paj'] },
  { dish: 'Pad Thai med tofu', description: 'Stekta risnudlar med jordnötter, lime och tofu.', vegetarian: true, tags: ['vegetarian', 'asian', 'noodles'], avoidIfSchoolServes: ['pad thai', 'nudlar'] },
  { dish: 'Belugabolognese', description: 'Lyxig "köttfärssås" gjord på svarta belugalinser.', vegetarian: true, tags: ['vegetarian', 'pasta'], avoidIfSchoolServes: ['pasta', 'bolognese'] },
  { dish: 'Halloumi-pytt i panna', description: 'Tärnad potatis, halloumi och rotfrukter med senapskräm.', vegetarian: true, tags: ['vegetarian', 'potato'], avoidIfSchoolServes: ['pyttipanna'] },
  { dish: 'Rödbetscarpaccio med getost', description: 'Tunnskivade rödbetor, valnötter och honung (lättare middag).', vegetarian: true, tags: ['vegetarian', 'salad'], avoidIfSchoolServes: ['sallad'] },
  // Fisk (10 st)
  { dish: 'Torskrygg med bacontärningar', description: 'Lyxig torsk med brynt smör och pepparrot.', vegetarian: false, tags: ['fish'], avoidIfSchoolServes: ['fisk', 'torsk'] },
  { dish: 'Räkpasta med chili och vitlök', description: 'Scampi eller räkor i en lätt oljebaserad sås.', vegetarian: false, tags: ['fish', 'pasta'], avoidIfSchoolServes: ['pasta', 'skaldjur'] },
  { dish: 'Fish & Chips', description: 'Hemgjord panerad fisk med klyftpotatis.', vegetarian: false, tags: ['fish', 'potato'], avoidIfSchoolServes: ['fisk', 'pommes'] },
  { dish: 'Ugnsbakad spätta med remoulad', description: 'Klassisk panerad rödspätta.', vegetarian: false, tags: ['fish', 'potato'], avoidIfSchoolServes: ['fisk'] },
  { dish: 'Sejrygg med äggsås', description: 'Mormors klassiker med kokt potatis.', vegetarian: false, tags: ['fish', 'potato'], avoidIfSchoolServes: ['fisk', 'äggsås'] },
  { dish: 'Laxburgare', description: 'Saftiga laxburgare med avokadokräm.', vegetarian: false, tags: ['fish', 'bread'], avoidIfSchoolServes: ['fisk', 'hamburgare'] },
  { dish: 'Laxpasta', description: 'Krämig pastasås med laxbitar och spenat.', vegetarian: false, tags: ['fish', 'pasta'], avoidIfSchoolServes: ['lax', 'pasta'] },
  { dish: 'Fiskgratäng med räkor', description: 'Fransk fiskgratäng med spritsat mos runt om.', vegetarian: false, tags: ['fish', 'potato'], avoidIfSchoolServes: ['fiskgratäng', 'fisk'] },
  { dish: 'Fiskburgare med kall sås', description: 'Snabbt och gott i burgarbröd med krispig sallad.', vegetarian: false, tags: ['fish', 'bread'], avoidIfSchoolServes: ['fisk', 'hamburgare'] },
  { dish: 'Moules frites', description: 'Blåmusslor kokta i vitt vin med pommes.', vegetarian: false, tags: ['fish', 'potato'], avoidIfSchoolServes: ['musslor'] },

  // Kyckling (15 st)
  { dish: 'Kyckling Marengo', description: 'Klassisk gryta med tomat, svamp och oliver.', vegetarian: false, tags: ['chicken', 'stew'], avoidIfSchoolServes: ['kyckling', 'gryta'] },
  { dish: 'Thai röd curry med kyckling', description: 'Stark och krämig curry med kokosmjölk.', vegetarian: false, tags: ['chicken', 'rice', 'asian'], avoidIfSchoolServes: ['curry', 'ris'] },
  { dish: 'Kycklingspett med jordnötssås', description: 'Satay-spett som på restaurang.', vegetarian: false, tags: ['chicken', 'rice', 'asian'], avoidIfSchoolServes: ['kyckling', 'spett'] },
  { dish: 'Kyckling i ugn med rotsaker', description: 'Allt-i-ett-form för enkel matlagning.', vegetarian: false, tags: ['chicken', 'potato'], avoidIfSchoolServes: ['kyckling'] },
  { dish: 'Caesarsallad', description: 'Klassiker med krutonger, parmesan och romansallad.', vegetarian: false, tags: ['chicken', 'salad'], avoidIfSchoolServes: ['sallad', 'kyckling'] },
  { dish: 'Chicken Tikka Masala', description: 'Indisk favorit med kryddig tomatsås.', vegetarian: false, tags: ['chicken', 'rice', 'asian'], avoidIfSchoolServes: ['curry', 'ris'] },
  { dish: 'Kycklingpiccata', description: 'Parmesanpanerad kyckling med tomatsås och pasta.', vegetarian: false, tags: ['chicken', 'pasta'], avoidIfSchoolServes: ['kyckling', 'pasta'] },
  { dish: 'Kycklingpasta med soltorkade tomater', description: 'Krämig sås med basilika och vitlök.', vegetarian: false, tags: ['chicken', 'pasta'], avoidIfSchoolServes: ['kyckling', 'pasta'] },
  { dish: 'Kycklingpanna med curry', description: 'Snabb och krämig vardagsrätt som barnen älskar.', vegetarian: false, tags: ['chicken', 'rice'], avoidIfSchoolServes: ['kyckling', 'curry'] },
  { dish: 'Kyckling- enchiladas', description: 'Gratinerade tortillas med fylld kycklingröra.', vegetarian: false, tags: ['chicken', 'texmex'], avoidIfSchoolServes: ['tacos'] },
  { dish: 'Teriyakikyckling med broccoli', description: 'Snabb wok med frysta grönsaker och ris.', vegetarian: false, tags: ['chicken', 'rice', 'asian'], avoidIfSchoolServes: ['kyckling', 'ris'] },
  { dish: 'Kyckling Alfredo', description: 'Pasta i en extremt krämig vit sås.', vegetarian: false, tags: ['chicken', 'pasta'], avoidIfSchoolServes: ['kyckling', 'pasta'] },
  { dish: 'Grillad kycklingklubba', description: 'Enkel favorit med potatissallad.', vegetarian: false, tags: ['chicken', 'potato'], avoidIfSchoolServes: ['kyckling'] },
  { dish: 'Pestokyckling i ugn', description: 'Blanda kyckling, pesto och grädde – klart på 20 min.', vegetarian: false, tags: ['chicken', 'pasta'], avoidIfSchoolServes: ['kyckling', 'pasta'] },
  { dish: 'Kycklinggryta med dragon', description: 'Fransk känsla med senap och grädde.', vegetarian: false, tags: ['chicken', 'stew'], avoidIfSchoolServes: ['kyckling', 'gryta'] },

  // Kött/Fläsk/Vilt/Köttfärs (10 st)
  { dish: 'Viltgryta med kantareller', description: 'Härlig smak av skog och höst.', vegetarian: false, tags: ['meat', 'stew'], avoidIfSchoolServes: ['gryta', 'vilt'] },
  { dish: 'Renskavspanna', description: 'Serveras med potatismos och lingon.', vegetarian: false, tags: ['meat', 'potato'], avoidIfSchoolServes: ['skav', 'vilt'] },
  { dish: 'Biff Rydberg', description: 'Lyxig husman med oxfilé och senapsgrädde.', vegetarian: false, tags: ['meat', 'potato'], avoidIfSchoolServes: ['biff'] },
  { dish: 'Sjömansbiff', description: 'Kött, potatis och lök som kokas i öl.', vegetarian: false, tags: ['meat', 'potato'], avoidIfSchoolServes: ['biff', 'öl'] },
  { dish: 'Kebabtallrik', description: 'Serveras med pommes, sallad och massor av sås.', vegetarian: false, tags: ['meat', 'potato'], avoidIfSchoolServes: ['kebab', 'pommes'] },
  { dish: 'Fläskfilé black & white', description: 'Klassisk restaurangrätt med två såser.', vegetarian: false, tags: ['pork', 'potato'], avoidIfSchoolServes: ['fläskfilé'] },
  { dish: 'Köttpiroger', description: 'Hemgjorda piroger med kryddig färsfyllning.', vegetarian: false, tags: ['meat', 'bread', 'minced_sausage'], avoidIfSchoolServes: ['piroger'] },
  { dish: 'Chili con carne', description: 'Långkokt med massor av bönor och chili.', vegetarian: false, tags: ['meat', 'stew'], avoidIfSchoolServes: ['chili', 'gryta'] },
  { dish: 'Pljeskavica', description: 'Balkansk färsbiff med adjika och gräddfil.', vegetarian: false, tags: ['meat', 'bread'], avoidIfSchoolServes: ['biff'] },
  { dish: 'Salsicciakorv med surkål', description: 'Mustig och kryddig tysk-inspirerad middag.', vegetarian: false, tags: ['pork'], avoidIfSchoolServes: ['korv'] }
];

function HomeContent() {
  const router = useRouter();

  // Navigation State
  const [navURLs, setNavURLs] = useState<{ prev: string | null; next: string | null }>({ prev: null, next: null });

  // Initialise state empty to avoid hydration mismatch/suspense
  const [url, setUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState<DayMenu[]>([]);
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

  // Ad Overlay State
  const [showAd, setShowAd] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);

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
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const savedDishes = localStorage.getItem('mm_custom_dishes');
    if (savedDishes) setCustomDishes(JSON.parse(savedDishes));

    const savedFavDishes = localStorage.getItem('mm_favorite_dishes');
    if (savedFavDishes) setFavoriteDishNames(JSON.parse(savedFavDishes));

    // Check if user has seen the ad in this session
    const seenAd = sessionStorage.getItem('mm_seen_ad');
    if (!seenAd) {
      // Small delay to feel like a "popup" or let page load slightly
      const timer = setTimeout(() => setShowAd(true), 800);
      return () => clearTimeout(timer);
    }

    // Check cookie consent
    const consent = localStorage.getItem('mm_cookie_consent');
    if (!consent) {
      setShowCookieConsent(true);
    }
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
  const lastFetchedUrl = useRef('');
  const initialLoadDone = useRef(false);

  // Load params on mount (Client Side Only)
  useEffect(() => {
    if (initialLoadDone.current) return;

    const params = new URLSearchParams(window.location.search);
    const schoolParam = params.get('school');
    const nameParam = params.get('name');

    if (schoolParam) {
      setUrl(schoolParam);

      if (nameParam) {
        setSearchQuery(nameParam);
      } else {
        // Fallback: Try to derive name from URL if missing
        try {
          const decoded = decodeURIComponent(schoolParam);
          const parts = decoded.split('_');
          const lastPart = parts[parts.length - 1].split('?')[0];
          if (lastPart) {
            const readable = lastPart.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            setSearchQuery(readable);
          }
        } catch (e) {
          console.error("Failed to parse school name from URL", e);
        }
      }
    }

    initialLoadDone.current = true;
  }, []);


  // Sync state BACK to URL (Deep linking)
  useEffect(() => {
    if (!url || !initialLoadDone.current) return;

    const params = new URLSearchParams(window.location.search);
    let needsUpdate = false;

    // Sync School
    if (params.get('school') !== url) {
      params.set('school', url);
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
      // Use replaceState but don't trigger a full Next.js navigation if possible
      // to avoid re-triggering useSearchParams effects in a loop
      window.history.replaceState(null, '', `?${params.toString()}`);
    }
  }, [url, menu, searchQuery]);

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

  const selectSchool = (school: { url: string, name: string }) => {
    setUrl(school.url);
    setSearchQuery(school.name);
    setSearchResults([]);
    setShowResults(false);
  };

  const toggleFavorite = () => {
    // Basic check using URL as ID
    const exists = favorites.find(f => f.url === url);
    if (exists) {
      setFavorites(favorites.filter(f => f.url !== url));
    } else {
      // Use searchQuery as name if available, otherwise default
      const name = searchQuery && searchQuery.length > 2 ? searchQuery : 'Min Skola';
      setFavorites([...favorites, { name, url }]);
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
  const isFavorite = favorites.some(f => f.url === url);

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

  // Extended Mock AI Logic
  const generateMockSuggestion = (schoolMeals: SchoolMeal[], prefs: typeof preferences, custom: any[], favDishNames: string[], avoidDishes: string[] = [], forceDish?: string) => {
    // Determine what was served at school (very basic keyword matching)

    // Dish Database
    const allDishes = [...DEFAULT_DISHES, ...custom];

    // Priority Check: Shared URL force (BUT VALIDATE IT FIRST)
    if (forceDish) {
      const found = allDishes.find(d => d.dish === forceDish);
      if (found) {
        // QUICK VALIDATION: Does this forced dish clash with school lunch?
        const dishTags = found.tags || [];
        const dishName = found.dish.toLowerCase();

        // Use a lightweight check to see if we should allow the force
        const schoolDishNames = schoolMeals.flatMap(m => m.courses.map(c => c.name.toLowerCase()));
        const isDirectClash = schoolDishNames.some(name => name.includes(dishName) || dishName.includes(name));

        if (!isDirectClash) {
          return {
            dish: found.dish,
            description: found.description,
            vegetarian: found.vegetarian,
            recipeLink: `https://www.google.com/search?q=recept+${encodeURIComponent(found.dish)}`,
            matchReason: 'Delat förslag (från länk)'
          };
        }
        // If it was a clash, we ignore the forced dish and generate a new one!
      }
    }

    const schoolDishNames = schoolMeals.flatMap(m => m.courses.map(c => c.name.toLowerCase()));
    const schoolDescriptions = schoolMeals.flatMap(m => m.courses.map(c => c.description?.toLowerCase() || ''));
    const schoolToText = [...schoolDishNames, ...schoolDescriptions].join(' ');

    // Filter based on preferences
    let availableDishes = allDishes.filter(d => {
      if (prefs.vegetarian && !d.vegetarian) return false;
      if (prefs.noPork && d.tags.includes('pork')) return false;
      if (prefs.noFish && d.tags.includes('fish')) return false;
      return true;
    });

    const coreCategories = ['fish', 'vegetarian', 'chicken', 'minced_sausage', 'red_meat'];

    // Helper to map a dish to our core categories (using tags AND text detection)
    // Helper to map a dish to our core categories (using tags AND text detection)
    const getCoreCategory = (d: any) => {
      const tags = d.tags || [];
      const text = (d.dish + ' ' + (d.description || '')).toLowerCase();

      // SPECIAL MODE: If Vegetarian preference is active, use granular categories to ensure variety
      if (prefs.vegetarian) {
        if (text.includes('pizza')) return 'pizza'; // Explicit pizza category
        if (tags.includes('soup')) return 'soup';
        if (tags.includes('pasta')) return 'pasta';
        if (tags.includes('rice')) return 'rice';
        if (tags.includes('noodles')) return 'noodles';
        if (tags.includes('pie') || tags.includes('paj')) return 'pie';
        if (tags.includes('stew') || tags.includes('gryta') || tags.includes('curry')) return 'stew';
        if (tags.includes('salad')) return 'salad';
        if (tags.includes('bread') || tags.includes('macka') || tags.includes('burgare')) return 'bread';
        if (tags.includes('asian')) return 'asian';
        if (tags.includes('texmex') || tags.includes('tacos')) return 'texmex';
        return 'vegetarian_general';
      }

      // Standard logic for mixed eaters
      if (tags.includes('fish') || text.includes('lax') || text.includes('torsk')) return 'fish';
      if (tags.includes('vegetarian')) return 'vegetarian';
      if (tags.includes('chicken') || text.includes('kyckling')) return 'chicken';
      if (tags.includes('minced_sausage') || text.includes('köttfärs') || text.includes('färs') || text.includes('korv')) return 'minced_sausage';
      if (tags.some((t: string) => ['meat', 'pork'].includes(t)) || text.includes('kött') || text.includes('biff')) return 'red_meat';
      return null;
    };

    // List of used categories this week
    const usedWeekCategories = avoidDishes.map(usedName => {
      const d = allDishes.find(ad => ad.dish === usedName);
      return d ? getCoreCategory(d) : null;
    }).filter(Boolean);

    // Category of the VERY LAST dish
    const lastDishName = avoidDishes[avoidDishes.length - 1];
    const lastDish = allDishes.find(ad => ad.dish === lastDishName);
    const lastCategory = lastDish ? getCoreCategory(lastDish) : null;

    const scoredDishes = availableDishes.map(d => {
      let score = 0;
      const currentCategory = getCoreCategory(d);
      const dishNameLower = d.dish.toLowerCase();
      const dishDescLower = d.description?.toLowerCase() || '';

      // 1. RULE: Strictly avoid same dish name (or parts of it) as school
      if (schoolDishNames.some(name => name.includes(dishNameLower) || dishNameLower.includes(name))) {
        score += 5000; // Absolute hard skip
      }

      // 2. CATEGORY CLASH DETECTION (School vs Dinner)
      const categories = [
        { tag: 'fish', keywords: ['fisk', 'lax', 'torsk', 'spätta', 'sej', 'strömming', 'makrill', 'skaldjur', 'räkor', 'fiskgratäng', 'fiskpinnar'] },
        { tag: 'chicken', keywords: ['kyckling', 'nuggets', 'piccata', 'jacob', 'hönskött', 'kycklingfilé'] },
        { tag: 'pork', keywords: ['fläsk', 'skinka', 'bacon', 'salami', 'salsiccia', 'korv', 'kassler', 'falukorv', 'kotlett', 'schnitzel', 'chorizo', 'frankfurter', 'hot dog'] },
        { tag: 'meat', keywords: ['kött', 'nöt', 'biff', 'färs', 'innerfilé', 'entrecote', 'högrev', 'kalv', 'rydberg', 'steak', 'oxe'] },
        { tag: 'minced_sausage', keywords: ['köttfärs', 'korv', 'färs', 'bolognese', 'biffar', 'köttbullar', 'stroganoff', 'lasagne', 'kebab', 'burgare', 'pudding', 'dolmar', 'panna'] },
      ];

      // Direct keyword clash (if lunch says "kyckling" and dinner dish/desc contains "kyckling")
      const combinedKeywords = ['kyckling', 'fisk', 'korv', 'lax', 'torsk', 'färs', 'kött', 'pasta', 'ris', 'soppa'];
      combinedKeywords.forEach(kw => {
        if (schoolToText.includes(kw) && (dishNameLower.includes(kw) || dishDescLower.includes(kw))) {
          score += 3000; // Direct text match skip
        }
      });

      categories.forEach(cat => {
        if (cat.keywords.some(word => schoolToText.includes(word))) {
          if (d.tags.includes(cat.tag)) score += 2000; // Strong category skip
        }
      });

      // 3. VARIETY RULE: No same primary category two days in a row
      if (currentCategory && currentCategory === lastCategory) {
        score += 1000; // Very heavy penalty for consecutive same category
      }

      // 3b. BASE VARIETY: No same base (pasta/rice/potato) two days in a row
      const getBase = (dish: any) => {
        const t = (dish.dish + ' ' + (dish.description || '')).toLowerCase();
        if (t.includes('pasta') || t.includes('spaghetti') || t.includes('makaron') || t.includes('lasagne') || t.includes('tortellini') || t.includes('penne')) return 'pasta';
        if (t.includes('ris') || t.includes('bulgur') || t.includes('couscous') || t.includes('paella')) return 'rice';
        if (t.includes('potatis') || t.includes('mos') || t.includes('pommes') || t.includes('stubbar')) return 'potato';
        return null;
      };

      const currentBase = getBase(d);
      const lastBase = lastDish ? getBase(lastDish) : null;
      if (currentBase && currentBase === lastBase) {
        score += 2000; // Heavy penalty for same base two days in a row
      }

      // 4. WEEKLY BALANCE: Strictly prioritize unused core categories
      if (currentCategory) {
        if (usedWeekCategories.includes(currentCategory)) {
          score += 5000; // Strict one-category-per-week rule
        } else {
          score -= 500; // Reward for unused categories
        }
      }

      // 5. MANUAL AVOID TERMS (defined in dish data)
      if (d.avoidIfSchoolServes) {
        d.avoidIfSchoolServes.forEach((term: string) => {
          if (schoolToText.includes(term.toLowerCase())) score += 1000;
        });
      }

      // Priority favorites
      if (favDishNames.includes(d.dish)) score -= 50;

      return { ...d, score };
    });

    // Sort by score (lowest first)
    scoredDishes.sort((a, b) => a.score - b.score);

    // Pick from the best available options
    // STRICT FILTER: No dishes with score > 1000 (serious clashes)
    let pool = scoredDishes.filter(d => d.score < 500);

    // If pool is empty, take the 5 least bad ones (even if they have some penalty, but not the >1000 ones)
    if (pool.length === 0) {
      pool = scoredDishes.filter(d => d.score < 1000).slice(0, 5);
    }

    // Final emergency fallback (should rarely happen)
    if (pool.length === 0) {
      pool = scoredDishes.slice(0, 3);
    }

    // Strict Rotation: Remove ANY dish that has been used this week from the pool if possible
    const uniquePool = pool.filter(d => !avoidDishes.includes(d.dish));
    if (uniquePool.length > 0) pool = uniquePool;

    if (pool.length === 0) return undefined;

    // Pick random from our high-quality pool
    const selected = pool[Math.floor(Math.random() * pool.length)];

    return {
      dish: selected.dish,
      description: selected.description,
      vegetarian: selected.vegetarian,
      recipeLink: `https://www.google.com/search?q=recept+${encodeURIComponent(selected.dish)}`,
      matchReason: selected.score < -5 ? 'Baserat på dina favoriter!' :
        selected.score < 5 ? 'Bra komplement till skollunchen.' :
          'Krockvarning! (Svårt att hitta matchning)'
    };
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

  const fetchMenu = async (overrideUrl?: string, forceSkipAutoCorrect = false, clearSuggestions = false) => {
    const activeUrl = overrideUrl || url;
    const skipAutoCorrect = forceSkipAutoCorrect;

    if (!activeUrl) return;

    // Only skip if NOT forced and URL is the same
    if (activeUrl === lastFetchedUrl.current && !forceSkipAutoCorrect && !clearSuggestions) return;
    lastFetchedUrl.current = activeUrl;

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
      const res = await fetch(`/api/menu?url=${encodeURIComponent(activeUrl)}`);
      if (!res.ok) throw new Error('Kunde inte hämta menyn');
      const data = await res.json();

      if (!data.meals || data.meals.length === 0) {
        setMenu([]);
        setLoading(false);
        return;
      }

      // --- AUTO-CORRECTION LOGIC ---
      const now = new Date();
      const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
      const todayStr = format(now, 'yyyy-MM-dd');

      const menuDates = data.meals.map((m: any) => m.date.split('T')[0]);
      const hasToday = menuDates.includes(todayStr);

      // Auto-jump logic: 
      // Only jump to NEXT week if it's Friday afternoon or weekend AND the current menu doesn't have today
      // OR if it's a weekday and we are looking at a past week.
      const isWeekend = now.getDay() === 0 || now.getDay() === 6;
      const isFridayAfternoon = now.getDay() === 5 && now.getHours() >= 14;

      if (!skipAutoCorrect && !hasToday && menuDates.length > 0) {
        const lastDate = [...menuDates].sort().pop();
        const firstDate = [...menuDates].sort()[0];

        // If current week is in the past, jump to next (if available)
        if (lastDate && todayStr > lastDate && data.nextURL) {
          // If it's Friday/Weekend, we definitely want the next week.
          // Otherwise, we might still be looking for "current" week.
          setUrl(data.nextURL);
          return;
        }
        // If current week is in the future, but it's middle of the week, maybe jump back?
        else if (firstDate && todayStr < firstDate && data.previousURL && !isFridayAfternoon && !isWeekend) {
          setUrl(data.previousURL);
          return;
        }
      }

      setNavURLs({
        prev: data.previousURL,
        next: data.nextURL
      });

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when URL changes
  useEffect(() => {
    // On the very first load of the page, we want to skip auto-correct 
    // to preserve the week specified in the URL.
    const isFirstFetchForSession = lastFetchedUrl.current === '';
    fetchMenu(undefined, isFirstFetchForSession);
  }, [url]);


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="w-full bg-[#051c2c] shadow-xl overflow-hidden relative">
        <div className="relative w-full">
          <img
            src="/header-bg-clean-final.png"
            alt="Bakgrund"
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="transform -translate-y-1 md:translate-y-3 lg:translate-y-5">
              <h1 className="text-white text-3xl md:text-5xl lg:text-7xl font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] tracking-tight">
                Middagsmeny
              </h1>
              <div className="h-0.5 w-12 md:w-20 bg-brand-yellow mx-auto my-2 md:my-3 rounded-full shadow-sm"></div>
              <p className="text-brand-yellow text-[10px] md:text-sm lg:text-base font-bold uppercase tracking-[0.2em] drop-shadow-md">
                veckans menyer & smarta middagsförslag
              </p>
            </div>
          </div>
        </div>
      </header>

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
              onClick={() => fetchMenu(undefined, false, true)}
              disabled={loading}
              className="md:flex-1 h-[42px] bg-brand-blue hover:bg-brand-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 whitespace-nowrap shadow-sm"
            >
              {loading ? 'Hämtar...' : 'Se meny'}
            </button>
          </div>

          {/* RAD 2: Funktioner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
              onClick={() => fetchMenu(undefined, true, true)}
              disabled={loading}
              className="h-[42px] bg-brand-yellow hover:bg-[#ffc800] text-brand-dark rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-sm">Slumpa ny meny</span>
            </button>
          </div>

          {favorites.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-brand-red" /> Mina sparade skolor
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide py-1">
                {favorites.map((fav, i) => (
                  <div key={i} className="relative group/fav">
                    <button
                      onClick={() => {
                        setUrl(fav.url);
                        setSearchQuery(fav.name);
                      }}
                      className={`whitespace-nowrap px-3 py-1.5 pr-8 text-xs font-medium rounded-full border transition-all ${url === fav.url ? 'bg-brand-blue text-white border-brand-blue shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue hover:text-brand-blue'}`}
                    >
                      {fav.name}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFavorites(favorites.filter(f => f.url !== fav.url));
                      }}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-black/10 transition-colors ${url === fav.url ? 'text-white/70 hover:text-white' : 'text-slate-400 hover:text-brand-red'}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-y-3 gap-x-4 mt-2">
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
          </div>

          {/* Add Custom Dish Form */}
          {showAddDish && (
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
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Weekly Navigation */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => {
              if (navURLs.prev) {
                setUrl(navURLs.prev);
                fetchMenu(navURLs.prev, true);
              }
            }}
            disabled={!navURLs.prev || loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-blue hover:border-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            &larr; Föregående vecka
          </button>

          <button
            onClick={() => {
              if (navURLs.next) {
                setUrl(navURLs.next);
                fetchMenu(navURLs.next, true);
              }
            }}
            disabled={!navURLs.next || loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-blue hover:border-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Nästa vecka &rarr;
          </button>
        </div>

        {/* current school title */}
        {menu.length > 0 && searchQuery && (
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-800">{searchQuery}</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Aktuell matsedel</p>
          </div>
        )}

        {/* Weekly Menu */}
        <div className="space-y-6">
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
                      <div className="flex gap-1">
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

                  {day.dinnerSuggestion && (
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
                        <span className="text-xs text-slate-400 italic border-l border-slate-300 pl-2">
                          {day.dinnerSuggestion.matchReason}
                        </span>
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
                        <a
                          href={`https://www.mathem.se/sok?q=${encodeURIComponent(day.dinnerSuggestion.dish)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-[10px] font-black bg-[#4793AF] text-white px-3 py-2 rounded-lg hover:bg-brand-dark transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
                        >
                          <Search className="w-3 h-3" />
                          HANDLA PÅ MATHEM
                        </a>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>



        {/* Info & Tips Section - SEO Content */}
        <section className="mt-16 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-black text-[#051c2c]">Smartare middagsplanering för barnfamiljer</h2>
            <p className="text-slate-600 leading-relaxed">
              Att få ihop vardagspusslet är inte lätt. <strong>Middagsmeny</strong> är ett gratis verktyg som hjälper dig att se vad barnen ätit i skolan och automatiskt föreslår en middag som kompletterar lunchen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-6 text-sm text-slate-600">
            <div className="space-y-2">
              <h3 className="font-bold text-[#051c2c] flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                Varierad kost
              </h3>
              <p>Vi ser till att du inte serverar pasta bolognese till middag om barnen redan ätit det till lunch.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-[#051c2c] flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-brand-yellow" />
                Enkla recept
              </h3>
              <p>Våra förslag är anpassade för vardagar – snabbt, gott och barnvänligt.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-[#051c2c] flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-red" />
                Helt gratis
              </h3>
              <p>Tjänsten finansieras av annonser och frivilliga bidrag, så att den kan förbli gratis för alla.</p>
            </div>
          </div>
        </section>

        {/* Footer / Monetization */}
        <footer className="pt-8 pb-4 text-center border-t border-slate-100 mt-12">
          <a
            href="https://buymeacoffee.com/edysweden"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFDD00] text-slate-900 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all text-sm"
          >
            <Coffee className="w-5 h-5" />
            Gillar du appen? Bjud på en kaffe!
          </a>
          <div className="flex flex-col gap-2 mt-6">
            <p className="text-slate-400 text-xs">
              Middagsmeny © {new Date().getFullYear()} — Gör vardagspusslet enklare.
            </p>
            <a href="/privacy" className="text-slate-400 text-[10px] hover:text-slate-600 underline decoration-slate-300 underline-offset-2">
              Integritetspolicy
            </a>
          </div>
        </footer>

      </main >

      {/* Interstitial Ad / Welcome Modal */}
      {
        showAd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500">
            <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-300 relative border border-white/20">

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowAd(false);
                  sessionStorage.setItem('mm_seen_ad', 'true');
                }}
                className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white md:text-white" />
              </button>

              {/* Header Content */}
              <div className="bg-[#051c2c] p-10 text-white text-center relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <Utensils className="absolute -top-10 -right-10 w-48 h-48 rotate-12" />
                  <Utensils className="absolute -bottom-10 -left-10 w-48 h-48 -rotate-12" />
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#FFC470]/20 text-[#FFC470] text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    Välkommen till
                  </div>
                  <h3 className="text-4xl font-black tracking-tight leading-none">Middagsmeny</h3>
                  <p className="text-[#FFC470] text-sm font-medium opacity-90 max-w-[200px] mx-auto">
                    Vi matchar skollunchen med smarta middagsförslag
                  </p>
                </div>
              </div>

              <div className="p-8 text-center space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-slate-800">Slipp bära hem maten?</h4>
                  <p className="text-slate-500 text-sm">
                    Just nu får du ett exklusivt erbjudande när du planerar dina middagar med oss.
                  </p>
                </div>

                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 relative group transition-all flex flex-col items-center justify-center min-h-[300px]">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                    Annons
                  </div>
                  {/* Google Ads Placeholder - 300x250 or Responsive */}
                  <div className="w-[300px] h-[250px] bg-slate-200 flex items-center justify-center rounded-lg text-slate-400 font-medium text-sm border border-slate-300">
                    Här visas en Google Ad
                  </div>
                  <p className="text-slate-400 text-xs mt-4 max-w-[250px]">
                    Relevanta erbjudanden för dig och din familj.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowAd(false);
                      sessionStorage.setItem('mm_seen_ad', 'true');
                    }}
                    className="w-full py-4 bg-[#FFC470] text-[#051c2c] text-base font-black rounded-2xl hover:bg-[#ffb44d] transition-all shadow-[0_4px_0_rgb(221,87,70)] active:shadow-none active:translate-y-1"
                  >
                    Börja planera nu
                  </button>
                  <p className="text-[9px] text-slate-400 mt-4 leading-relaxed italic">
                    Genom att använda Middagsmeny hjälper du oss att hålla tjänsten gratis. Tack!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {/* Cookie Consent Banner */}
      {
        showCookieConsent && (
          <div className="fixed bottom-4 left-4 right-4 z-[60] animate-in slide-in-from-bottom-full duration-500">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 flex items-start gap-4 text-left">
                <div className="bg-brand-yellow/20 p-3 rounded-xl flex-shrink-0">
                  <Cookie className="w-6 h-6 text-[#051c2c]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Cookies & Information</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Vi använder lokala data (local storage) för att komma ihåg dina sparade skolor och favoriter, samt för att tjänsten ska fungera tekniskt. Genom att använda Middagsmeny godkänner du detta.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  localStorage.setItem('mm_cookie_consent', 'true');
                  setShowCookieConsent(false);
                }}
                className="w-full md:w-auto px-8 py-3 bg-[#051c2c] text-white text-sm font-bold rounded-xl hover:bg-brand-dark transition-all shadow-md active:scale-95"
              >
                Jag förstår
              </button>
            </div>
          </div>
        )
      }

    </div >
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Laddar...</div>}>
      <HomeContent />
    </Suspense>
  );
}

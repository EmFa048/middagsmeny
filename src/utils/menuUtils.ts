import { format, parseISO } from 'date-fns';

export interface Dish {
    id: string;
    name: string;
    description: string | null;
}

export interface SchoolMeal {
    name: string;
    date: string;
    courses: Dish[];
}

export interface DayMenu {
    date: string;
    schoolMeals: SchoolMeal[];
    dinnerSuggestion?: {
        dish: string;
        description: string;
        vegetarian: boolean;
        recipeLink: string;
        matchReason: string;
    };
}

export const DEFAULT_DISHES = [
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

export function generateMockSuggestion(
    schoolMeals: SchoolMeal[],
    prefs: { vegetarian: boolean; noPork: boolean; noFish: boolean },
    custom: any[] = [],
    favDishNames: string[] = [],
    avoidDishes: string[] = [],
    forceDish?: string
) {
    const allDishes = [...DEFAULT_DISHES, ...custom];

    if (forceDish) {
        const found = allDishes.find(d => d.dish === forceDish);
        if (found) {
            const dishName = found.dish.toLowerCase();
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
        }
    }

    const schoolDishNames = schoolMeals.flatMap(m => m.courses.map(c => c.name.toLowerCase()));
    const schoolDescriptions = schoolMeals.flatMap(m => m.courses.map(c => c.description?.toLowerCase() || ''));
    const schoolToText = [...schoolDishNames, ...schoolDescriptions].join(' ');

    let availableDishes = allDishes.filter(d => {
        if (prefs.vegetarian && !d.vegetarian) return false;
        if (prefs.noPork && d.tags?.includes('pork')) return false;
        if (prefs.noFish && d.tags?.includes('fish')) return false;
        return true;
    });

    const getCoreCategory = (d: any) => {
        const tags = d.tags || [];
        const text = (d.dish + ' ' + (d.description || '')).toLowerCase();

        if (prefs.vegetarian) {
            if (text.includes('pizza')) return 'pizza';
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

        if (tags.includes('soup') || text.includes('soppa')) return 'soup';
        if (tags.includes('fish') || text.includes('lax') || text.includes('torsk')) return 'fish';
        if (tags.includes('vegetarian')) return 'vegetarian';
        if (tags.includes('chicken') || text.includes('kyckling')) return 'chicken';
        if (tags.includes('minced_sausage') || text.includes('köttfärs') || text.includes('färs') || text.includes('korv')) return 'minced_sausage';
        if (tags.some((t: string) => ['meat', 'pork'].includes(t)) || text.includes('kött') || text.includes('biff')) return 'red_meat';
        return null;
    };

    const usedWeekCategories = avoidDishes.map(usedName => {
        const d = allDishes.find(ad => ad.dish === usedName);
        return d ? getCoreCategory(d) : null;
    }).filter(Boolean);

    const lastDishName = avoidDishes[avoidDishes.length - 1];
    const lastDish = allDishes.find(ad => ad.dish === lastDishName);
    const lastCategory = lastDish ? getCoreCategory(lastDish) : null;

    const scoredDishes = availableDishes.map(d => {
        let score = 0;
        const currentCategory = getCoreCategory(d);
        const dishNameLower = d.dish.toLowerCase();
        const dishDescLower = d.description?.toLowerCase() || '';

        if (schoolDishNames.some(name => name.includes(dishNameLower) || dishNameLower.includes(name))) {
            score += 5000;
        }

        const categories = [
            { tag: 'fish', keywords: ['fisk', 'lax', 'torsk', 'spätta', 'sej', 'strömming', 'makrill', 'skaldjur', 'räkor', 'fiskgratäng', 'fiskpinnar'] },
            { tag: 'chicken', keywords: ['kyckling', 'nuggets', 'piccata', 'jacob', 'hönskött', 'kycklingfilé'] },
            { tag: 'pork', keywords: ['fläsk', 'skinka', 'bacon', 'salami', 'salsiccia', 'korv', 'kassler', 'falukorv', 'kotlett', 'schnitzel', 'chorizo', 'frankfurter', 'hot dog'] },
            { tag: 'meat', keywords: ['kött', 'nöt', 'biff', 'färs', 'innerfilé', 'entrecote', 'högrev', 'kalv', 'rydberg', 'steak', 'oxe'] },
            { tag: 'minced_sausage', keywords: ['köttfärs', 'korv', 'färs', 'bolognese', 'biffar', 'köttbullar', 'stroganoff', 'lasagne', 'kebab', 'burgare', 'pudding', 'dolmar', 'panna'] },
        ];

        const combinedKeywords = ['kyckling', 'fisk', 'korv', 'lax', 'torsk', 'färs', 'kött', 'pasta', 'ris', 'soppa'];
        combinedKeywords.forEach(kw => {
            if (schoolToText.includes(kw) && (dishNameLower.includes(kw) || dishDescLower.includes(kw))) {
                score += 1000;
            }
        });

        categories.forEach(cat => {
            if (cat.keywords.some(word => schoolToText.includes(word))) {
                if (d.tags?.includes(cat.tag)) score += 500;
            }
        });

        if (currentCategory && currentCategory === lastCategory) {
            score += 300;
        }

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
            score += 500;
        }

        if (currentCategory) {
            if (usedWeekCategories.includes(currentCategory)) {
                score += 200;
            } else {
                score -= 50;
            }
        }

        if (d.avoidIfSchoolServes) {
            d.avoidIfSchoolServes.forEach((term: string) => {
                if (schoolToText.includes(term.toLowerCase())) score += 300;
            });
        }

        if (favDishNames.includes(d.dish)) score -= 100;

        return { ...d, score };
    });

    scoredDishes.sort((a, b) => a.score - b.score);
    let pool = scoredDishes.filter(d => d.score < 1500);

    if (pool.length < 15) {
        pool = scoredDishes.slice(0, Math.max(15, Math.floor(scoredDishes.length * 0.15)));
    }

    if (pool.length === 0) {
        pool = scoredDishes.slice(0, 3);
    }

    const uniquePool = pool.filter(d => !avoidDishes.includes(d.dish));
    if (uniquePool.length > 0) pool = uniquePool;

    if (pool.length === 0) return undefined;

    const selected = pool[Math.floor(Math.random() * pool.length)];

    return {
        dish: selected.dish,
        description: selected.description,
        vegetarian: selected.vegetarian,
        recipeLink: `https://www.google.com/search?q=recept+${encodeURIComponent(selected.dish)}`,
        matchReason: selected.score < -5 ? 'Baserat på dina favoriter!' :
            selected.score < 5 ? 'Bra komplement till skollunchen.' :
                ''
    };
}

export function processMenu(
    rawMeals: any[],
    prefs: { vegetarian: boolean; noPork: boolean; noFish: boolean } = { vegetarian: false, noPork: false, noFish: false }
): DayMenu[] {
    if (!rawMeals || !Array.isArray(rawMeals)) return [];

    const grouped = new Map<string, SchoolMeal[]>();
    rawMeals.forEach((m: any) => {
        const date = m.date.split('T')[0];
        if (!grouped.has(date)) grouped.set(date, []);
        grouped.get(date)?.push({
            name: m.name || 'Lunch',
            date: m.date,
            courses: m.courses || []
        });
    });

    const sortedDates = Array.from(grouped.keys()).sort();
    const processedMenu: DayMenu[] = [];
    const usedDishes: string[] = [];

    for (const date of sortedDates) {
        const schoolMeals = grouped.get(date)!;
        const suggestion = generateMockSuggestion(schoolMeals, prefs, [], [], usedDishes);

        if (suggestion) {
            usedDishes.push(suggestion.dish);
        }

        processedMenu.push({
            date,
            schoolMeals,
            dinnerSuggestion: suggestion
        });
    }

    return processedMenu;
}

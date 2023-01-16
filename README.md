# Slutprojektet

Välkommen till den förinställda kodbasen för slutprojektet.
Se filen [Sketch](./src/sketch.ts) och [Game](./src/game.ts) filerna för hur ni bör börja skriva er kod!

Kom ihåg att använda git!

## Dokument & Artifakter

All dokument skall finnas i projektet som faktiska filer vid inlämningen. Det finns en mapp `./documents` som alla dokumenten skall sparas i. [Läs vidare här](./documents/README.md)!

## Utveckling

### Installation

Först behöver ni köra kommandot `npm install` för att installera nödvändiga moduler (p5, typescript, etc).

### Starta projektet

Kör kommandot `npm run dev` för att starta projektet och se det live i din webbläsare!

### Debugger

Det är starkt rekomenderat att ni använder debug-verktyget i VSCode för att hitta och lösa problem. Metoden vi primärt har använt tidigare är att skriva `console.log` men vi kan bli mer effektiva!

Debuggern låter er stanna programmet och stega rad för rad samtidigt som ni kan titta på vad variablerna innehåller. Det är speciellt användbart när ni arbetar med funktioner som anropas 60 gånger per sekund - console overload otherwise... 🤯

#### Starta Debuggern

För att starta debuggern tycker du på `F5` eller via play-knappen i "ActionBaren", se dock till att du har startat projektet innan (`npm run dev`). Ett nytt fönster kommer att öppnas som behöver användas för att få koden att stanna vid utsatta debugg-punkter.

### Potentiella problem

Versionen av p5.js är 1.5.0 medan senaste version av p5 typerna endast är uppdaterad till 1.4.3. Detta skulle kunna orsaka problem och det kan vara så att ni hittar något i p5's dokumention som inte finns tillgängligt i detta projektet - dock osannolikt.

Typings för de globala variablerna relaterat till p5.sound fungerar tyvärr inte - exempel finns för hur ni kan kringå detta. Se [loadSound funktionen](global.d.ts) för hur det kan göras.

## TODO

Lägg till ytterliggare information som är specifikt för ert projekt!

**LYCKA TILL!**

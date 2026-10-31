# Sthira

Registre de pràctica de ioga: asana, pranayama i temps distret, amb estadístiques.
App web instal·lable (PWA) que funciona sense connexió.

## Publicar-la a GitHub Pages

1. A github.com, crea un repositori nou i públic anomenat `practica`.
2. Toca **Add file → Upload files** i arrossega-hi tot el contingut d'aquesta carpeta:
   `index.html`, `manifest.webmanifest`, `sw.js`, `README.md` i la carpeta `icons`.
   Després toca **Commit changes**.
3. Ves a **Settings → Pages**. A **Branch**, tria `main` i `/ (root)` i toca **Save**.
4. Al cap d'1 o 2 minuts, l'app és a: https://lluis75.github.io/practica/

## Instal·lar-la a Android

1. Obre l'adreça amb **Chrome** al mòbil.
2. Menú ⋮ → **Instal·la l'aplicació** (o **Afegeix a la pantalla d'inici**).
3. Obre-la des de la icona: s'obre a pantalla completa, sense barra del navegador.

## Actualitzar-la

Puja el nou `index.html` al repositori. Per assegurar-te que el mòbil rep la versió nova,
canvia també el número de `practica-v11` a `sw.js` (per exemple, a `practica-v12`).
Tanca l'app i torna-la a obrir dues vegades.

## Les dades i les còpies de seguretat

Les dades es guarden només al mòbil, dins de l'app. Si desinstal·les l'app o esborres les dades de
Chrome, es perden. Per evitar-ho, ves a **Ajustos → Desa una còpia**: el mòbil et deixa desar el fitxer
a Google Drive, al correu o on vulguis. Per recuperar-les, **Ajustos → Restaura una còpia**.
L'app t'avisa si fa més de 14 dies que no en fas cap.

## Fitxers

- `index.html` — l'app
- `privacy.html` — política de privacitat (català i castellà), necessària per a Google Play
- `manifest.webmanifest`, `sw.js` — instal·lació i funcionament sense connexió
- `icons/`, `fonts/` — icones i tipografies (Cormorant Garamond i Jost, llicència SIL OFL)
- `.nojekyll` — fitxer ocult perquè GitHub Pages publiqui tot tal qual

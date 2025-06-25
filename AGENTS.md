# AGENTS.md

## 🌐 Website: BBQ & Feestplatform met Verhuur

Deze Nuxt 3-website is gebouwd voor een cateringbedrijf dat BBQ fine dining combineert met de verhuur van licht en geluid. De site is gericht op het aanbieden van pakketten, het tonen van sfeerimpressies en het vergemakkelijken van offerte-aanvragen voor feesten en evenementen.

---

## 🎨 Thema & Design

**Visuele stijl gebaseerd op:** [Fords Garage USA](https://fordsgarageusa.com/)

- **Stijl:** Vintage-industrieel, stoer, donker staal, verweerd hout, Americana
- **Gebruik van elementen:**
    - Tekst in vetgedrukte, retro typografie
    - Achtergronden in metaal- of betonstructuur
    - Gebruik van pictogrammen zoals moersleutels, vlammen, grills en microfoons
    - Donkere kleuren (antraciet, zwart, donkerbruin) met accenten van goud, olijfgroen of rood
    - Grote sfeerfoto’s en duidelijke call-to-actions
- **Frontend styling:** volledig met Tailwind CSS geconfigureerd op basis van dit thema

---

## 🧩 Agents / Modules

### 1. Nuxt Frontend (Vercel)
- **Framework:** Nuxt 3 (Vue 3 + Vite)
- **Styling:** Tailwind CSS (custom theming om industrieel karakter te benaderen)
- **Routing:** File-based routing (`pages/`)
- **Hosting:** Vercel (JAMstack met edge delivery)
- **SEO:** Meta tags, OpenGraph, sitemap module
- **Responsiveness:** Full mobile support met burger menu en mobiele call-to-actions

### 2. Foto-integratie via MinIO
- **Gebruik:** Opslag van foto's (catering, sfeer, verhuur)
- **Buckets:**
    - `catering-fotos`
    - `verhuur-fotos`
    - `portfolio`
- **Connectie:** via presigned URL’s, opgehaald door een API-route of edge function
- **Gebruik op frontend:** Lazy-loaded galleries, sliders en hover-zoom effecten

### 3. Contactformulier
- **Gebruik:** Klanten kunnen direct aanvragen indienen
- **Backend:** Formspree of Vercel Edge Functions (zonder database)
- **Beveiliging:** honeypot spamfilter en veldvalidatie

### 4. Offertegenerator (optioneel)
- **Doel:** Keuzes maken (personen, type feest, BBQ/stijl) → prijsindicatie krijgen
- **Integratie:** Via interactieve Vue-component of form-handling met Nuxt API-routes

---

## 📂 Projectstructuur (vereenvoudigd)
```bash
.
├── pages/               # Pagina’s zoals index.vue, catering.vue, contact.vue
├── components/          # Hero.vue, Gallery.vue, OfferForm.vue, MenuCard.vue
├── layouts/             # default.vue met vintage header/footer
├── assets/              # Tailwind-config, fonts, achtergrondstructuren
├── public/              # Statische icons, favicon, retro decoraties
├── server/api/          # (optioneel) MinIO upload & fetch
├── utils/               # signedUrl.js, priceCalculator.js
├── nuxt.config.ts       # Configuratie met meta, Tailwind, runtimeEnv
├── tailwind.config.js   # Vintage kleurenschema en typografie
└── AGENTS.md            # Dit bestand

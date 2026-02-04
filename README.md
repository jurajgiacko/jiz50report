# Enervit × Jizerská 50 | Partner Report 2026

## O tomto reportu

Profesionálna webová prezentácia partnerstva Enervit a Jizerská 50 pre obchodných partnerov. Report je navrhnutý v štýle Big 4 konzultačných firiem s dôrazom na:

- **Executive Summary** - Kľúčové metriky a hodnota partnerstva
- **Brand Aktivácie** - Prehľad všetkých aktivácií na evente
- **Dosah & Impact** - Mediálne pokrytie a čísla
- **ROI Framework** - Strategický prínos partnerstva
- **Výhľad 2027** - Jubilejný 60. ročník

## Spustenie

1. Otvorte súbor `index.html` vo webovom prehliadači
2. Zadajte PIN: **2026**
3. Prezentácia sa automaticky spustí

## Zmena PIN kódu

V súbore `script.js` nájdite konfiguráciu:

```javascript
const CONFIG = {
    PIN: '2026',  // Zmeňte na požadovaný PIN
    ...
};
```

## Pridanie fotografií

1. Skopírujte fotografie do priečinka `assets/`
2. V súbore `index.html` nahraďte placeholder sekcie skutočnými obrázkami:

```html
<div class="activation-card-img">
    <img src="assets/vasa-fotka.jpg" alt="Popis">
</div>
```

## Štruktúra projektu

```
enervit-jiz50-report/
├── index.html          # Hlavný HTML súbor
├── styles.css          # Štýly prezentácie
├── script.js           # Interaktivita a PIN ochrana
├── assets/             # Obrázky a logá
│   └── enervit-logo-white.svg
└── README.md           # Tento súbor
```

## Technické požiadavky

- Moderný webový prehliadač (Chrome, Firefox, Safari, Edge)
- JavaScript povolený
- Žiadne ďalšie závislosti

## Nasadenie pod PIN

Pre produkčné nasadenie odporúčame:

1. **Statický hosting** - Netlify, Vercel, GitHub Pages
2. **Basic Auth** - Serverová ochrana heslom
3. **CDN** - Pre rýchlejšie načítanie obrázkov

## Kontakt

Enervit Czech Republic
[eshop.enervit.cz](https://eshop.enervit.cz)

---

*Partner Report 2026 | Jizerská 50 × Enervit*
*Důvěrný dokument pro obchodní partnery*

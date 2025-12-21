# Impara le Percentuali! 🎯

Un'applicazione web interattiva per insegnare le percentuali ai bambini delle elementari.

## Caratteristiche

### 🔍 Modalità Esplora
Esplora liberamente 4 concetti sulle percentuali:
- **Parti del 100**: Visualizza una griglia 10×10 che si colora in base alla percentuale
- **Calcola**: Scopri quanto è una percentuale di un numero
- **Confronta**: Confronta due percentuali visivamente
- **Frazioni**: Converti frazioni in percentuali

### 🎯 Quiz
Sistema di quiz con 3 livelli di difficoltà:
- **Facile**: Percentuali di 100 e frazioni semplici
- **Medio**: Calcoli con numeri più complessi
- **Difficile**: Decimali e ordinamenti

Sistema di punteggio con stelle ⭐

### 🎮 Mini-Giochi
3 giochi interattivi:
- **Riempi il Bicchiere**: Riempi un bicchiere SVG al livello richiesto
- **Colora la Torta**: Colora la frazione corretta di una torta
- **Gara di Percentuali**: Rispondi velocemente per avanzare

### 📚 Impara
Schede educative con spiegazioni semplici e esempi interattivi

## Tecnologie Utilizzate

- **HTML5**: Struttura semantica
- **CSS3**: Styling responsive con CSS custom properties
- **Vanilla JavaScript**: Logica applicativa
- **Chart.js**: Grafici interattivi (torta, doughnut)
- **Anime.js**: Animazioni fluide
- **SVG**: Visualizzazioni scalabili
- **Font Awesome**: Icone
- **Google Fonts (Quicksand)**: Font amichevole per bambini

## Come Usare

### Apertura Locale
1. Apri il file `index.html` direttamente nel browser
2. L'app funziona completamente offline dopo il primo caricamento delle CDN

### Browser Supportati
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & iOS)
- ❌ Internet Explorer (non supportato)

### Mobile-Friendly
- Slider touch-friendly (min 44px)
- Layout responsive
- Ottimizzato per iOS Safari
- Supporto landscape su tablet

## Struttura File

```
04_percentages/
├── index.html              # Pagina principale
├── css/
│   └── styles.css          # Stili CSS completi
├── js/
│   ├── app.js              # State management e routing
│   ├── visualizations.js   # Chart.js e SVG
│   ├── quiz.js             # 30 domande quiz
│   └── games.js            # 3 mini-giochi
├── assets/
│   └── sounds/             # (opzionale per suoni)
└── README.md               # Questo file
```

## Palette Colori

```css
--primary: #FF6B6B;      /* Rosso corallo allegro */
--secondary: #4ECDC4;    /* Turchese vivace */
--accent: #FFE66D;       /* Giallo sole */
--success: #95E1D3;      /* Verde menta */
--purple: #C7B3E9;       /* Viola pastello */
--orange: #FFA07A;       /* Arancione chiaro */
```

## Concetti Educativi Implementati

1. **Percentuali come parti del 100** (25% = 25/100)
2. **Percentuali di quantità** (20% di 50 = 10)
3. **Confronto tra percentuali** (30% vs 70%)
4. **Conversione frazioni-percentuali** (1/2 = 50%)

## Funzionalità Avanzate

- ✅ Animazioni fluide con Anime.js
- ✅ Feedback visuale immediato
- ✅ Sistema di punteggio con stelle
- ✅ Effetti confetti per vittorie
- ✅ Griglia SVG animata (stagger effect)
- ✅ Chart.js con animazioni custom
- ✅ Responsive design (mobile-first)
- ✅ Accessibilità (ARIA labels, keyboard navigation)

## Performance

- ⚡ Zero build process
- ⚡ CDN per librerie esterne
- ⚡ Throttling su slider events (100ms)
- ⚡ Animazioni ottimizzate (60fps)
- ⚡ Lazy initialization dei chart

## Sviluppo Futuro (Opzionale)

- [ ] Feedback sonori
- [ ] Modalità multiplayer locale
- [ ] Salvataggio progressi (localStorage)
- [ ] Più livelli di difficoltà
- [ ] Certificati stampabili
- [ ] Modalità dark mode

## Crediti

Sviluppato con ❤️ per bambini delle elementari.

**Librerie Open Source:**
- Chart.js v4.4.0
- Anime.js v3.2.2
- Font Awesome v6.4.0

## Licenza

Questo progetto educativo è open source.

# Testing & Debug Guide

## Come Testare l'Applicazione

### 1. Aprire l'Applicazione
Apri il file `index.html` nel browser:
- **Desktop**: Doppio click su `index.html`
- **Da terminale**: `open index.html` (Mac) o `start index.html` (Windows)
- **Da server locale**: `python3 -m http.server 8000` poi vai a `http://localhost:8000`

### 2. Verificare la Console del Browser
Apri la console JavaScript del browser per vedere i log di debug:
- **Chrome/Edge**: F12 o Cmd+Option+J (Mac) / Ctrl+Shift+J (Windows)
- **Firefox**: F12 o Cmd+Option+K (Mac) / Ctrl+Shift+K (Windows)
- **Safari**: Cmd+Option+C (Mac) - abilita prima "Sviluppo" nelle preferenze

### 3. Log Attesi nella Console

Quando carichi la pagina, dovresti vedere questi messaggi nella console:

```
visualizations.js loaded successfully
quiz.js loaded successfully
games.js loaded successfully
app.js loaded successfully
App initialized
Feature Support: {SVG: true, ChartJS: true, AnimeJS: true}
Creating grid 100...
Grid created with 100 cells
Updating grid: 50 cells to fill out of 100
All modules initialized
```

### 4. Verifica Funzionalità

#### Modalità Esplora - Tab "Parti del 100"
✅ **Cosa dovresti vedere**:
- Griglia 10×10 con 100 quadratini
- Prime 50 celle colorate di rosso (#FF6B6B)
- Restanti 50 celle grigie chiare con bordo
- Slider che va da 0 a 100
- Numero "50" visualizzato

✅ **Test**:
1. Muovi lo slider → le celle si colorano/scolorano con animazione
2. Console mostra: `Updating grid: X cells to fill out of 100`

#### Altri Tab
✅ **Tab "Calcola"**: Grafico a ciambella con percentuale
✅ **Tab "Confronta"**: Due grafici a torta affiancati
✅ **Tab "Frazioni"**: Grafico con frazione selezionata

## Problemi Comuni & Soluzioni

### Problema: Vedo solo un blocco grigio
**Causa**: La griglia non viene creata

**Debug**:
1. Apri la console
2. Cerca messaggi di errore
3. Verifica che vedi: "Creating grid 100..." e "Grid created with 100 cells"

**Se NON vedi questi messaggi**:
- Ricaricare la pagina con Ctrl+F5 (forza reload)
- Verifica che tutti i file JS siano caricati (tab Network nella console)
- Controlla errori JavaScript nella console

**Se vedi "SVG grid100 not found!"**:
- Problema con l'HTML, verifica che esista `<svg id="grid100">`

**Se vedi "No cells found in grid!"**:
- La griglia viene creata ma le celle non sono aggiunte
- Possibile problema con SVG namespace

### Problema: Le animazioni non funzionano
**Causa**: Anime.js non caricato

**Soluzione**:
- Verifica connessione internet (Anime.js viene da CDN)
- Console dovrebbe mostrare: `AnimeJS: true`
- Se offline, le animazioni non funzioneranno ma l'app dovrebbe comunque aggiornare i colori

### Problema: I grafici non si vedono
**Causa**: Chart.js non caricato

**Soluzione**:
- Verifica connessione internet (Chart.js viene da CDN)
- Console dovrebbe mostrare: `ChartJS: true`
- Verifica nella tab Network che `chart.js` sia caricato (200 OK)

### Problema: Mobile - slider difficile da usare
**Causa**: Slider troppo piccolo

**Soluzione**:
- Gli slider dovrebbero avere almeno 44px di altezza (iOS standard)
- Verifica con DevTools mobile emulation
- I thumb (pallini) dovrebbero essere 44×44px su mobile

## Test Mobile (iOS Safari)

### Preparazione
1. Carica i file su un server web o usa ngrok per esporre localhost
2. Apri Safari su iPhone/iPad
3. Abilita console web: Impostazioni > Safari > Avanzate > Web Inspector

### Test Checklist
- [ ] Header visibile e leggibile
- [ ] Menu navigazione accessibile con pollice
- [ ] Slider muovibile con tocco
- [ ] Grafici renderizzati correttamente
- [ ] Animazioni fluide (no lag)
- [ ] Testo leggibile (min 16px)
- [ ] Bottoni touch-friendly (min 44×44px)
- [ ] Orientamento landscape funziona

## Performance Check

Apri Chrome DevTools > Performance:
1. Registra mentre muovi uno slider
2. Verifica FPS (dovrebbe stare ~ 60fps)
3. Se FPS < 30, le animazioni sono troppo pesanti

## Comandi Utili Console Browser

Puoi testare manualmente le funzioni nella console:

```javascript
// Test creare griglia manualmente
createGrid100();

// Test aggiornare griglia
updateGrid100(75);

// Test Chart.js
createCalcChart();
updateCalcChart(30, 100);

// Verifica stato app
console.log(AppState);

// Test animazione
if (anime) {
    anime({
        targets: '.grid-cell',
        scale: [1, 1.1, 1],
        duration: 500
    });
}
```

## Modifiche per Debug Intensivo

Se hai ancora problemi, aggiungi temporaneamente in `app.js`:

```javascript
// In initParts100Tab(), prima del setTimeout
console.log('initParts100Tab called');
console.log('createGrid100 is:', typeof createGrid100);
console.log('SVG element:', document.getElementById('grid100'));
```

## Browser Supportati

✅ **Funziona**:
- Chrome 90+ (Desktop & Android)
- Firefox 88+ (Desktop & Android)
- Safari 14+ (Desktop & iOS)
- Edge 90+

❌ **Non Supportato**:
- Internet Explorer (qualsiasi versione)
- Browser molto vecchi senza supporto ES6

## Cache del Browser

Se hai fatto modifiche ma non vedi cambiamenti:
1. **Hard Reload**: Ctrl+F5 (Windows) / Cmd+Shift+R (Mac)
2. **Cancella Cache**: DevTools > Application > Clear Storage
3. **Incognito/Private**: Apri in finestra privata

## Contatti per Bug

Se trovi bug, annota:
- Browser e versione
- Sistema operativo
- Messaggi nella console
- Screenshot dell'errore
- Step per riprodurre

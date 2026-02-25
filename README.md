# Portfolio Selina Schindler

Interaktives Portfolio auf Basis von React und Vite.

## Entwicklung

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Letzte Refactorings

- Buchungsflow strukturiert: Hilfsfunktionen und Konstanten klarer getrennt.
- Duplikate reduziert (u. a. Tierart-Optionen und Formular-Fehlerausgabe).
- Accessibility verbessert (`aria-label`, `aria-disabled`, `role="alert"`).
- Datumsvergleich robust gegen Zeitzonen-Effekte (lokales Datum statt UTC-String).
- Keine neuen Dependencies, keine Business-Logik- oder Validierungsänderungen.

# Cookie Consent Manager - Early PageView Version

## ⚠️ WICHTIGER RECHTLICHER HINWEIS

**Diese Version ist in der EU/DSGVO rechtlich problematisch!**

Diese Variante des Cookie Consent Managers feuert das Facebook Pixel PageView-Event **sofort beim Laden der Seite**, noch **bevor** der Nutzer seine Einwilligung gegeben hat.

### Rechtliche Risiken:

- **DSGVO-Verstoß**: Nach Art. 6 Abs. 1 lit. a DSGVO ist eine Einwilligung VOR der Datenverarbeitung erforderlich
- **ePrivacy-Richtlinie**: Cookies dürfen nur nach vorheriger Einwilligung gesetzt werden
- **Abmahnrisiko**: Wettbewerber oder Verbraucherschutzverbände können abmahnen
- **Bußgelder**: Datenschutzbehörden können Bußgelder verhängen (bis zu 20 Mio. € oder 4% des Jahresumsatzes)

### Wann könnte diese Version verwendet werden?

- **Außerhalb der EU**: In Ländern ohne strenge Datenschutzgesetze (z.B. USA ohne CCPA-Anforderungen)
- **Auf eigenes Risiko**: Wenn du die rechtlichen Konsequenzen bewusst in Kauf nimmst
- **Für Tests**: Nur zu Testzwecken in einer Entwicklungsumgebung

## Was macht diese Version anders?

### Unterschiede zur Standard-Version:

1. **Facebook Pixel wird sofort geladen** (Zeile 18-32)
   - Der Pixel-Code wird direkt beim DOMContentLoaded-Event ausgeführt
   - `fbq('track', 'PageView')` feuert sofort, ohne auf Consent zu warten

2. **Google Analytics wartet weiterhin auf Consent**
   - GA wird erst nach Zustimmung geladen (DSGVO-konform)

3. **Visuelle Hinweise im Banner**
   - Roter Warnhinweis im Cookie-Banner
   - Hinweis in den Cookie-Details

## Installation

Identisch zur Standard-Version:

```html
<script src="/pfad/zu/cookie-consent-early-pageview.js" defer></script>
```

## Konfiguration

Gleiche Konfiguration wie in der Standard-Version:

```javascript
var googleAnalyticsID = 'G-XXXXXXXXXX';
var facebookPixelID   = '1234567890';
var linkImpressum = '/impressum';
var linkDatenschutz = '/datenschutz';
```

## DSGVO-konforme Alternativen

Wenn du PageViews ohne Consent tracken möchtest, gibt es bessere Alternativen:

### 1. Facebook Conversion API (CAPI)
- Server-seitiges Tracking
- Keine Browser-Cookies erforderlich
- Anonymisierte Daten möglich
- Erst nach Consent vollständige Daten senden

### 2. Consent Mode (Google & Facebook)
- "Ping" ohne personenbezogene Daten
- Aggregierte Statistiken
- Conversion Modeling
- DSGVO-konform

### 3. Anonymisiertes Tracking
- Nur aggregierte Daten
- Keine IP-Adressen
- Keine User-IDs
- Keine Cookies

## Empfehlung

**Nutze die Standard-Version** (`cookie-consent.js` oder `cookie-consent-pro.js`) für DSGVO-konforme Implementierung!

Wenn du unbedingt frühe PageViews brauchst, implementiere stattdessen:
- Facebook Conversion API mit anonymisierten Daten
- Google Analytics 4 mit Consent Mode
- Server-seitiges Tracking ohne Browser-Cookies

## Support

Bei Fragen zur DSGVO-konformen Implementierung wende dich an einen Datenschutzexperten oder Rechtsanwalt.

---

**Erstellt am**: 18. Dezember 2024  
**Version**: 1.0 (Early PageView - Nicht für EU-Produktion empfohlen)

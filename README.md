# Cookie Consent Manager

Eine schlanke und robuste Lösung zur Einholung und Verwaltung von Cookie-Einwilligungen auf Ihrer Webseite.

## Funktionen

*   **DSGVO-konforme Einwilligung:** Einholung expliziter Einwilligungen für nicht-essenzielle Cookies.
*   **Granulare Kontrolle:** Nutzer können Marketing-, funktionale und sonstige Cookies separat aktivieren/deaktivieren.
*   **Google Tag Manager (GTM) Integration:** Automatische `dataLayer`-Events bei jeder Einwilligungsänderung.
*   **Einfache Integration:** Copy-Paste-Lösung.
*   **Anpassbares Design:** Vollständig anpassbar (CSS in der Library integriert).
*   **Widerrufsmöglichkeit:** Floating Button zum erneuten Aufrufen der Einstellungen.

## Installation

### Schritt 1: JavaScript einbinden

Die Bibliothek liegt im `dist`-Ordner und kann direkt eingebunden werden.

```html
<script src="dist/cookie-consent.js"></script>
<script>
  new CookieConsentManager({
      googleAnalyticsId: 'G-XXXXXXXXXX', // Optional: Ihre Google Analytics ID
      facebookPixelId: '1234567890',     // Optional: Ihre Facebook Pixel ID
      privacyPolicyUrl: '/datenschutz',  // Pfad zu Ihrer Datenschutzerklärung
      imprintUrl: '/impressum',          // Pfad zu Ihrem Impressum
      language: 'de'                     // Sprache: 'de' oder 'en' (Standard: 'en')
  });
</script>
```

### Schritt 2: Verzeichnisstruktur

Das Projekt ist nun so strukturiert, dass Sie einfach den **gesamten `dist` Ordner** kopieren können:

*   `dist/cookie-consent.js`: Die Logik. lädt automatisch das CSS nach.
*   `dist/cookie-consent.css`: Das Design. Kann bei Bedarf angepasst werden.
*   `demo.html`: Demo zur Ansicht.

## Konfiguration

Das `CookieConsentManager` Objekt akzeptiert folgende Konfigurationsoptionen:

| Option | Typ | Beschreibung |
| :--- | :--- | :--- |
| `googleAnalyticsId` | String | Ihre Google Analytics Tracking-ID (z.B. 'G-ABCDEF123'). Lädt GA nur nach Einwilligung. |
| `facebookPixelId` | String | Ihre Facebook Pixel ID. Lädt Pixel nur nach Einwilligung. |
| `privacyPolicyUrl` | String | Link zu Ihrer Datenschutzerklärung (Standard: `/privacy-policy`). |
| `imprintUrl` | String | Link zu Ihrem Impressum (Standard: `/imprint`). |
| `language` | String | Sprache der Benutzeroberfläche ('de' oder 'en'). |

## Datenschutz

Der Cookie Consent Manager speichert die Entscheidung des Nutzers lokal im Browser (`localStorage` item `cookieConsent`).

*   **Werte:** `all`, `marketing`, `essential`, `essential_other`, `essential_functional`, `essential_other_functional`
*   **Dauer:** Dauerhaft (bis der Nutzer den Browser-Cache löscht oder widerruft).

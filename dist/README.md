# Cookie Consent Library

Eine einfache, datenschutzkonforme Cookie-Consent-Lösung, die leicht in jede Webseite integriert werden kann.

## Installation

1. Kopieren Sie die Datei `cookie-consent-library.js` in Ihr Projekt.
2. Fügen Sie folgenden Code in den `<head>` oder am Ende des `<body>` Ihrer HTML-Seite ein:

```html
<script src="pfad/zu/cookie-consent-library.js"></script>
<script>
    new CookieConsentManager({
        // Ihre Google Analytics ID (optional)
        googleAnalyticsId: 'G-XXXXXXXXXX', 
        
        // Ihre Facebook Pixel ID (optional)
        facebookPixelId: 'XXXXXXXXXXXXXXX',
        
        // Link zu Ihrer Datenschutzerklärung
        privacyPolicyUrl: '/datenschutz',
        
        // Link zu Ihrem Impressum
        imprintUrl: '/impressum'
    });
</script>
```

## Funktionen

- **Automatische CSS-Injection:** Kein separates CSS-File nötig. Alles ist im JS enthalten.
- **Konfigurierbar:** IDs und Links können einfach übergeben werden.
- **DSGVO-Konform:** Tracking-Skripte werden erst nach expliziter Zustimmung geladen.
- **Floating Button:** Ein kleiner Button unten links ermöglicht es Nutzern, ihre Entscheidung jederzeit zu ändern.

## Anpassung

Farben und Stile sind derzeit im JavaScript eingebettet (`cssStyles` Variable). Um das Design zu ändern, können Sie den CSS-String in der `cookie-consent-library.js` bearbeiten oder eigene CSS-Regeln mit `!important` in Ihre Webseite einfügen, um die Stile zu überschreiben.

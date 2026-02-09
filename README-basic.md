# Cookie Consent Manager (Basis-Version)

Diese Dokumentation beschreibt die Installation und Konfiguration des Cookie Consent Managers in der Basis-Version, die eine einfache und DSGVO-konforme Einholung von Cookie-Einwilligungen ermöglicht.

## Inhaltsverzeichnis
1.  [Einleitung](#1-einleitung)
2.  [Funktionen](#2-funktionen)
3.  [Installation](#3-installation)
4.  [Konfiguration](#4-konfiguration)
5.  [DSGVO-Konformität](#5-dsgvo-konformität)
6.  [Support & Kontakt](#6-support--kontakt)

---

## 1. Einleitung

Der Cookie Consent Manager (Basis-Version) ist eine schlanke und robuste Lösung zur Einholung und Verwaltung von Cookie-Einwilligungen auf Ihrer Webseite. Er ermöglicht es Ihnen, die notwendigen Einwilligungen für nicht-essenzielle Cookies gemäß DSGVO einzuholen, ohne eine serverseitige Protokollierung zu verwenden.

## 2. Funktionen

*   **DSGVO-konforme Einwilligung:** Einholung expliziter Einwilligungen für nicht-essenzielle Cookies.
*   **Granulare Kontrolle:** Nutzer können Marketing-, funktionale und sonstige Cookies separat aktivieren/deaktivieren.
*   **Einfache Integration:** Copy-Paste-Lösung für JavaScript.
*   **Anpassbares Design:** Über `style.css` vollständig anpassbar.
*   **Widerrufsmöglichkeit:** Floating Button zum erneuten Aufrufen der Einstellungen.

## 3. Installation

### 3.1 Allgemeine Installation

Kopieren Sie den gesamten Inhalt der Datei `cookie-consent.js` und fügen Sie ihn in den `<head>`-Bereich Ihrer Webseite ein. Alternativ können Sie die Datei auch auf Ihren Webserver hochladen und wie folgt einbinden:

```html
<script src="/pfad/zu/cookie-consent.js" defer></script>
```
*(Hinweis: Wenn Sie die Datei direkt in den HTML-Code kopieren, stellen Sie sicher, dass der gesamte Inhalt inklusive der `<script>`-Tags übernommen wird.)*

### 3.2 WordPress Installation

Für die Installation in einer WordPress-Umgebung gehen Sie wie folgt vor:

1.  **JavaScript (`cookie-consent.js`) einbinden:**
    *   **Option A (Empfohlen für einfache Integration):** Kopieren Sie den gesamten Inhalt der Datei `cookie-consent.js` (inklusive der `<script>`-Tags) und fügen Sie ihn im WordPress-Backend unter **"Design" -> "Theme-Editor"** (oder einem ähnlichen Bereich, je nach Theme) in die Datei `header.php` direkt vor dem schließenden `</head>`-Tag ein.
    *   **Option B (Für fortgeschrittene Nutzer/Themes):** Laden Sie die Datei `cookie-consent.js` per FTP in das Verzeichnis Ihres Child-Themes oder in ein separates Verzeichnis hoch. Binden Sie sie dann über die `functions.php` Ihres Themes ein (z.B. mit `wp_enqueue_script`).
    *   **Option C (Plugin):** Nutzen Sie ein Plugin wie "Code Snippets" oder "Insert Headers and Footers", um den JavaScript-Code in den Header Ihrer Webseite einzufügen.

## 4. Konfiguration

Alle wichtigen Einstellungen können direkt im `config`-Objekt am Anfang der `cookie-consent.js` vorgenommen werden:

```javascript
var googleAnalyticsID = 'G-XXXXXXXXXX'; // Ihre Google Analytics ID (z.B. 'G-ABCDEF123')
var facebookPixelID   = '1234567890';   // Ihre Facebook Pixel ID
var linkImpressum = '/impressum';     // Pfad zu Ihrem Impressum
var linkDatenschutz = '/datenschutz'; // Pfad zu Ihrer Datenschutzerklärung
```
*   Ersetzen Sie die Platzhalter für Google Analytics und Facebook Pixel mit Ihren tatsächlichen IDs.
*   Passen Sie die Links zu Impressum und Datenschutzerklärung an.

## 5. DSGVO-Konformität

Die Basis-Version des Cookie Consent Managers unterstützt Sie bei der Einhaltung der DSGVO durch:

*   **Einwilligung vor Datenverarbeitung:** Tracking-Skripte werden erst nach aktiver Einwilligung geladen.
*   **Granulare Auswahl:** Nutzer können detailliert entscheiden, welche Cookie-Kategorien sie zulassen.
*   **Widerrufsmöglichkeit:** Nutzer können ihre Einwilligung jederzeit über den Floating Button ändern.
*   **Transparenz:** Die Verlinkung zur Datenschutzerklärung und die detaillierte Beschreibung der Cookies im Banner sorgen für Transparenz.

**Wichtig:** Beachten Sie, dass diese Basis-Version **keine serverseitige Protokollierung der Einwilligungen** beinhaltet. Für die Erfüllung der Nachweispflicht gemäß Art. 7 Abs. 1 DSGVO wird die Pro-Version (`cookie-consent-pro.js` mit `consent-log.php`) empfohlen. Stellen Sie sicher, dass Ihre **Datenschutzerklärung** alle verwendeten Cookies und Tracking-Dienste korrekt beschreibt.

## 6. Support & Kontakt

Bei Fragen oder Problemen wenden Sie sich bitte an [Ihre Support-E-Mail-Adresse oder Kontaktseite].

---

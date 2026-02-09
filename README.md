# Cookie Consent Manager (Pro-Version)

Diese Dokumentation beschreibt die Installation und Konfiguration des Cookie Consent Managers in der Pro-Version, die erweiterte Funktionen für die DSGVO-Konformität bietet, insbesondere die serverseitige Protokollierung von Einwilligungen.

## Inhaltsverzeichnis
1.  [Einleitung](#1-einleitung)
2.  [Funktionen](#2-funktionen)
3.  [Installation](#3-installation)
    *   [Schritt 1: JavaScript einbinden](#schritt-1-javascript-einbinden)
    *   [Schritt 2: PHP-Logging-Skript einrichten](#schritt-2-php-logging-skript-einrichten)
4.  [Konfiguration](#4-konfiguration)
5.  [DSGVO-Konformität](#5-dsgvo-konformität)
6.  [Integration mit WordPress und anderen Plattformen](#6-integration-mit-wordpress-und-anderen-plattformen)
7.  [Support & Kontakt](#7-support--kontakt)

---

## 1. Einleitung

Der Cookie Consent Manager ist eine schlanke und robuste Lösung zur Einholung und Verwaltung von Cookie-Einwilligungen auf Ihrer Webseite. Die Pro-Version erweitert die Basisfunktionalität um eine serverseitige Protokollierung der Nutzereinwilligungen, um die Nachweispflicht gemäß Art. 7 Abs. 1 DSGVO zu erfüllen. Zudem bietet sie eine verbesserte Integration für Google Tag Manager.

## 2. Funktionen

*   **DSGVO-konforme Einwilligung:** Einholung expliziter Einwilligungen für nicht-essenzielle Cookies.
*   **Granulare Kontrolle:** Nutzer können Marketing-, funktionale und sonstige Cookies separat aktivieren/deaktivieren.
*   **Serverseitige Einwilligungsprotokollierung:** Speicherung von Consent-ID, Zeitstempel, anonymisierter IP und gewählten Kategorien zur Erfüllung der Nachweispflicht.
*   **Google Tag Manager (GTM) Integration:** Automatische `dataLayer`-Events bei jeder Einwilligungsänderung.
*   **Einfache Integration:** Copy-Paste-Lösung für JavaScript und PHP-Skript.
*   **Anpassbares Design:** Über `style.css` vollständig anpassbar.
*   **Widerrufsmöglichkeit:** Floating Button zum erneuten Aufrufen der Einstellungen.

## 3. Installation

### Schritt 1: JavaScript einbinden

Kopieren Sie den gesamten Inhalt der Datei `cookie-consent-pro.js` und fügen Sie ihn in den `<head>`-Bereich Ihrer Webseite ein. Alternativ können Sie die Datei auch auf Ihren Webserver hochladen und wie folgt einbinden:

```html
<script src="/pfad/zu/cookie-consent-pro.js" defer></script>
```
*(Hinweis: Wenn Sie die Datei direkt in den HTML-Code kopieren, stellen Sie sicher, dass der gesamte Inhalt inklusive der `<script>`-Tags übernommen wird.)*

### Schritt 2: PHP-Logging-Skript einrichten

1.  Laden Sie die Datei `consent-log.php` in das Hauptverzeichnis (oder ein beliebiges Unterverzeichnis) Ihres Webservers hoch.
2.  Stellen Sie sicher, dass auf dem Server ein Unterordner namens `logs` im selben Verzeichnis wie `consent-log.php` existiert und **Schreibrechte (CHMOD 755 oder 777, je nach Serverkonfiguration)** besitzt. Hier werden die Einwilligungsprotokolle gespeichert.
3.  **Wichtig:** Passen Sie den `logEndpoint` in der `cookie-consent-pro.js` an, falls `consent-log.php` nicht im selben Verzeichnis wie Ihre HTML-Datei liegt oder Sie eine absolute URL benötigen (z.B. `https://ihredomain.de/consent-log.php`).

## 4. Konfiguration

Alle wichtigen Einstellungen können direkt im `config`-Objekt am Anfang der `cookie-consent-pro.js` vorgenommen werden:

```javascript
var config = {
    googleAnalyticsID: 'G-XXXXXXXXXX', // Ihre Google Analytics ID (z.B. 'G-ABCDEF123')
    facebookPixelID: '1234567890',   // Ihre Facebook Pixel ID
    linkImpressum: '/impressum',     // Pfad zu Ihrem Impressum
    linkDatenschutz: '/datenschutz', // Pfad zu Ihrer Datenschutzerklärung
    logEndpoint: 'consent-log.php'   // Pfad zum Logging-Skript (anpassen!)
};
```
*   Ersetzen Sie die Platzhalter für Google Analytics und Facebook Pixel mit Ihren tatsächlichen IDs.
*   Passen Sie die Links zu Impressum und Datenschutzerklärung an.
*   Überprüfen und korrigieren Sie den `logEndpoint` bei Bedarf.

## 5. DSGVO-Konformität

Die Pro-Version des Cookie Consent Managers unterstützt Sie maßgeblich bei der Einhaltung der DSGVO durch:

*   **Einwilligung vor Datenverarbeitung:** Tracking-Skripte werden erst nach aktiver Einwilligung geladen.
*   **Granulare Auswahl:** Nutzer können detailliert entscheiden, welche Cookie-Kategorien sie zulassen.
*   **Widerrufsmöglichkeit:** Nutzer können ihre Einwilligung jederzeit über den Floating Button ändern.
*   **Nachweispflicht:** Die serverseitige Protokollierung der Einwilligungen erfüllt die Anforderung aus Art. 7 Abs. 1 DSGVO.
*   **Transparenz:** Die Verlinkung zur Datenschutzerklärung und die detaillierte Beschreibung der Cookies im Banner sorgen für Transparenz.

**Wichtig:** Stellen Sie sicher, dass Ihre **Datenschutzerklärung** die serverseitige Einwilligungsprotokollierung sowie alle verwendeten Cookies und Tracking-Dienste korrekt beschreibt. Eine entsprechende Ergänzung wurde in der Datei `Datenschutzerklärung.md` vorgenommen.

## 6. Integration mit WordPress und anderen Plattformen

### 6.1 WordPress Installation

Für die Installation in einer WordPress-Umgebung gehen Sie wie folgt vor:

1.  **JavaScript (`cookie-consent-pro.js`) einbinden:**
    *   **Option A (Empfohlen für einfache Integration):** Kopieren Sie den gesamten Inhalt der Datei `cookie-consent-pro.js` (inklusive der `<script>`-Tags) und fügen Sie ihn im WordPress-Backend unter **"Design" -> "Theme-Editor"** (oder einem ähnlichen Bereich, je nach Theme) in die Datei `header.php` direkt vor dem schließenden `</head>`-Tag ein.
    *   **Option B (Für fortgeschrittene Nutzer/Themes):** Laden Sie die Datei `cookie-consent-pro.js` per FTP in das Verzeichnis Ihres Child-Themes oder in ein separates Verzeichnis hoch. Binden Sie sie dann über die `functions.php` Ihres Themes ein (z.B. mit `wp_enqueue_script`).
    *   **Option C (Plugin):** Nutzen Sie ein Plugin wie "Code Snippets" oder "Insert Headers and Footers", um den JavaScript-Code in den Header Ihrer Webseite einzufügen.

2.  **PHP-Logging-Skript (`consent-log.php`) einrichten:**
    *   Laden Sie die Datei `consent-log.php` per FTP in das **Hauptverzeichnis Ihrer WordPress-Installation** hoch (dort, wo auch `wp-config.php` liegt).
    *   Stellen Sie sicher, dass auf dem Server ein Unterordner namens `logs` im selben Verzeichnis wie `consent-log.php` existiert und **Schreibrechte (CHMOD 755 oder 777, je nach Serverkonfiguration)** besitzt. Hier werden die Einwilligungsprotokolle gespeichert.
    *   **Wichtig:** Überprüfen Sie den `logEndpoint` in Ihrer `cookie-consent-pro.js`. Wenn `consent-log.php` im Hauptverzeichnis liegt, sollte der `logEndpoint` in der Regel `consent-log.php` sein. Falls WordPress in einem Unterverzeichnis installiert ist oder Sie das Skript in einem anderen Pfad ablegen, passen Sie den `logEndpoint` entsprechend an (z.B. `/wp-content/uploads/consent-log.php` wenn Sie es dort abgelegt haben).

### 6.2 Andere Plattformen ohne PHP-Unterstützung

*   Das `consent-log.php`-Skript kann auf diesen Plattformen nicht direkt ausgeführt werden. Sie können es jedoch auf einem **separaten Webspace** mit PHP-Unterstützung hosten und den `logEndpoint` im JavaScript auf die externe URL dieses Skripts setzen. Beachten Sie hierbei mögliche CORS-Einstellungen auf dem Server, der das PHP-Skript hostet.

## 7. Support & Kontakt

Bei Fragen oder Problemen wenden Sie sich bitte an [Ihre Support-E-Mail-Adresse oder Kontaktseite].

---

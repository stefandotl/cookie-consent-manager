<script>
document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. KONFIGURATION
    // ==========================================
    var config = {
        googleAnalyticsID: 'G-XXXXXXXXXX',
        facebookPixelID: '1234567890',
        linkImpressum: '/impressum',
        linkDatenschutz: '/datenschutz',
        logEndpoint: 'consent-log.php' // Pfad zum Logging-Skript (muss ggf. angepasst werden!)
    };

    // ==========================================
    // 2. HELPER & TRACKING
    // ==========================================
    
    // UUID Generator für Consent-ID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Consent ID abrufen oder erstellen
    function getConsentID() {
        var id = localStorage.getItem('consentID');
        if (!id) {
            id = generateUUID();
            localStorage.setItem('consentID', id);
        }
        return id;
    }

    // Consent Loggen (Server-Side)
    function logConsent(type, categories) {
        var payload = {
            consent_id: getConsentID(),
            consent_type: type,
            categories: categories
        };

        // Sende Daten an Backend (Fire & Forget)
        // HINWEIS: Wenn die PHP-Datei auf einem anderen Server liegt, muss CORS dort aktiviert sein!
        if (navigator.sendBeacon) {
            var blob = new Blob([JSON.stringify(payload)], {type: 'application/json'});
            navigator.sendBeacon(config.logEndpoint, blob);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', config.logEndpoint, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(payload));
        }
    }

    // GTM DataLayer Push
    function pushToDataLayer(event, categories) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': event,
            'consent_categories': categories
        });
    }

    function loadTrackingScripts() {
        // Google Analytics
        if(config.googleAnalyticsID) {
            var gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + config.googleAnalyticsID;
            document.head.appendChild(gaScript);
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', config.googleAnalyticsID);
        }

        // Facebook Pixel
        if(config.facebookPixelID) {
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', config.facebookPixelID);
            fbq('track', 'PageView');
        }
    }

    // ==========================================
    // 3. STATUS PRÜFEN & FLOATING BUTTON
    // ==========================================
    
    // Create floating cookie button (always available)
    var floatingButton = document.createElement('button');
    floatingButton.id = 'cc-floating-btn';
    floatingButton.title = 'Cookie-Einstellungen ändern';
    floatingButton.setAttribute('aria-label', 'Cookie-Einstellungen ändern');
    document.body.appendChild(floatingButton);

    var consent = localStorage.getItem('cookieConsent');
    if (consent === 'all' || consent === 'marketing') {
        loadTrackingScripts();
        // Banner should still be created for the floating button functionality
    } else if (consent === 'essential' || consent === 'essential_other' || consent === 'essential_functional' || consent === 'essential_other_functional') {
        // Banner should still be created for the floating button functionality
    }
    // Always create banner for floating button functionality - don't return early!

    // ==========================================
    // 4. HTML STRUKTUR ERSTELLEN
    // ==========================================
    var overlay = document.createElement('div');
    overlay.id = 'cc-overlay';
    
    overlay.innerHTML = `
        <div id="cc-box">
            
            <!-- VIEW 1: STARTSEITE -->
            <div id="view-banner" style="display:flex; flex-direction:column; height:100%;">
                <div class="cc-header">
                    <h2>Privatsphäre</h2>
                    <p>Auf dieser Internetseite verwenden wir Cookies. Einige dieser Cookies sind technisch notwendig, um die grundlegende Funktionalität der Webseite sicherzustellen (funktionale Cookies). Andere Cookies dienen der Analyse des Nutzerverhaltens (Performance-Cookies) oder der Durchführung von Marketingmaßnahmen (Marketing-Cookies) und sind für den Betrieb der Seite nicht zwingend erforderlich.</p>
                    <p>Sie haben jederzeit die Möglichkeit, diesen Cookie-Banner erneut aufzurufen, Ihre Einwilligungserklärungen anzupassen und diese mit Wirkung für die Zukunft zu widerrufen.</p>
                    <p>Um die Nutzung dieser Cookies zu ermöglichen, bitten wir Sie, Ihre Einwilligung durch drücken des "Alle akzeptieren"-Knopfes zu erteilen.</p>
                </div>
                <div class="cc-scroll-area">
                    <button id="btn-accept-all" class="cc-btn cc-btn-primary">Alle akzeptieren</button>
                    <button id="btn-reject-all" class="cc-btn cc-btn-primary">Nur Essenzielle</button>
                    <button id="btn-open-settings" class="cc-btn cc-btn-secondary">Einstellungen anpassen</button>
                    
                    <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 0px;">
                        <a href="${config.linkDatenschutz}" target="_blank">Datenschutz</a> • 
                        <a href="${config.linkImpressum}" target="_blank">Impressum</a>
                    </div>
                </div>
            </div>

            <!-- VIEW 2: EINSTELLUNGEN -->
            <div id="view-settings" class="cc-hidden" style="display:flex; flex-direction:column; height:100%;">
                <div class="cc-header">
                    <h2>Einstellungen anpassen</h2>
                    <p>Entscheide selbst, welche Cookies wir nutzen dürfen.</p>
                </div>
                
                <div class="cc-scroll-area" style="flex-grow: 1;">
                    
                    <!-- Karte: Notwendig -->
                    <div class="cc-card">
                        <div class="cc-card-text">
                            <span class="cc-card-title">Notwendig</span>
                            <span class="cc-card-desc">Notwendig für die technische Funktion der Webseite (z.B. Login, Warenkorb, Kursverwaltung).</span>
                            <button class="cc-details-toggle" onclick="toggleDetails('necessary-details')">Details anzeigen</button>
                            <div id="necessary-details" class="cc-details-content cc-hidden">
                                <div class="cc-cookie-info">
                                    <div class="cc-cookie-item">
                                        <strong>Session-Cookies (PHPSESSID, _session)</strong>
                                        <p><strong>Zweck:</strong> Aufrechterhaltung der Benutzersitzung und Warenkorbfunktion</p>
                                        <p><strong>Daten:</strong> Session-ID, Warenkorbinhalte, Login-Status</p>
                                        <p><strong>Speicherdauer:</strong> Bis zum Schließen des Browsers</p>
                                    </div>
                                    <div class="cc-cookie-item">
                                        <strong>Sicherheits-Cookies (_csrf, _security)</strong>
                                        <p><strong>Zweck:</strong> Schutz vor CSRF-Angriffen und sichere Übertragung</p>
                                        <p><strong>Daten:</strong> Sicherheits-Token, Verschlüsselungsinformationen</p>
                                        <p><strong>Speicherdauer:</strong> 1-24 Stunden</p>
                                    </div>
                                    <div class="cc-cookie-item">
                                        <strong>Ezycourse-Basis + Fortschritts-Tracking (_ezycourse_session, _ezycourse_user)</strong>
                                        <p><strong>Zweck:</strong> Kursverwaltung, Benutzer-Sessions, Lernfortschritt, Zahlungsabwicklung</p>
                                        <p><strong>Daten:</strong> Benutzer-ID, Kursfortschritt, Zahlungsstatus, Lernaktivitäten</p>
                                        <p><strong>Speicherdauer:</strong> 1 Jahr - bis zur Löschung des Accounts</p>
                                        <p><strong>Datenschutz:</strong> <a href="${config.linkDatenschutz}" target="_blank">Plattform-Datenschutz</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label class="cc-custom-toggle">
                            <input type="checkbox" checked disabled>
                            <span class="cc-custom-slider"></span>
                        </label>
                    </div>

                    <!-- Karte: Marketing -->
                    <div class="cc-card">
                        <div class="cc-card-text">
                            <span class="cc-card-title">Marketing & Analyse</span>
                            <span class="cc-card-desc">Hilft uns zu verstehen, wie Nutzer unsere Webseite verwenden und Werbung zu messen (Google, Facebook).</span>
                            <button class="cc-details-toggle" onclick="toggleDetails('marketing-details')">Details anzeigen</button>
                            <div id="marketing-details" class="cc-details-content cc-hidden">
                                <div class="cc-cookie-info">
                                    <div class="cc-cookie-item">
                                        <strong>Google Analytics (_ga, _ga_*, _gid)</strong>
                                        <p><strong>Zweck:</strong> Analyse des Nutzerverhaltens auf der Website</p>
                                        <p><strong>Daten:</strong> Seitenaufrufe, Verweildauer, Klickverhalten, ungefähre Standortinformationen</p>
                                        <p><strong>Speicherdauer:</strong> _ga: 2 Jahre, _gid: 24 Stunden</p>
                                        <p><strong>Datenschutz:</strong> <a href="https://policies.google.com/privacy" target="_blank">Google Datenschutzerklärung</a></p>
                                    </div>
                                    <div class="cc-cookie-item">
                                        <strong>Facebook Pixel (_fbp, _fbc)</strong>
                                        <p><strong>Zweck:</strong> Tracking für Werbemaßnahmen und Remarketing</p>
                                        <p><strong>Daten:</strong> Seitenbesuche, Klickverhalten, Geräteinformationen</p>
                                        <p><strong>Speicherdauer:</strong> _fbp: 90 Tage, _fbc: 90 Tage</p>
                                        <p><strong>Datenschutz:</strong> <a href="https://www.facebook.com/policy.php" target="_blank">Facebook Datenschutzerklärung</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label class="cc-custom-toggle">
                            <input type="checkbox" id="chk-marketing-settings">
                            <span class="cc-custom-slider"></span>
                        </label>
                    </div>

                    <!-- Karte: Funktional -->
                    <div class="cc-card">
                        <div class="cc-card-text">
                            <span class="cc-card-title">Funktional</span>
                            <span class="cc-card-desc">Cookies für erweiterte Funktionen und Services (derzeit keine aktiv).</span>
                            <button class="cc-details-toggle" onclick="toggleDetails('functional-details')">Details anzeigen</button>
                            <div id="functional-details" class="cc-details-content cc-hidden">
                                <div class="cc-cookie-info">
                                    <div class="cc-cookie-item">
                                        <p><em>Derzeit sind keine weiteren Cookies aktiv. Diese Kategorie für zukünftige Erweiterungen.</em></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label class="cc-custom-toggle">
                            <input type="checkbox" id="chk-functional-settings">
                            <span class="cc-custom-slider"></span>
                        </label>
                    </div>

                    <!-- Karte: Sonstige -->
                    <div class="cc-card">
                        <div class="cc-card-text">
                            <span class="cc-card-title">Sonstige</span>
                            <span class="cc-card-desc">Zusätzliche Cookies für erweiterte Funktionen und Services (derzeit keine aktiv).</span>
                            <button class="cc-details-toggle" onclick="toggleDetails('other-details')">Details anzeigen</button>
                            <div id="other-details" class="cc-details-content cc-hidden">
                                <div class="cc-cookie-info">
                                    <div class="cc-cookie-item">
                                        <p><em>Derzeit sind keine weiteren Cookies aktiv. Diese Kategorie für zukünftige Erweiterungen.</em></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label class="cc-custom-toggle">
                            <input type="checkbox" id="chk-other-settings">
                            <span class="cc-custom-slider"></span>
                        </label>
                    </div>

                    <button id="btn-save-settings" class="cc-btn cc-btn-primary" style="margin-top: 5px;">Auswahl speichern</button>
                    <button id="btn-back" class="cc-btn cc-btn-secondary">Zurück</button>
                    
                    <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 0px;">
                        <a href="${config.linkDatenschutz}" target="_blank">Datenschutz</a> • 
                        <a href="${config.linkImpressum}" target="_blank">Impressum</a>
                    </div>

                </div>
            </div>

        </div>
    `;
    document.body.appendChild(overlay);

    // ==========================================
    // 5. INITIALISIERUNG
    // ==========================================
    
    // Hide banner if consent already exists (only show when floating button is clicked)
    if (consent && consent !== 'null') {
        overlay.style.setProperty('display', 'none', 'important');
    }

    // ==========================================
    // 6. LOGIK
    // ==========================================

    var viewBanner = document.getElementById('view-banner');
    var viewSettings = document.getElementById('view-settings');

    // Add click event to floating button (must be after overlay creation)
    floatingButton.addEventListener('click', function() {
        // Show the overlay (remove display: none)
        overlay.style.removeProperty('display');
        
        // Set to banner view by default
        viewBanner.classList.remove('cc-hidden');
        viewSettings.classList.add('cc-hidden');
        
        // Update checkbox states based on current consent
        var consent = localStorage.getItem('cookieConsent');
        var marketingCheckbox = document.getElementById('chk-marketing-settings');
        var otherCheckbox = document.getElementById('chk-other-settings');
        var functionalCheckbox = document.getElementById('chk-functional-settings');
        
        if (consent === 'all') {
            marketingCheckbox.checked = true;
            otherCheckbox.checked = true;
            functionalCheckbox.checked = true;
        } else if (consent === 'marketing') {
            marketingCheckbox.checked = true;
            otherCheckbox.checked = false;
            functionalCheckbox.checked = false;
        } else if (consent === 'essential_other_functional') {
            marketingCheckbox.checked = false;
            otherCheckbox.checked = true;
            functionalCheckbox.checked = true;
        } else if (consent === 'essential_other') {
            marketingCheckbox.checked = false;
            otherCheckbox.checked = true;
            functionalCheckbox.checked = false;
        } else if (consent === 'essential_functional') {
            marketingCheckbox.checked = false;
            otherCheckbox.checked = false;
            functionalCheckbox.checked = true;
        } else {
            marketingCheckbox.checked = false;
            otherCheckbox.checked = false;
            functionalCheckbox.checked = false;
        }
        
        // Scroll to top of overlay
        overlay.scrollTop = 0;
    });

    // Details Toggle Funktion
    window.toggleDetails = function(detailsId) {
        var details = document.getElementById(detailsId);
        var button = event.target;
        
        if (details.classList.contains('cc-hidden')) {
            details.classList.remove('cc-hidden');
            button.textContent = 'Details verbergen';
        } else {
            details.classList.add('cc-hidden');
            button.textContent = 'Details anzeigen';
        }
    };

    // Navigation
    document.getElementById('btn-open-settings').addEventListener('click', function() {
        // Checkbox-Zustände basierend auf gespeichertem Consent setzen
        var consent = localStorage.getItem('cookieConsent');
        var marketingCheckbox = document.getElementById('chk-marketing-settings');
        var otherCheckbox = document.getElementById('chk-other-settings');
        var functionalCheckbox = document.getElementById('chk-functional-settings');
        
        if (consent === 'all') {
            marketingCheckbox.checked = true;
            otherCheckbox.checked = true;
            functionalCheckbox.checked = true;
        } else if (consent === 'marketing') {
            marketingCheckbox.checked = true;
            otherCheckbox.checked = false;
            functionalCheckbox.checked = false;
        } else if (consent === 'essential_other_functional') {
            marketingCheckbox.checked = false;
            otherCheckbox.checked = true;
            functionalCheckbox.checked = true;
        } else {
            marketingCheckbox.checked = false;
            otherCheckbox.checked = false;
            functionalCheckbox.checked = false;
        }
        
        viewBanner.classList.add('cc-hidden');
        viewSettings.classList.remove('cc-hidden');
    });

    document.getElementById('btn-back').addEventListener('click', function() {
        viewSettings.classList.add('cc-hidden');
        viewBanner.classList.remove('cc-hidden');
    });

    // Aktionen
    document.getElementById('btn-accept-all').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'all');
        overlay.style.setProperty('display', 'none', 'important');
        
        var categories = ['essential', 'marketing', 'functional', 'other'];
        logConsent('all', categories);
        pushToDataLayer('cookie_consent_update', categories);
        
        loadTrackingScripts();
    });

    document.getElementById('btn-reject-all').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'essential');
        overlay.style.setProperty('display', 'none', 'important');
        
        var categories = ['essential'];
        logConsent('essential', categories);
        pushToDataLayer('cookie_consent_update', categories);
    });

    document.getElementById('btn-save-settings').addEventListener('click', function() {
        var marketingIsChecked = document.getElementById('chk-marketing-settings').checked;
        var otherIsChecked = document.getElementById('chk-other-settings').checked;
        var functionalIsChecked = document.getElementById('chk-functional-settings').checked;
        
        var categories = ['essential'];
        if (marketingIsChecked) categories.push('marketing');
        if (functionalIsChecked) categories.push('functional');
        if (otherIsChecked) categories.push('other');
        
        // Speichere vereinfachten String für lokale Logik (Legacy Support)
        if (marketingIsChecked && otherIsChecked && functionalIsChecked) {
            localStorage.setItem('cookieConsent', 'all');
            loadTrackingScripts();
        } else if (marketingIsChecked) {
            localStorage.setItem('cookieConsent', 'marketing');
            loadTrackingScripts();
        } else if (otherIsChecked && functionalIsChecked) {
            localStorage.setItem('cookieConsent', 'essential_other_functional');
        } else if (otherIsChecked) {
            localStorage.setItem('cookieConsent', 'essential_other');
        } else if (functionalIsChecked) {
            localStorage.setItem('cookieConsent', 'essential_functional');
        } else {
            localStorage.setItem('cookieConsent', 'essential');
        }
        
        logConsent('custom', categories);
        pushToDataLayer('cookie_consent_update', categories);
        
        overlay.style.setProperty('display', 'none', 'important');
    });
});
</script>

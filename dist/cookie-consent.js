/**
 * Cookie Consent Manager - Redistributable Version
 * 
 * Usage:
 * <script src="cookie-consent-library.js"></script>
 * <script>
 *   new CookieConsentManager({
 *     googleAnalyticsId: 'G-XXXXXXXXXX',
 *     facebookPixelId: 'XXXXXXXXXXXXXXX',
 *     privacyPolicyUrl: '/privacy',
 *     imprintUrl: '/imprint',
 *     language: 'de' // 'de' or 'en'
 *   });
 * </script>
 */

(function (window) {

    // ==========================================
    // UTILS
    // ==========================================
    function getLibraryPath() {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src && scripts[i].src.includes('cookie-consent.js')) {
                return scripts[i].src.substring(0, scripts[i].src.lastIndexOf('/') + 1);
            }
        }
        return '';
    }

    // ==========================================
    // CLASS DEFINITION
    // ==========================================
    class CookieConsentManager {
        constructor(config) {
            this.config = Object.assign({
                googleAnalyticsId: null,
                facebookPixelId: null,
                privacyPolicyUrl: '/privacy-policy',
                imprintUrl: '/imprint',
                language: 'en'
            }, config);

            this.init();
        }

        init() {
            this.injectCSS();
            this.createFloatingButton();

            const consent = localStorage.getItem('cookieConsent');
            if (consent === 'all' || consent === 'marketing') {
                this.loadTrackingScripts();
            }

            // Always create the banner infrastructure
            this.createBanner();

            // Setup Event Listeners
            this.attachEventListeners();

            // Initial State check
            if (consent && consent !== 'null') {
                document.getElementById('cc-overlay').style.setProperty('display', 'none', 'important');
            } else {
                // Show banner if no consent yet
                document.getElementById('cc-overlay').style.removeProperty('display');
            }
        }

        injectCSS() {
            if (!document.getElementById('cc-styles')) {
                const link = document.createElement('link');
                link.id = 'cc-styles';
                link.rel = 'stylesheet';
                link.href = getLibraryPath() + 'cookie-consent.css';
                document.head.appendChild(link);
            }
        }

        loadTrackingScripts() {
            // Google Analytics
            if (this.config.googleAnalyticsId) {
                const gaScript = document.createElement('script');
                gaScript.async = true;
                gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.config.googleAnalyticsId;
                document.head.appendChild(gaScript);

                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', this.config.googleAnalyticsId);
                console.log('Cookie Consent: Google Analytics loaded.');
            }

            // Facebook Pixel
            if (this.config.facebookPixelId) {
                !function (f, b, e, v, n, t, s) {
                    if (f.fbq) return; n = f.fbq = function () {
                        n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                    n.queue = []; t = b.createElement(e); t.async = !0;
                    t.src = v; s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window, document, 'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', this.config.facebookPixelId);
                fbq('track', 'PageView');
                console.log('Cookie Consent: Facebook Pixel loaded.');
            }
        }

        createFloatingButton() {
            const btn = document.createElement('button');
            btn.id = 'cc-floating-btn';
            btn.title = 'Change Cookie Settings';
            btn.setAttribute('aria-label', 'Change Cookie Settings');
            document.body.appendChild(btn);

            btn.addEventListener('click', () => {
                const overlay = document.getElementById('cc-overlay');
                overlay.style.removeProperty('display');

                // Show banner view
                document.getElementById('view-banner').classList.remove('cc-hidden');
                document.getElementById('view-settings').classList.add('cc-hidden');

                this.updateCheckboxStates();
                overlay.scrollTop = 0;
            });
        }

        updateCheckboxStates() {
            const consent = localStorage.getItem('cookieConsent');
            const marketingCheckbox = document.getElementById('chk-marketing-settings');
            const otherCheckbox = document.getElementById('chk-other-settings');
            const functionalCheckbox = document.getElementById('chk-functional-settings');

            // Reset all first
            marketingCheckbox.checked = false;
            otherCheckbox.checked = false;
            functionalCheckbox.checked = false;

            if (consent === 'all') {
                marketingCheckbox.checked = true;
                otherCheckbox.checked = true;
                functionalCheckbox.checked = true;
            } else if (consent === 'marketing') {
                marketingCheckbox.checked = true;
            } else if (consent === 'essential_other_functional') {
                otherCheckbox.checked = true;
                functionalCheckbox.checked = true;
            } else if (consent === 'essential_other') {
                otherCheckbox.checked = true;
            } else if (consent === 'essential_functional') {
                functionalCheckbox.checked = true;
            }
        }

        createBanner() {
            const overlay = document.createElement('div');
            overlay.id = 'cc-overlay';

            // Texts based on language could be expanded here
            // For now hardcoded German as in original, but using variables for links

            overlay.innerHTML = `
            <div id="cc-box">
                <!-- VIEW 1: BANNER -->
                <div id="view-banner" style="display:flex; flex-direction:column; height:100%;">
                    <div class="cc-header">
                        <h2>Privatsphäre</h2>
                        <p>Wir verwenden Cookies, um die Nutzerfreundlichkeit zu verbessern und den Datenverkehr zu analysieren. Weitere Informationen finden Sie in unseren <a href="#" id="link-open-settings-inline">Einstellungen</a>.</p>
                    </div>
                    <div class="cc-scroll-area">
                        <div class="cc-btn-container">
                            <button id="btn-accept-all" class="cc-btn cc-btn-primary">Alle akzeptieren</button>
                            <button id="btn-reject-all" class="cc-btn cc-btn-primary">Nur Essenzielle</button>
                            <button id="btn-open-settings" class="cc-btn cc-btn-secondary">Einstellungen anpassen</button>
                        </div>
                        <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 0px;">
                            <a href="${this.config.privacyPolicyUrl}" target="_blank">Datenschutz</a> •
                            <a href="${this.config.imprintUrl}" target="_blank">Impressum</a>
                        </div>
                    </div>
                </div>

                <!-- VIEW 2: SETTINGS -->
                <div id="view-settings" class="cc-hidden" style="display:flex; flex-direction:column; height:100%;">
                    <div class="cc-header">
                        <h2>Einstellungen anpassen</h2>
                        <p>Entscheide selbst, welche Cookies wir nutzen dürfen.</p>
                    </div>

                    <div class="cc-scroll-area" style="flex-grow: 1;">
                        
                        <!-- Necessary -->
                        <div class="cc-card">
                            <div class="cc-card-text">
                                <span class="cc-card-title">Notwendig</span>
                                <span class="cc-card-desc">Notwendig für die technische Funktion der Webseite.</span>
                                <button class="cc-details-toggle" data-target="necessary-details">Details anzeigen</button>
                                <div id="necessary-details" class="cc-details-content cc-hidden">
                                     <div class="cc-cookie-info">
                                        <div class="cc-cookie-item">
                                            <strong>Session & Sicherheit</strong>
                                            <p>Speicherdauer: Session / kurzzeitig</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label class="cc-custom-toggle">
                                <input type="checkbox" checked disabled>
                                <span class="cc-custom-slider"></span>
                            </label>
                        </div>

                        <!-- Marketing -->
                        <div class="cc-card">
                            <div class="cc-card-text">
                                <span class="cc-card-title">Marketing & Analyse</span>
                                <span class="cc-card-desc">Hilft uns zu verstehen, wie Nutzer unsere Webseite verwenden (Google, Facebook).</span>
                                <button class="cc-details-toggle" data-target="marketing-details">Details anzeigen</button>
                                <div id="marketing-details" class="cc-details-content cc-hidden">
                                    <div class="cc-cookie-info">
                                        <div class="cc-cookie-item">
                                            <strong>Google Analytics & Facebook Pixel</strong>
                                            <p>Zweck: Analyse & Werbung</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label class="cc-custom-toggle">
                                <input type="checkbox" id="chk-marketing-settings">
                                <span class="cc-custom-slider"></span>
                            </label>
                        </div>

                        <!-- Functional -->
                         <div class="cc-card">
                            <div class="cc-card-text">
                                <span class="cc-card-title">Funktional</span>
                                <span class="cc-card-desc">Cookies für erweiterte Funktionen.</span>
                            </div>
                            <label class="cc-custom-toggle">
                                <input type="checkbox" id="chk-functional-settings">
                                <span class="cc-custom-slider"></span>
                            </label>
                        </div>

                        <!-- Other -->
                        <div class="cc-card">
                            <div class="cc-card-text">
                                <span class="cc-card-title">Sonstige</span>
                                <span class="cc-card-desc">Zusätzliche Cookies.</span>
                            </div>
                            <label class="cc-custom-toggle">
                                <input type="checkbox" id="chk-other-settings">
                                <span class="cc-custom-slider"></span>
                            </label>
                        </div>

                        <button id="btn-save-settings" class="cc-btn cc-btn-primary" style="margin-top: 5px;">Auswahl speichern</button>
                        <button id="btn-back" class="cc-btn cc-btn-secondary">Zurück</button>

                         <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 0px;">
                            <a href="${this.config.privacyPolicyUrl}" target="_blank">Datenschutz</a> •
                            <a href="${this.config.imprintUrl}" target="_blank">Impressum</a>
                        </div>
                    </div>
                </div>
            </div>
            `;

            document.body.appendChild(overlay);
        }

        attachEventListeners() {
            // Helper for toggle details
            document.querySelectorAll('.cc-details-toggle').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const targetId = e.target.getAttribute('data-target');
                    const details = document.getElementById(targetId);
                    if (details.classList.contains('cc-hidden')) {
                        details.classList.remove('cc-hidden');
                        e.target.textContent = 'Details verbergen';
                    } else {
                        details.classList.add('cc-hidden');
                        e.target.textContent = 'Details anzeigen';
                    }
                });
            });

            // Inline link to settings
            const linkInline = document.getElementById('link-open-settings-inline');
            if (linkInline) {
                linkInline.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('btn-open-settings').click();
                });
            }

            // Open Settings
            document.getElementById('btn-open-settings').addEventListener('click', () => {
                this.updateCheckboxStates();
                document.getElementById('view-banner').classList.add('cc-hidden');
                document.getElementById('view-settings').classList.remove('cc-hidden');
            });

            // Back button
            document.getElementById('btn-back').addEventListener('click', () => {
                document.getElementById('view-settings').classList.add('cc-hidden');
                document.getElementById('view-banner').classList.remove('cc-hidden');
            });

            // Accept All
            document.getElementById('btn-accept-all').addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'all');
                document.getElementById('cc-overlay').style.setProperty('display', 'none', 'important');
                this.loadTrackingScripts();
            });

            // Reject All
            document.getElementById('btn-reject-all').addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'essential');
                document.getElementById('cc-overlay').style.setProperty('display', 'none', 'important');
            });

            // Save Settings
            document.getElementById('btn-save-settings').addEventListener('click', () => {
                const marketing = document.getElementById('chk-marketing-settings').checked;
                const other = document.getElementById('chk-other-settings').checked;
                const functional = document.getElementById('chk-functional-settings').checked;

                if (marketing && other && functional) {
                    localStorage.setItem('cookieConsent', 'all');
                    this.loadTrackingScripts();
                } else if (marketing) {
                    localStorage.setItem('cookieConsent', 'marketing');
                    this.loadTrackingScripts();
                } else if (other && functional) {
                    localStorage.setItem('cookieConsent', 'essential_other_functional');
                } else if (other) {
                    localStorage.setItem('cookieConsent', 'essential_other');
                } else if (functional) {
                    localStorage.setItem('cookieConsent', 'essential_functional');
                } else {
                    localStorage.setItem('cookieConsent', 'essential');
                }

                document.getElementById('cc-overlay').style.setProperty('display', 'none', 'important');
            });
        }
    }

    // Expose to window
    window.CookieConsentManager = CookieConsentManager;

})(window);

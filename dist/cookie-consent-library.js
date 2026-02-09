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
    // CSS STYLES (Minified for embedding)
    // ==========================================
    const cssStyles = `
/* ==========================================
   COOKIE CONSENT CSS (SIMPLE & ROBUST)
   ========================================== */
#cc-overlay,#cc-overlay *{box-sizing:border-box!important}#cc-overlay{position:fixed!important;bottom:20px!important;left:20px!important;top:auto!important;right:auto!important;width:auto!important;height:auto!important;background:0 0!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;z-index:2147483647!important;display:flex!important;justify-content:flex-start!important;align-items:flex-end!important;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif!important;pointer-events:none!important}#cc-box{position:relative!important;background:#fff!important;width:400px!important;max-width:90vw!important;border-radius:12px!important;box-shadow:0 10px 40px rgba(0,0,0,.15)!important;border:1px solid #e5e7eb!important;display:flex!important;flex-direction:column!important;max-height:80vh!important;overflow:hidden!important;color:#333!important;pointer-events:auto!important;animation:cc-slide-up .5s ease-out!important}@keyframes cc-slide-up{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}#cc-overlay .cc-header{padding:20px 20px 10px 20px!important;text-align:left!important;flex-shrink:0!important;background:0 0!important}#cc-overlay .cc-header h2{font-family:inherit!important;font-size:20px!important;margin:0 0 8px 0!important;color:#111827!important;font-weight:700!important;line-height:1.3!important}#cc-overlay .cc-header p{font-size:14px!important;color:#4b5563!important;line-height:1.5!important;margin:0!important}#cc-overlay .cc-scroll-area{padding:10px 20px 15px 20px!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;max-height:40vh!important;min-height:auto!important}.cc-btn-container{display:flex!important;gap:10px!important;flex-wrap:wrap!important;margin-bottom:0!important}#cc-overlay .cc-btn{flex:1!important;padding:10px 16px!important;margin-bottom:8px!important;border-radius:6px!important;border:none!important;cursor:pointer!important;font-weight:500!important;font-size:14px!important;transition:all .2s!important;display:inline-block!important;text-align:center!important;position:relative!important;box-shadow:none!important;text-decoration:none!important;font-family:inherit!important;white-space:nowrap!important}#cc-overlay .cc-btn:active{transform:scale(.98)!important}#cc-overlay .cc-btn-primary{background-color:#7b68ee!important;color:#fff!important;box-shadow:0 4px 12px rgba(123,104,238,.25)!important}#cc-overlay .cc-btn-primary:hover{background-color:#6a5acd!important}#cc-overlay .cc-btn-secondary{background-color:#fff!important;color:#333!important;border:1px solid #ddd!important}#cc-overlay .cc-btn-secondary:hover{background-color:#f9f9f9!important;border-color:#bbb!important}#cc-overlay #btn-open-settings{background-color:#f5f5f5!important;color:#666!important;border:1px solid #d1d5db!important}#cc-overlay #btn-open-settings:hover{background-color:#e5e5e5!important;border-color:#9ca3af!important;color:#4a5568!important}#cc-overlay .cc-link-btn{background:0 0!important;border:none!important;color:#7b68ee!important;font-weight:600!important;cursor:pointer!important;font-size:14px!important;margin-top:5px!important;text-decoration:underline!important;padding:5px!important;display:inline-block!important;font-family:inherit!important}#cc-overlay .cc-card{border:1px solid #e5e7eb!important;border-radius:12px!important;padding:20px!important;margin-bottom:16px!important;display:flex!important;justify-content:space-between!important;align-items:center!important;background:#fff!important}#cc-overlay .cc-card-text{padding-right:15px!important;text-align:left!important;flex:1!important}#cc-overlay .cc-card-title{font-weight:700!important;font-size:16px!important;color:#0a0a2a!important;display:block!important;margin-bottom:6px!important}#cc-overlay .cc-card-desc{font-size:13px!important;color:#6b7280!important;line-height:1.4!important}#cc-overlay .cc-details-toggle{background:0 0!important;border:none!important;color:#7b68ee!important;font-weight:600!important;cursor:pointer!important;font-size:13px!important;margin-top:8px!important;padding:4px 0!important;text-decoration:underline!important;font-family:inherit!important;transition:color .2s!important}#cc-overlay .cc-details-toggle:hover{color:#6a5acd!important}#cc-overlay .cc-details-content{margin-top:12px!important;padding-top:12px!important;border-top:1px solid #e5e7eb!important}#cc-overlay .cc-cookie-info{margin-top:8px!important}#cc-overlay .cc-cookie-item{margin-bottom:16px!important;padding:12px!important;background:#f9fafb!important;border-radius:8px!important;border:1px solid #f3f4f6!important}#cc-overlay .cc-cookie-item:last-child{margin-bottom:0!important}#cc-overlay .cc-cookie-item strong{color:#374151!important;font-size:14px!important;font-weight:700!important;display:block!important;margin-bottom:6px!important}#cc-overlay .cc-cookie-item p{font-size:12px!important;color:#6b7280!important;line-height:1.4!important;margin:0 0 4px 0!important}#cc-overlay .cc-cookie-item p:last-child{margin-bottom:0!important}#cc-overlay .cc-cookie-item a{color:#7b68ee!important;text-decoration:none!important;font-weight:600!important}#cc-overlay .cc-cookie-item a:hover{text-decoration:underline!important;color:#6a5acd!important}#cc-overlay .cc-custom-toggle{position:relative!important;display:inline-block!important;width:52px!important;height:30px!important;flex-shrink:0!important;margin:0!important;padding:0!important;cursor:pointer!important;border:none!important;background:0 0!important}#cc-overlay .cc-custom-toggle input{opacity:0!important;width:100%!important;height:100%!important;position:absolute!important;top:0!important;left:0!important;margin:0!important;cursor:pointer!important;z-index:2!important}#cc-overlay .cc-custom-slider{position:absolute!important;cursor:pointer!important;top:0!important;left:0!important;right:0!important;bottom:0!important;background-color:#cbd5e1!important;transition:.3s!important;border-radius:34px!important;border:2px solid transparent!important;display:block!important}#cc-overlay .cc-custom-slider:before{position:absolute!important;content:""!important;height:22px!important;width:22px!important;left:2px!important;bottom:2px!important;background-color:#fff!important;transition:.3s!important;border-radius:50%!important;box-shadow:0 2px 4px rgba(0,0,0,.2)!important;display:block!important}#cc-overlay .cc-custom-toggle input:checked+.cc-custom-slider{background-color:#7b68ee!important;border-color:#7b68ee!important}#cc-overlay .cc-custom-toggle input:checked+.cc-custom-slider:before{transform:translateX(22px)!important}#cc-overlay .cc-custom-toggle input:disabled+.cc-custom-slider{cursor:not-allowed!important}#cc-overlay .cc-custom-toggle input:checked:disabled+.cc-custom-slider{background-color:#7b68ee!important;opacity:.6!important}#cc-overlay .cc-footer{text-align:center!important;font-size:12px!important;color:#9ca3af!important;padding-bottom:20px!important;flex-shrink:0!important}#cc-overlay .cc-footer a,#cc-overlay .cc-scroll-area a{color:#9ca3af!important;text-decoration:none!important;margin:0 6px!important}#cc-overlay .cc-footer a:hover,#cc-overlay .cc-scroll-area a:hover{color:#7b68ee!important;text-decoration:underline!important}#cc-overlay .cc-scroll-area>div[style*="text-align: center"]{margin-top:0!important;margin-bottom:0!important;padding-bottom:0!important}#cc-floating-btn{position:fixed!important;bottom:20px!important;left:20px!important;width:50px!important;height:50px!important;background-color:#7b68ee!important;border-radius:50%!important;box-shadow:0 4px 12px rgba(123,104,238,.3)!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;z-index:2147483646!important;transition:all .3s ease!important;border:none!important;color:#fff!important;font-size:20px!important}#cc-floating-btn:hover{background-color:#6a5acd!important;transform:scale(1.05)!important;box-shadow:0 6px 16px rgba(123,104,238,.4)!important}#cc-floating-btn:active{transform:scale(.95)!important}#cc-floating-btn::before{content:"🍪"!important;font-size:18px!important}#cc-overlay:not([style*="display: none"])~#cc-floating-btn{display:none!important}@media (max-width:768px){#cc-overlay{bottom:0!important;left:0!important;right:0!important;width:100%!important;align-items:flex-end!important;padding:0!important}#cc-box{width:100%!important;max-width:100%!important;border-radius:12px 12px 0 0!important;border-bottom:none!important;max-height:85vh!important;animation:cc-slide-up-mobile .4s ease-out!important;padding-bottom:10px!important}#cc-overlay .cc-header{padding:12px 15px 4px 15px!important}#cc-overlay .cc-header h2{font-size:15px!important;margin-bottom:2px!important}#cc-overlay .cc-header p{font-size:12px!important;line-height:1.35!important}#cc-overlay .cc-scroll-area{padding:8px 15px 8px 15px!important}.cc-btn-container{gap:6px!important}#cc-overlay .cc-btn{padding:8px 10px!important;font-size:12px!important;margin-bottom:0!important}@keyframes cc-slide-up-mobile{from{transform:translateY(100%)}to{transform:translateY(0)}}#cc-floating-btn{width:40px!important;height:40px!important;bottom:10px!important;left:10px!important}#cc-floating-btn::before{font-size:16px!important}}#cc-overlay .cc-hidden{display:none!important}
    `;

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
                const style = document.createElement('style');
                style.id = 'cc-styles';
                style.textContent = cssStyles;
                document.head.appendChild(style);
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

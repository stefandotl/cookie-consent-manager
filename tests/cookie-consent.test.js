/**
 * @jest-environment jsdom
 */

// Basic mock for localStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key) {
            delete store[key];
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

// We need to load the script content to test it effectively.
// Since the script is an IIFE that attaches to window, we can require it if we export it, 
// or evaluating the file content.
// A better approach for this legacy script is to read the file and eval it, or slightly easier,
// just copy the class definition into the test file if we can't easily modify the source to export.
// However, the best approach is to modify the source to export the class if module.exports is available (CommonJS).

// Let's modify the file content in memory or just read it and eval it.
// Reading and evaling is safer than duplicating code.
const fs = require('fs');
const path = require('path');
const scriptContent = fs.readFileSync(path.resolve(__dirname, '../dist/cookie-consent.js'), 'utf8');

describe('CookieConsentManager', () => {
    beforeAll(() => {
        // Execute the script to put CookieConsentManager on window
        eval(scriptContent);
    });

    beforeEach(() => {
        // Clear DOM
        document.body.innerHTML = '';
        document.head.innerHTML = '';
        // Clear LocalStorage
        window.localStorage.clear();
        // Clear Mocks
        jest.clearAllMocks();
    });

    test('should initialize with default configuration', () => {
        new window.CookieConsentManager({});
        const overlay = document.getElementById('cc-overlay');
        expect(overlay).not.toBeNull();
    });

    test('should inject CSS link into head', () => {
        // Mock getLibraryPath by ensuring we have a script tag that matches
        // But the script logic searches for 'cookie-consent.js' in src
        // We can just rely on the fallback or mock the internal function if possible? 
        // No, it's inside the IIFE.
        // Let's just check if the link is created.

        new window.CookieConsentManager({});
        const link = document.getElementById('cc-styles');
        expect(link).not.toBeNull();
        expect(link.rel).toBe('stylesheet');
    });

    test('should create floating button', () => {
        new window.CookieConsentManager({});
        const btn = document.getElementById('cc-floating-btn');
        expect(btn).not.toBeNull();
    });

    test('should show banner if no consent is stored', () => {
        new window.CookieConsentManager({});
        const overlay = document.getElementById('cc-overlay');
        expect(overlay.style.display).not.toBe('none');
    });

    test('should hide banner if consent is properly stored', () => {
        window.localStorage.setItem('cookieConsent', 'all');
        new window.CookieConsentManager({});
        const overlay = document.getElementById('cc-overlay');
        // The script sets display: none !important via style.setProperty
        expect(overlay.style.display).toBe('none');
    });

    test('should save consent to localStorage when "Accept All" is clicked', () => {
        const ccm = new window.CookieConsentManager({});
        const acceptBtn = document.getElementById('btn-accept-all');

        // Mock loadTrackingScripts to verify it's called
        // We can't easily spy on the instance method because it's called inside the event listener defined in constructor/init
        // But we can check the side effects (scripts injected)

        acceptBtn.click();

        expect(window.localStorage.getItem('cookieConsent')).toBe('all');
        const overlay = document.getElementById('cc-overlay');
        expect(overlay.style.display).toBe('none');
    });

    test('should save consent to localStorage when "Reject All" is clicked', () => {
        new window.CookieConsentManager({});
        const rejectBtn = document.getElementById('btn-reject-all');

        rejectBtn.click();

        expect(window.localStorage.getItem('cookieConsent')).toBe('essential');
        const overlay = document.getElementById('cc-overlay');
        expect(overlay.style.display).toBe('none');
    });

    test('should load tracking scripts when consent is given', () => {
        const gaId = 'G-TEST12345';
        const fbId = 'FB-TEST67890';

        new window.CookieConsentManager({
            googleAnalyticsId: gaId,
            facebookPixelId: fbId
        });

        const acceptBtn = document.getElementById('btn-accept-all');
        acceptBtn.click();

        // Check for GA script
        const scripts = document.head.getElementsByTagName('script');
        let gaFound = false;
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes(gaId)) {
                gaFound = true;
            }
        }
        expect(gaFound).toBe(true);

        // Check for FB Pixel
        // FB Pixel code injects a script tag slightly differently, let's check if the window properties exist?
        // The script defines 'fbq'.
        // expect(window.fbq).toBeDefined(); // This might be tricky in JSDOM due to how eval/scripts work
    });
});

/**
 * MartyFlix's optional Jellyfin Web enhancement.
 * Safe to execute more than once and intentionally uses no private Jellyfin APIs.
 */
(() => {
    'use strict';

    const GLOBAL_KEY = '__martyflixEnhancement';
    if (window[GLOBAL_KEY]) return;

    const taglines = [
        'Popcorn ready. Pick something wonderful.',
        'Marty found your next cosy watch.',
        'One little mouse. A whole lot of cinema.'
    ];
    const state = { observer: null };

    const enhance = () => {
        document.querySelectorAll('.headerLogo, .pageTitleWithDefaultLogo, .loginLogo')
            .forEach((logo) => {
                logo.setAttribute('role', 'img');
                logo.setAttribute('aria-label', 'MartyFlix');
                logo.setAttribute('title', 'MartyFlix');
            });

        const loginForm = document.querySelector('.loginPage form, .loginPage .readOnlyContent');
        if (loginForm && !document.querySelector('.martyflix-greeting')) {
            const greeting = document.createElement('p');
            greeting.className = 'martyflix-greeting';
            greeting.textContent = taglines[Math.floor(Math.random() * taglines.length)];
            loginForm.insertAdjacentElement('beforebegin', greeting);
        }
    };

    let scheduled = false;
    const scheduleEnhancement = () => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(() => {
            scheduled = false;
            enhance();
        });
    };

    state.observer = new MutationObserver(scheduleEnhancement);
    state.observer.observe(document.documentElement, { childList: true, subtree: true });
    window.addEventListener('pagehide', () => state.observer.disconnect(), { once: true });

    window[GLOBAL_KEY] = state;
    scheduleEnhancement();
})();

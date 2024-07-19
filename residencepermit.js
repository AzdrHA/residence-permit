// ==UserScript==
// @name          Titre de séjour
// @namespace     AzdrHA
// @author        Azdracito
// @description   Pas mal non ? C'est français
// @copyright     https://github.com/AzdrHA
// @license       GPL-3.0 License
// @version       1.0.0

// @homepageURL   https://github.com/AzdrHA/residence-permit
// @supportURL    https://github.com/AzdrHA/residence-permit/issues
// @downloadURL   https://raw.githubusercontent.com/AzdrHA/residence-permit/master/residencepermit.js
// @updateURL     https://raw.githubusercontent.com/AzdrHA/residence-permit/master/residencepermit.js

// @match         https://www.rdv-prefecture.interieur.gouv.fr/rdvpref/reservation/demarche/*
// @icon          https://www.google.com/s2/favicons?sz=64&domain=gouv.fr
// @grant         unsafeWindow
// @run-at        document-idle
// ==/UserScript==

function handleRoot() {
    console.log('Handling Root route');

    const actionButtons = document.querySelectorAll('a.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.bg-primary.text-white.q-btn--actionable.q-focusable.q-hoverable')
    if (actionButtons.length && actionButtons[0]) {
        actionButtons[0].click()
    }
}

function handleCgu() {
    console.log('Handling Cgu route');

    const captchaFormulaireExtInput = document.getElementById('captchaFormulaireExtInput')
    captchaFormulaireExtInput.scrollIntoView()

    if (captchaFormulaireExtInput) {
        setTimeout(() => {
            captchaFormulaireExtInput.focus()
        }, 700)
    }
}

function handleCreneau() {
    console.log('Handling Creneau route');

    setInterval(() => {
        const modal = document.querySelector('#q-portal--dialog--1')

        if (modal) {
            const actionButtons = document.querySelectorAll('button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--outline.q-btn--rectangle.text-primary.q-btn--actionable.q-focusable.q-hoverable')
            if (actionButtons.length) {
                actionButtons[actionButtons.length-1].click()
            }
            return
        }

        if (modal) return

        const firstElement = document.querySelector('ul>li.row.cellule.justify-center.radio-card')
        if (!firstElement) return;

        const inputElement = firstElement.querySelector('input');
        if (!inputElement) return;
        inputElement.click();

        const nextButton = document.querySelector('button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.bg-primary.text-white.q-btn--actionable.q-focusable.q-hoverable')
        if (!nextButton) return;

        setTimeout(() => {
            nextButton.click()
        }, 100)
    }, 200)
}

const routes = {
    'root': handleRoot,
    'cgu': handleCgu,
    'creneau': handleCreneau
};


(function() {
    'use strict';

    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment);
    const route = segments.length <= 4 ? 'root' : segments[4];

    const routeHandler = routes[route];

    if (!routeHandler) return;
    routeHandler();
})();

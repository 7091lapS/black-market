import R from 'ramda';
import {dictionary} from './dictionary';

// click :: String -> Page -> Page
const click = R.curry((querySelector, page) => page.evaluate((querySelector) => {
    document.querySelector(querySelector).click();
}, querySelector)
.then(_ => page));


// type :: String -> String -> Page -> Page
const type = R.curry((querySelector, text, page) => page.evaluate((querySelector, text) => {
    const queryInput = document.querySelector(querySelector);
    queryInput.value = text;
}, querySelector, text)
.then(_ => page));

// submitForm :: String -> Page -> Page
const submitForm = R.curry((querySelector, page) => page.evaluate(querySelector => {
    console.log(querySelector);
    const formElement = document.querySelector(querySelector);
    formElement.submit();
}, querySelector)
.then(_ => page));

// waitUntillChange :: PhantomInstance -> Page -> Page
const waitUntillChange = R.curry((pi, page) => new Promise(resolve => {
        let nodeBridge = pi.createOutObject();
        const checkChanged = _ => setTimeout(_ => {
            nodeBridge.property('_PAGE_LOADED').then(function(pageLoaded){
                pageLoaded ? resolve() : checkChanged();
            })
        }, 100);

        page.property('onLoadFinished', (status, nodeBridge) => {
            nodeBridge._PAGE_LOADED = true;
        }, nodeBridge);

        checkChanged();
    }).then(_ => page)
);

// waitFor :: Number -> Page -> Page
const waitFor = R.curry((time, page) => new Promise(resolve => {
        setTimeout(_ => resolve(), time);
    }).then(_ => page)
);

export const actions = new Map();

actions.set(dictionary.TYPE, type);
actions.set(dictionary.SUBMIT_FORM, submitForm);
actions.set(dictionary.WAIT_UNTILL_URL_CHANGE, waitUntillChange);
actions.set(dictionary.WAIT_FOR, waitFor);
actions.set(dictionary.CLICK, click);

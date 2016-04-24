import phantom from 'phantom';
import R from 'ramda';

// actions
// createPhantom :: () -> PhantomInstance
export const createPhantom = () => phantom.create();
export const closePhantom = (pi) => pi.exit();

// phantom - page
// createPage :: PhantomInstance  -> Page
export const createPage = pInstance => pInstance.createPage();
// openPage :: String  -> Page -> Page
export const openPage = R.curry((url, page) => page.open(url).then(() => page ));
// getContent :: Page -> ContentObject
export const getContent = page => page.property('content').then((content) => {
    page.close();
    return content;
});

// printPage :: Page -> Page
export const printPage = page => page.property('content').then(() => {
    page.render('test.png');
    return page
});

// logPageUrl :: Page -> Page
export const logPageUrl = page => page.evaluate(() => location.href).then((href) => {
    console.log(href);
    return page
});

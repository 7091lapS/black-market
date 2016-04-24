export const plans = [{
    id: 'duck_duck_go_results',
    entryPoint: 'https://duckduckgo.com/',
    planTemplate: [
        ['TYPE', '#search_form_input_homepage', 'form_input_text'],
        ['SUBMIT_FORM', '#search_form_homepage'],
        ['WAIT_UNTILL_URL_CHANGE']
    ],
    planDetailsKeys: ['form_input_text'],
    laundryPlan: {
        links: {
            query: '.result__title .result__a',
            url: 'href',
            text: 'getText'
        }
    }
},{
    id: 'duck_duck_go_images',
    entryPoint: 'https://duckduckgo.com/',
    planTemplate: [
        ['TYPE', '#search_form_input_homepage', 'form_input_text'],
        ['SUBMIT_FORM', '#search_form_homepage'],
        ['WAIT_UNTILL_URL_CHANGE'],
        ['CLICK', '[data-zci-link="images"]'],
        ['WAIT_FOR', 'wait_for']
    ],
    planDetailsKeys: ['form_input_text', 'wait_for'],
    laundryPlan: {
        images: {
            query: '.tile--img__img',
            url: 'src',
            description: 'alt'
        }
    }
}];

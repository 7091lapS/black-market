# black-market
simple scraping service

## quick start
install dependencies
> `$ npm install`

run mongodb:
> `$ mongod`

run black-market:
> `$ npm run dev`

add a scraping plan:
> `$ curl -H "Content-Type: application/json" -X POST -d @./src/plans/template_example.json http://localhost:8000/plans`

use the scraping plan:
> `$ curl http://localhost:8000/scrape/github_search?search_input_text="hello"`

## create a plan:
use the following structure to create a new plan:
```
{
    "name": "plan_name",
    "entryPoint": "https://page-to-scrape-url/",
    "planTemplate": [
        ["ACTION", "query-selector", ...],
        ...        
    ],
    "planDetailsKeys": ["key", ...],
    "laundryPlan": {
        "key": {
            "query": "query-selector",
            "url": "data-attribute",
            ...
        }
    }
}
```
### name
plan's name

### entryPoint
page to scrape url

### planTemplate
array of actions to execute on the page to scrape, possible actions:

[`TYPE`, query selector, text]

[`SUBMIT_FORM`, query selector]

[`CLICK`, query selector]

[`WAIT_FOR`: time in ms]

[`WAIT_UNTILL_URL_CHANGE`]

### planDetailsKeys
dynamic values to pass through request's query params

### laundryPlan
format scraped data

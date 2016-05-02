import R from 'ramda';
import {getPlans, getPlanByName, addPlan} from '../plans/services/Plan';
import {refinePlan} from '../plans/planner';
import {execute} from '../robber/robber';
import {clean} from '../laundry/laundry';

// nameToUrl :: String -> String
const nameToUrl = url => `/scrape/${url}`;

// paramsToQueryString :: [String] -> String
const paramsToQueryString = params => R.reduce(
    (prev, cur) => `${prev}${prev !== '?' ? '&' : ''}${cur}=`,
    params.length ? '?' : '',
    params
);

// Plan's routes
// GET: list available Plans
// POST: submit a new Plan
const plansRoutes = [{
        method: 'GET',
        path: '/plans',
        handler: (request, reply) => getPlans().then(plans => {
            reply(plans);
        })
    },{
        method: 'POST',
        path: '/plans',
        handler: (request, reply) =>  {
            addPlan(request.payload)
            .then(plan => {
                reply(plan);
            })
            .catch((err) => { reply(err); })
        }
}];

// planToPreview :: Plan -> Object
const planToPreview = plan => {
    return {
        id: plan._id,
        link: `${nameToUrl(plan.name)}${paramsToQueryString(plan.planDetailsKeys)}`,
        target: plan.entryPoint,
        params: plan.planDetailsKeys,
        result: plan.laundryPlan
    };
};

// scrapes' index routes
// GET: list available scraping endpoints
const scrapeIndexRoutes = {
    method: 'GET',
    path: '/scrape',
    handler: (request, reply) => R.composeP(
        reply,
        R.map(planToPreview),
        getPlans
    )()
};

// scrapes' endpoints
// GET: look for planName's plan and run scraping
const scrapeRoutes = {
    method: 'GET',
    path: '/scrape/{planName}',
    handler: (request, reply) => {
        R.composeP(
            (plan) => {
                const url = plan.entryPoint;
                const instructions = refinePlan(plan.planTemplate, R.pick(plan.planDetailsKeys, request.query));
                const normalize = pageContent => clean(plan.laundryPlan, pageContent);
                execute(url, instructions, R.compose(reply, normalize));
            },
            getPlanByName
        )(request.params.planName)
    }
}

// getRoutes :: _ -> [Routes]
export const getRoutes = _ => [
    plansRoutes,
    scrapeIndexRoutes,
    scrapeRoutes
];

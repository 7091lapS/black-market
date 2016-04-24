import R from 'ramda';
import {plans} from '../plans/templates';
import {refinePlan} from '../plans/planner';
import {execute} from '../robber/robber';
import {clean} from '../laundry/laundry'

// idToUrl :: String -> String
const idToUrl = url => `/${url}`;

export const api = {
    method: 'GET',
    path: '/api',
    handler: (request, reply) => reply(R.map(plan => {
        return {
            link: idToUrl(plan.id),
            target: plan.entryPoint,
            params: plan.planDetailsKeys,
            result: plan.laundryPlan
        }
    }, plans))
};

export const routes = R.map(plan => {
    return {
        method: 'POST',
        path: idToUrl(plan.id),
        handler: (request, reply) => {
            const url = plan.entryPoint;
            const instructions = refinePlan(plan.planTemplate, R.pick(plan.planDetailsKeys, request.payload));
            const normalize = pageContent => clean(plan.laundryPlan, pageContent);
            execute(url, instructions, R.compose(reply, normalize));
        }
    }
}, plans);

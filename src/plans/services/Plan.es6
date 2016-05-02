import R from 'ramda';
import {Plan} from '../models/Plan';

// getPlans :: Function -> Promise
export const getPlans = _ => Plan.find();

// getPlan :: String -> Promise
export const getPlan = planId => Plan.findById(id);

// getPlanByName :: String -> Promise
export const getPlanByName = planName => Plan.findOne({name: planName});

// addPlan :: Plan -> Function -> Promise
export const addPlan = plan =>  (new Plan(plan)).save();

// removePlan :: String -> Promise
export const removePlan = planId => Plan.remove({_id: planId});

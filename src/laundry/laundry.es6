import R from 'ramda';
import Cheerio from 'cheerio';

// runQuery :: $ -> String -> [$Element]
const runQuery = ($, querySelector) => Array.prototype.map.call($(querySelector), (el) => el);

// getPlansKeys :: Object -> [String]
const getPlansKeys = R.curry(laundryPlan => R.compose(
    R.filter(key => key !== 'query'),
    R.keys
)(laundryPlan));

// getPlansKeys :: Object -> [String]
const getPlansAttribs = R.curry((laundryPlan) => R.compose(
    R.map(key => laundryPlan[key]),
    getPlansKeys
)(laundryPlan))

// getPlansValues :: $ -> [String] -> [String] -> $Element -> Object
const getPlansValues = R.curry(($, propertyPlanKeys, propertyPlanAttribs, dirtyProperty) => R.zipObj(
    propertyPlanKeys,
    R.map(key => key === 'getText' ? $(dirtyProperty).text() : dirtyProperty.attribs[key], propertyPlanAttribs)
));

// popuateProperty :: $ -> Object -> Object
const popuateProperty = ($, propertyPlan) => {
    const dirtyProperties = runQuery($, propertyPlan.query);
    const propertyPlanKeys = getPlansKeys(propertyPlan);
    const propertyPlanAttribs = getPlansAttribs(propertyPlan);
    return R.map(getPlansValues($, propertyPlanKeys, propertyPlanAttribs), dirtyProperties);
};

// cleanGoods :: LaundryPlan -> $ -> Object
const cleanGoods = R.curry((laundryPlan, $) => {
    return R.compose(
        R.zipObj(getPlansKeys(laundryPlan)),
        R.map(key => popuateProperty($, laundryPlan[key])),
        getPlansKeys
    )(laundryPlan)
});

// clean :: LaundryPlan -> PageContent -> Object
export const clean = (laundryPlan, stoolenGoods) => {
    const $ = Cheerio.load(stoolenGoods);
    return cleanGoods(laundryPlan, $);
}

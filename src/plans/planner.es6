import R from 'ramda';

// defineChunk :: String -> Object -> String
const defineChunk = R.curry((planDetails, planTemplateDetailChunk) =>
    R.or(R.prop(planTemplateDetailChunk, planDetails), planTemplateDetailChunk)
);

// defineDetail :: [String] -> Object -> [String]
const defineDetail = R.curry((planDetails, planTemplateDetail) =>
    R.map(defineChunk(planDetails), planTemplateDetail)
);

// definePlan :: [[String]] -> Object -> [[String]]
export const refinePlan = (planTemplate, planDetails) => R.map(defineDetail(planDetails), planTemplate);

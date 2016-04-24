import R from 'ramda';

export const log = x => console.log(`value is: ${x}`);
export const logTime = x => console.log(`current time: ${(new Date).toISOString()}`);
export const chainDelay = R.curry((millis, delayed) => new Promise(resolve => setTimeout(() => resolve(), millis)).then(() => delayed));

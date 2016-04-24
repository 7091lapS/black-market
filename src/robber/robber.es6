import R from 'ramda';
import { createPhantom, closePhantom, createPage, openPage, getContent, printPage, logPageUrl} from '../utils/phantom';
import {actions} from './actions';
import {phantomInstanceRelying} from './dictionary';

// executeInstruction :: String -> Map -> PhantomInstance -> Function
const executeInstruction = R.curry((actions, piRely, pi, instruction) => {
    const instructionF = actions.get(R.head(instruction)).apply(null, R.tail(instruction))
    return R.any(R.equals(R.head(instruction)), piRely) ? instructionF(pi) : instructionF;
});

// executePlan :: [[String]] -> PhantomInstance -> Page -> Page
const executePlan = (instructions, pi) => R.composeP.apply(
        null,
        R.map(executeInstruction(actions, phantomInstanceRelying, pi), R.reverse(instructions))
);

// processPage :: String -> [[String]] -> PhantomInstance -> PageContent
const processPage = (url, instructions, pi) => R.composeP(
    getContent,
    //printPage,
    logPageUrl,
    executePlan(instructions, pi),
    logPageUrl,
    openPage(url),
    createPage
);

// scrape :: String -> [[String]] -> Function -> PhantomInstance
const scrape = R.curry((url, instructions, serveCallback, pi) => R.composeP(
    () => closePhantom(pi),
    (pageContent) => serveCallback(pageContent),
    processPage(url, instructions, pi)
)(pi));

// execute :: String -> [[String]] -> Function
export const execute = (url, instructions, delivery) => {
    R.composeP(
        scrape(url, instructions, delivery),
        createPhantom
    )()
}

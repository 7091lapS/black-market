import R from 'ramda';
import Hapi from 'hapi';
import {getRoutes} from './routes';

const server = new Hapi.Server();
server.connection({port: 8000});

// populateRoutes :: void
const populateRoutes = R.compose(
    R.map(route => server.route(route)),
    getRoutes
);

// openBlackMarket :: void
export const openBlackMarket = _ => {
    populateRoutes();
    server.start((err) => {
        if(err) {
            throw err;
        }
        console.log(`server running at ${server.info.uri}`);
    });
};

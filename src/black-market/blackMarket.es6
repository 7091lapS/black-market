import R from 'ramda';
import Hapi from 'hapi';
import {api, routes} from './routes';

const server = new Hapi.Server();
server.connection({port: 8000});

// openBlackMarket :: void
export const openBlackMarket = _ => {
    server.start((err) => {
        if(err) {
            throw err;
        }
        console.log(`server running at ${server.info.uri}`);
    });
};

server.route(api);
server.route(routes);

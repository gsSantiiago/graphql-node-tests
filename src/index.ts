import { createServer } from 'http';

import app from './app';
import db from './models';
import { normalizePort, onError, onListening, handleError } from './utils';

const port = normalizePort(process.env.PORT || 3000);
const server = createServer(app);

db.sequelize.sync()
    .then(() => {
        
        server.listen(port);
        server.on('error', onError(server));
        server.on('listening', onListening(server));

    }).catch(err => {
        handleError(err);
    });
    
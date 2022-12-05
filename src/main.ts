import http from 'http';
import app from './app';
import config from './config';

app.set('port', config.port)

const server = http.createServer(app);

server.listen(config.port);

server.on('listening', () =>{
    console.log(`Servidor Arriba en http://localhost:${config.port}`);
});
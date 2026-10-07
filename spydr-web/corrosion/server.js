const http = require('http');
const Corrosion = require('./');

const proxy = new Corrosion({
    codec: 'xor',
    prefix: '/service/',
});

const server = http.createServer((request, response) => {
    if (request.url === '/health') {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        return response.end(JSON.stringify({
            status: 'ok',
            service: 'corrosion'
        }));
    }

    if (request.url.startsWith(proxy.prefix)) {
        return proxy.request(request, response);
    }

    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });

    response.end('Corrosion backend');
});

server.on('upgrade', (request, socket, head) => {
    proxy.upgrade(request, socket, head);
});

const PORT = process.env.SERVER_PORT || process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Corrosion listening on port ${PORT}`);
});

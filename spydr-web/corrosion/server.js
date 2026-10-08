const http = require('http');
const Corrosion = require('./');

const proxy = new Corrosion({
    codec: 'xor',
    prefix: '/service/',
});

const server = http.createServer((request, response) => {
    /*
     * HEALTH CHECK
     */
    if (request.url === '/health') {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        return response.end(JSON.stringify({
            status: 'ok',
            service: 'corrosion'
        }));
    }

    /*
     * ENCODE API
     *
     * /service/encode?url=https%3A%2F%2Fexample.com
     */
    if (request.url.startsWith('/service/encode')) {
        try {
            const parsed = new URL(
                request.url,
                'http://localhost'
            );

            const target = parsed.searchParams.get('url');

            if (!target) {
                response.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                return response.end(JSON.stringify({
                    error: 'Missing url parameter'
                }));
            }

            let targetURL;

            try {
                targetURL = new URL(target);
            } catch {
                response.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                return response.end(JSON.stringify({
                    error: 'Invalid URL'
                }));
            }

            if (
                targetURL.protocol !== 'http:' &&
                targetURL.protocol !== 'https:'
            ) {
                response.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                return response.end(JSON.stringify({
                    error: 'Only HTTP and HTTPS URLs are supported'
                }));
            }

            const encoded = proxy.url.codec.encode(targetURL);

            response.writeHead(200, {
                'Content-Type': 'application/json'
            });

            return response.end(JSON.stringify({
                encoded
            }));
        } catch (error) {
            response.writeHead(500, {
                'Content-Type': 'application/json'
            });

            return response.end(JSON.stringify({
                error: error.message
            }));
        }
    }

    /*
     * CORROSION PROXY
     */
    if (request.url.startsWith(proxy.prefix)) {
        return proxy.request(request, response);
    }

    /*
     * UNKNOWN ROUTE
     */
    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });

    response.end('Corrosion backend');
});

/*
 * WEBSOCKET SUPPORT
 */
server.on('upgrade', (request, socket, head) => {
    proxy.upgrade(request, socket, head);
});

/*
 * RENDER PORT
 */
const PORT =
    process.env.SERVER_PORT ||
    process.env.PORT ||
    3000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Corrosion listening on port ${PORT}`);
});

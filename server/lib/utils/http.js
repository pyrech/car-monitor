import express from 'express';
import path from 'path';

export function setupHttpServer(http, port) {
    http.listen(port, () => {
        console.log("Listening at *:" + port)
    });
}

export function configureHttpApp(app, pids) {
    // Configure public assets
    app.use('/public', express.static(__dirname + '/../../../client/dist'));

    // Setup router

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname + '/../../../client/lib/index.html'));
    });

    app.get('/pids/list', (req, res) => {
        res.send(
            JSON.stringify(pids)
        );
    });
}

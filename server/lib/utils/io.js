export function configureIo(io, btOBDReader) {
    // Setup router like

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
            // clean useless PIDs
        });

        socket.on('pid.request', (msg) => {
            console.log('pid.request: ' + msg);

            // todo request real value
            // btOBDReader.requestValueByName(msg);
            io.emit('pid.update', JSON.stringify(
                [
                    {
                        name: msg,
                        value: parseInt(Math.random() * 100)
                    }
                ]
            ));
        });
    });
}

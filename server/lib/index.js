import express from 'express';
import http from 'http';
import socket from 'socket.io';
import OBDReader from 'bluetooth-obd';
import PIDs from '../node_modules/bluetooth-obd/lib/obdInfo.js';
import { setupHttpServer, configureHttpApp } from './utils/http.js';
import { configureIo } from './utils/io.js';

const app = express();
const httpServer = http.Server(app);
const io = socket(httpServer);
const btOBDReader = new OBDReader();

const exposedPIDs = PIDs.map(pid => {
    return {
        name: pid.name,
        description: pid.description,
        min: pid.min,
        max: pid.max,
        unit: pid.unit
    }
});

var dataReceivedMarker = {};

btOBDReader.on('connected', () => {
    //this.addPoller("vss");

   // this.startPolling(1000); //Request all values each second.
});

btOBDReader.on('dataReceived', data => {
    console.log('data received', data);
    // todo format correctly data ? array of {name, value} object
    io.emit('pid.update', JSON.stringify(data));
});

// Use first device with 'obd' in the name
// TODO TEST THE REAL THING
//btOBDReader.autoconnect('obd');

setupHttpServer(httpServer, 8000);
configureHttpApp(app, exposedPIDs);

configureIo(io, btOBDReader);

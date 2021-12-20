const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band('Imagine Dragons'));
bands.addBand(new Band('Coldplay'));
bands.addBand(new Band('One Republic'));
bands.addBand(new Band('TwentyOne Pilots'));

//console.log(bands);



io.on('connection', client => {
    console.log('Client connected');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Client disconnected');
    });

    client.on('vote-band', (payload) => {
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        console.log(payload);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });



});
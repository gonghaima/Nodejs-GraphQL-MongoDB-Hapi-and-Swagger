const hapi = require('hapi');
const mongoose = require('mongoose')

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

const init = async() => {

    mongoose.connect('mongodb://whoisyourmum:8whoisyourmum@ds119171.mlab.com:19171/hapigraphql');
    mongoose.connection.once('open', ()=>{
        console.log('connected to database'); 
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            return `<h1>My modern api</h1>`
        }
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);   
};

init();
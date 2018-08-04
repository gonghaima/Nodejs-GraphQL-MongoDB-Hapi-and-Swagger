const hapi = require('hapi');
const mongoose = require('mongoose')
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');


const server = new hapi.server({
    port: 4000,
    host: 'localhost'
});


const init = async () => {

    // Swagger plugin
    await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: {
				info: {
					title: 'Paintings API Documentation',
					version: Pack.version
				}
			}
		}
	]);

    // // Notice it’s graphiql not graphql.
    // // Graphiql is the in-browser IDE for exploring GraphQL.
    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            }
        }
    });

    // //Register graphqlHapi which includes the schema
    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
    });



    mongoose.connect('mongodb://whoisyourmum:8whoisyourmum@ds119171.mlab.com:19171/hapigraphql');
    mongoose.connection.once('open', () => {
        console.log('connected to database');
    });
    const Painting = require('./models/Painting');

    server.route([{
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            return `<h1>My modern api</h1>`
        }
    },
    {
        method: 'GET',
        path: '/api/v1/paintings',
        config: {
            description: 'Get all the paintings',
            tags: ['api', 'v1', 'painting']
        },
        handler: (req, reply) => {
            return Painting.find();
        }
    },
    {
        method: 'POST',
        path: '/api/v1/paintings',
        handler: (req, reply) => {
            const { name, url, techniques } = req.payload;
            const painting = new Painting({
                name,
                url,
                techniques
            });

            return painting.save();
        }
    }]);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();


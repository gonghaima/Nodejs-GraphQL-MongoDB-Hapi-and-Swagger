setting up a powerful API with Nodejs, GraphQL, MongoDB, Hapi, and Swagger 

mongoose is for client side to connect to mongoDB server (mLab), via schema, data can be read/write to mongoDB. In this case, PaintingSchema is key for the communication.

In hapi server, route can be set to expose mongoose operation directly to webpage. So the data can be get/post from
http://localhost:4000/api/v1/paintings


Alternatively, use GraphQL schema to talk to mongoose schema.
hapi server can register graphql via url, in registration, the graphql schema specified.
In graphql/schema.js resolve function, Mongoose schema (painting) is referenced, as below.

const Painting = require('../models/Painting');
resolve(parent, args) {
    return Painting.findById(args.id)
}

Swagger offers the most powerful and easiest to use tools to take full advantage of the OpenAPI Specification
yarn add hapi-swagger inert vision

add as plugin
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
add routing config
config: {
            description: 'Get all the paintings',
            tags: ['api', 'v1', 'painting']
        },


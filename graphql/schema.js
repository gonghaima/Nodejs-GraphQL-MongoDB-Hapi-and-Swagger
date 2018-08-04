const graphql = require('graphql');
const PaintingType = require('./PaintingType');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        painting: {
            type: PaintingType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
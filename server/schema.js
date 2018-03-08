require('dotenv').config();

const 
    // Massive = require('massive'),
    // db = Massive.connect({db: process.env.CONNECTION_STRING}),
    fetch = require('node-fetch'),
    axios = require('axios'),
    {
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString,
    } = require('graphql');

const TestType = new GraphQLObjectType({
    name: 'Test',
    desc: '...',

    fields: {
        test: {type: GraphQLString}
    }
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    desc: '...',

    fields: () => {
        message: {
            type: TestType
        }
        resolve: () => {
            axios
                .get('http://localhost:3223/api/test')
                .then(response => console.log(response))
                .catch(err => console.log(err));
        }
    }
})

module.exports = new GraphQLSchema({
    query: QueryType
})
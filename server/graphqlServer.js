require('dotenv').config();
const 
    express = require('express'),
    axios = require('axios'),
    // Massive = require('massive'),
    app = express(),
    // db = Massive.connectSync({db: process.env.CONNECTION_STRING})
    graphQLHTTP = require('express-graphql'),
    {buildSchema} = require('graphql'),
    schema = require('./schema'),
    {
        CONNECTION_STRING,
    } = process.env;

// let schema = buildSchema(`
//     type Query {
//         hello: String
//     }
// `);

// let arr = [
//     {id: 1, firstName: 'mam'},
//     {id: 2, firstName: 'mem'},
//     {id: 3, firstName: 'mrm'},
//     {id: 4, firstName: 'mtm'},    
// ]

// let root = {
//     hello: () => {
//         axios
//             .get('http://localhost:3223/api/test')
//             .then(response => response.data.message)
//             .catch(err => console.log(err));
//     }
// };

app.use('/graphql', graphQLHTTP({
    schema,
    // rootValue: root,
    graphiql: true
}))



// app.get('/api/test', (req, res) => {
//     db.getEmployees([], function(err, res) {
//         console.log(res);
//     })
// })

app.listen(4000, console.log('Listening ...'));
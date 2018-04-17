require('dotenv').config();
const
    { PORT } = process.env,
    express = require('express'),
    session = require('express-session'),
    app = express(),
    cors = require('cors'),
    { json } = require('body-parser'),
    port = PORT || 3223,
    
    graphqlHTTP = require('express-graphql'),
    {schema, root} = require('./schema');

    
app.use(session({
    secret: 'hirh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use(function(req, res, next) {
    if ( !req.session.user ) req.session.user = null;
    next();
});
    
app.use('/', cors(), json(), (req, res, next) => {
    return graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    });
});
// app.use(express.static(`${__dirname}/../build`));

app.listen(port, () => console.log(`Listening to port ${port} radio`));
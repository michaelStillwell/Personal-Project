require('dotenv').config();
const 
    express  = require('express'),
    session  = require('express-session'),
    massive  = require('massive'),
    cors     = require('cors'),
    { json } = require('body-parser'),
    passport = require('passport'),
    Auth0    = require('passport-auth0')
    app      = express(),
    port     = process.env.PORT || 3223,
    
    {
        login,
    } = require('./controller/controller_login'),

    {
        getFeatured,

    } = require('./controller/controller_featured'),

    {
        getProducts,
        getProductsByOrder,
        getCurrentProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        getNewOrderProducts,
    } = require('./controller/controller_product'),

    {
        getFieldOrders,
        getWarehouseOrders,
        getNewOrder,
        postToNewOrder,
        removeFromNewOrder,
        removeAllFromNewOrder,
        createNewOrder,
    } = require('./controller/controller_order'),

    {
        markAsComplete,
        getEmployees,
        createEmployees,
        editEmployees,
        deleteEmployees,
    } = require('./controller/controller_employee'),

    {
        CONNECTION_STRING,
        SESSION_SECRET,
        DOMAIN, 
        CLIENT_ID,
        CLIENT_SECRET,
    } = process.env;

app.use(cors());
app.use(json());

massive(CONNECTION_STRING)
    .then(dbInstance => app.set('db', dbInstance))
    .catch(err => console.log(err));

app.use(session(
    {
        secret: SESSION_SECRET,
        resave: false,
        saveUnitialized: false,
        cookie: {
            maxAge: 3600000,
        },
    }
));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new Auth0(
//     {
//         domain: DOMAIN,
//         clientID: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         scope: "openid profile",
//         callbackURL: '/auth',
//     },
//     (accessToken, refreshToken, extraParams, profile, done) => {
//         app.get('db').login(profile.nickname)
//         .then( response => {
//             done(null, response[0]);
//         })
//     }
// ))

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

// app.get('/auth', passport.authenticate('auth0', {}), function(req, res) {
//     res.redirect(`http://localhost:3000/#/employee/${req.user.id}`);
// })

app.use(function(req, res, next) {
    if ( !req.session.user ) req.session.user = null;
    next();
})

app.get('/api/session', function(req, res, next) {
    res.status(200).json(req.session);
})

app.post('/api/auth', login);

app.get('/api/featured', getFeatured);

app.get('/api/products', getProducts);
app.get('/api/product/:id', getCurrentProduct);
app.post('/api/products/create', createProduct);
app.put('/api/products/update/:id', updateProduct);
app.delete('/api/products/delete/:id', deleteProduct);

app.get('/api/orders/field/:id', getFieldOrders);
app.get('/api/orders/warehouse/', getWarehouseOrders);
app.get('/api/orders/new/order/:user', getNewOrder);
app.get('/api/orders/new/products/:user', getNewOrderProducts);
app.get('/api/orders/read/:username/:id', getProductsByOrder);
app.post('/api/orders/new/post/:user/:product', postToNewOrder);
app.post('/api/orders/create/:id', createNewOrder);
app.put('/api/orders/:username/:id/complete', markAsComplete);
app.delete('/api/orders/new/products/delete/:user/:id', removeFromNewOrder);
app.delete('/api/orders/new/products/remove/:user', removeAllFromNewOrder);

app.get('/api/employees', getEmployees);
app.post('/api/employees/create', createEmployees);
app.put('/api/employees/update/:id', editEmployees);
app.delete('/api/employees/delete/:id', deleteEmployees);


app.get('/api/test', function(req, res, next) {
    res.status(200).json({ message: 'worked' });
})

app.listen(port, () => console.log(`Listening to port ${port} radio!`));
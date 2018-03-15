module.exports = {
    getFieldOrders: (req, res, next) => {
        const
            db = req.app.get('db');

        db.getFieldOrders([req.params.id])
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
            console.log('GET FIELD ORDERS');
    },

    getWarehouseOrders: (req, res, next) => {
        const 
            db = req.app.get('db');

        db.getWarehouseOrders()
            .then(response => res.status(200).json(response))
            .catch(err => console.log('GET WAREHOUSE ORDESR: ', err));
        console.log('GET WAREHOUSE ORDERS');
    },

    getNewOrder: (req, res, next) => {
        const
            db = req.app.get('db');
        
        db.getNewOrder([req.params.user])
            .then(response => res.status(200).json(response))
            .catch(err => console.log('GET NEW ORDER', err));
        console.log('GET NEW ORDER');
    },

    postToNewOrder: (req, res, next) => {
        const
            db = req.app.get('db');

        db.postToNewOrder([req.params.user, req.params.product])
            .then(() => res.status(200))
            .catch(err => console.log('POST TO NEW ORDER', err));
    },

    removeFromNewOrder: (req, res, next) => {
        const
            db = req.app.get('db');

        db.removeFromNewOrder([req.params.user, req.params.id])
            .then(() => res.status(200))
            .catch(err => console.log('FROM REMOVE: ', err));
    },

    removeAllFromNewOrder: (req, res, next) => {
        const
            db = req.app.get('db');

        db.removeAllFromNewOrder(req.params.user)
            .then(() => res.status(200))
            .catch(err => console.log('FROM REMOVE ALL: ', err));
    },
    
    createNewOrder: (req, res, next) => {
        const
            db = req.app.get('db'),
            send = [req.params.id, req.body.product, req.body.emp_id];
        
        db.createNewOrder(send)
            .then(() => res.status(200).json({ message: 'Placed' }))
            .catch(err => console.log('CREATE NEW ORDER: ', err));
    },

}
module.exports = {
    getProducts: (req, res, next) => {
        const
            db = req.app.get('db');
        
        db.getProducts()
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    getProductsByOrder: (req, res, next) => {
        const
            db = req.app.get('db');

        db.getProductsByOrder([req.params.username, req.params.id]) 
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

    getCurrentProduct: (req, res, next) => {
        const
            db = req.app.get('db');

        db.getCurrentProduct([req.params.id])
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },
    
    createProduct: (req, res, next) => {
        const 
            db = req.app.get('db'),
            send = [req.body.name, req.body.description, req.body.price, req.body.stock];

        console.log(send);
        db.createProduct(send)
            .then(() => res.status(200))
            .catch(err => console.log('CREATE PRODUCT: ', err));
    },
    
    updateProduct: (req, res, next) => {
        const
            db = req.app.get('db')
            send = [Number(req.params.id), req.body.name, req.body.description, Number(req.body.price), Number(req.body.stock)];

        db.updateProduct(send)
            .then(() => res.status(200))
            .catch(err => console.log('UPDATE PRODUCT: ', err));
    },

    deleteProduct: (req, res, next) => {
        const
            db = req.app.get('db');

        db.deleteProduct([req.params.id])
            .then(() => console.log('Worked Hopefully'))
            .catch(err => console.log('DELETE PRODUCT: ', err));
    },

    getNewOrderProducts: (req, res, next) => {
        const
            db = req.app.get('db');

        db.getNewOrderProducts([req.params.user])
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    },

}
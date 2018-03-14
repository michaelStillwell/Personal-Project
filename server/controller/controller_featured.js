module.exports = {
    getFeatured: (req, res, next) => {
        const
            db = req.app.get('db');

        db.getFeatured()
            .then(response => res.status(200).json(response))
            .catch(err => console.log('GET FEATURED: ', err));
    },

    postFeatured: (req, res, next) => {
        const
            db = req.app.get('db');

        db.postFeatured(req.params.product)
            .then(() => console.log('POST WORKED'))
            .catch(err => console.log('POST FEATURED: ', err));
    },

    deleteFeatured: (req, res, next) => {
        const
            db = req.app.get('db');

        db.deleteFeatured(req.params.product)
            .then(() => console.log('DELETE WORKED'))
            .catch(err => console.log('DELETE FEATURED: ', err));
    },
}
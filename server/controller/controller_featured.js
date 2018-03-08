module.exports = {
    getFeatured: (req, res, next) => {
        const
            db = req.app.get('db');

        db.getFeatured()
            .then(response => res.status(200).json(response))
            .catch(err => console.log('GET FEATURED: ', err));
    },
}
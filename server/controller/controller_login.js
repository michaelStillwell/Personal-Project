module.exports = {
    login: (req, res, next) => {
        const
            db = req.app.get('db');
    
        db.login(req.body.username)
            .then(response => {
                if (response) {
                    req.session.user = response[0];
                    let send = { Session: req.session, Body: response };
                    res.status(200).json(send);
                } else {
                    res.status(404).json({messgae: 'User Not Found'});
                }
            })
            .catch(err => console.log(err));
    }
}
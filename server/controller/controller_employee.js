module.exports = {
    markAsComplete: (req, res, next) => {
        const 
            db = req.app.get('db');
        
        db.markAsComplete([req.params.username, req.params.id])
            .then(() => res.status(200).json({ message: 'Updated' }))
            .catch(err => console.log(err));
    },
    
    getEmployees: (req, res, next) => {
        const
            db = req.app.get('db');

        db.getEmployees()
            .then(response => res.status(200).json(response))
            .catch(err => console.log('GET EMPLOYEES: ', err))
    },

    createEmployees: (req, res, next) => {
        const 
            db = req.app.get('db');

        db.createEmployees([req.body.username, req.body.password, req.body.emp_type])
            .then(response => res.status(200))
            .catch(err => console.log('CREATE EMPLOYEES: ', err));
    },

    editEmployees: (req, res, next) => {
        const 
            db = req.app.get('db'),
            send = [parseInt(req.params.id), req.body.user, req.body.password, req.body.emp_type];

        db.editEmployees(send)
            .then(() => res.status(200))
            .catch(err => console.log('EDIT EMPLOYEES: ', err));
    },

    deleteEmployees: (req, res, next) => {
        const 
            db = req.app.get('db');

        db.deleteEmployees([req.params.id])
            .then(() => res.status(200))
            .catch(err => console.log('DELETE EMPLOYEES: ', err))
    },
}
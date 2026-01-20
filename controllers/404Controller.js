exports.get500 = (req, res, next) =>{
    res.status(404).render('errorPages/500', {
        title: 'Page Not Found',
        path: '',
        user: req.user
    })
};


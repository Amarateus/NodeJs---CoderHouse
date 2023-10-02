const publicRoutes = (req, res, next) => {
    if (req.session.isLogged) {
        return res.redirect('/api/products');
    }
    next()
}

export default publicRoutes
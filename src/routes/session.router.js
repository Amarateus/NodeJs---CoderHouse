import {
    Router
} from 'express';
import publicRoutes from '../middlewares/publicRoutes.js';
import passport from 'passport';

const router = Router();

router.post('/login', publicRoutes, passport.authenticate('login', {
    failureRedirect: '/login'
}), async (req, res) => {

    req.session.first_name = req.user.first_name
    req.session.email = req.user.email;
    req.session.rol = req.user.rol
    req.session.isLogged = true;

    res.redirect('/api/products');
});

router.post('/signup', publicRoutes, passport.authenticate('register', {
    failureRedirect: '/failregister'
}), async (req, res) => {

    res.redirect('/login');
});

router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}))

router.get('/githubcallback', passport.authenticate('github', {
    failureRedirect: '/login'
}), (req, res) => {
    req.session.first_name = req.user.first_name
    req.session.email = req.user.email;
    req.session.rol = req.user.rol
    req.session.isLogged = true;

    res.redirect('/api/products')
})

export default router;
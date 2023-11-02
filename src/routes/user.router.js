import {
    Router
} from "express";
import publicRoutes from "../middlewares/publicRoutes.js";

const router = Router()


router.get('/login', publicRoutes, (req, res) => {
    res.render('login');
});

router.get('/signup', publicRoutes, (req, res) => {
    res.render('signup');
});

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
});

export default router;
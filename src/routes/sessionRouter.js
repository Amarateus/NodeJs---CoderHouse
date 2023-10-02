import {
    Router
} from 'express';
import {
    userModel
} from '../dao/models/user.model.js';
import publicRoutes from '../middlewares/publicRoutes.js';

const router = Router();

router.post('/login', publicRoutes, async (req, res) => {

    const {
        email,
        password
    } = req.body;

    const user = await userModel.findOne({
        email,
        password
    }).lean();

    if (!user) {
        return res.redirect('/login');
    }

    req.session.first_name = user.first_name
    req.session.email = user.email;
    req.session.rol = user.rol
    req.session.isLogged = true;

    res.redirect('/api/products');
});

router.post('/signup', publicRoutes, async (req, res) => {

    const {
        first_name,
        last_name,
        email,
        age,
        password
    } = req.body;

    const user = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password
    });

    req.session.first_name = user.first_name;
    req.session.email = user.email;
    req.session.rol = user.rol
    req.session.isLogged = true;

    res.redirect('/api/products');
});

export default router;
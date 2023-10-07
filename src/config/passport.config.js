import passport from "passport";
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import {
    userModel
} from '../dao/models/user.model.js'

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ // estrategia de Register local
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const {
            first_name,
            last_name,
            age
        } = req.body
        try {
            const exist = await userModel.findOne({
                email: username
            })
            if (exist) {
                return done(null, false)
            }
            const user = await userModel.create({
                first_name,
                last_name,
                age,
                email: username,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            })
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({ // estrategia de Login local
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({
                email: username
            })
            if (!user) { // el user existe?
                return done(null, false)
            }
            if (!bcrypt.compareSync(password, user.password)) { // comparamos la contraseña
                return done(null, false)
            }
            return done(null, user)

        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport
import passport from "passport";
import LocalStrategy from 'passport-local'
import GithubStrategy from 'passport-github2'
import bcrypt from 'bcrypt'
import {
    userModel
} from '../dao/models/mongo/user.model.js'

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

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.94a19da2816b90f4',
        clientSecret: '8aa668d469ce88de8ff51ad30aedf7636cdedb0f',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({
                email
            });
            if (!user) {
                const newUser = await userModel.create({
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    password: '',
                    email,
                });

                done(null, newUser);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport
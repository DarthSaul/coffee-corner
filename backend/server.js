import express from 'express';
const app = express();

import cors from 'cors';
import coffee from './api/coffee.route.js';
import auth from './api/auth.route.js';

import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from './models/User.js';

app.use(cors());
app.use(express.json());

const sessionConfig = {
    name: 'session',
    secret: 'aBadSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60,
        maxAge: 1000 * 60 * 60
    }
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/v1/auth', auth);
app.use('/api/v1/coffee', coffee);
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});

export default app;

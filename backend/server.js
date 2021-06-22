import express from 'express';
const app = express();

import cors from 'cors';
import coffee from './api/coffee.route.js';
import auth from './api/auth.route.js';

import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';

import User from './models/User.js';

app.use(cors({ credentials: true }));
app.use(express.json());

app.use(
    session({
        name: 'session',
        secret: 'aBadSecret', // change to env var
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        }
    })
);
app.use(cookieParser('aBadSecret')); // change to env var
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

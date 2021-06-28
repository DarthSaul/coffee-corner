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
import MongoStore from 'connect-mongo';

import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';

app.use(cors({ credentials: true }));
app.use(express.json());

// const dbUrl = process.env.MONGO_DB_URI;
const secret = process.env.SECRET || 'devBackupSecret';
const sessionConfig = {
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60,
        maxAge: 1000 * 60 * 60
    }
    // ,
    // store: MongoStore.create({
    //     mongoUrl: dbUrl,
    //     touchAfter: 24 * 60 * 60,
    //     secret
    // })
};
app.use(session(sessionConfig));
app.use(flash());

// app.use(cookieParser('aBadSecret')); // change to env var

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ** Not working 6-28
app.use((req, res, next) => {
    console.log('server: ' + req.user);
    next();
});

app.use('/api/v1/auth', auth);
app.use('/api/v1/coffee', coffee);
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});

export default app;

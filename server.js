import express from 'express';
const app = express();

import connectDB from './db/db.js';
connectDB();

import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';
import dotenv from 'dotenv';

dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import coffee from './api/coffee.route.js';
import brew from './api/brew.route.js';
import profile from './api/profile.route.js';
import post from './api/post.route.js';
import auth from './api/auth.route.js';
import uploader from './api/upload.route.js';

import User from './models/User.js';

app.use(cors());
app.use(express.json());

// const secret = process.env.SECRET || 'devBackupSecret';
// const sessionConfig = {
//     name: 'session',
//     secret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         // secure: true,
//         expires: Date.now() + 1000 * 60 * 60,
//         maxAge: 1000 * 60 * 60
//     }
// };
// app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/v1/auth', auth);
app.use('/api/v1/profile', profile);
app.use('/api/v1/coffee', coffee);
app.use('/api/v1/brew', brew);
app.use('/api/v1/posts', post);
app.use('/api/v1/upload', uploader);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API running...');
    });
}

app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

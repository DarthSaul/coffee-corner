import mongoose from 'mongoose';
import Coffee from '../models/Coffee.js';
import dotenv from 'dotenv';
dotenv.config();
const db = process.env.MONGO_DB_URI;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('CONNECTED TO mongod');
    })
    .catch(err => {
        console.error(err);
        console.log('mongod CONNECTION ERROR');
    });

export default function seedCoffees() {
    Coffee.insertMany([
        {
            distributor: 'de fer',
            name: 'chami',
            origin: 'colombia',
            roastType: 'light',
            tags: ['sweet', 'floral', 'honey']
        },
        {
            distributor: 'de fer',
            name: 'gesha kambera',
            origin: 'panama',
            roastType: 'light',
            tags: ['honey', 'luxardo cherry', 'spiced rum']
        },
        {
            distributor: 'de fer',
            name: 'limu',
            origin: 'ethiopia',
            roastType: 'dark',
            tags: ['dark cocoa', 'citrus', 'vanilla']
        }
    ])
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

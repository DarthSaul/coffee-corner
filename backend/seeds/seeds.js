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
            distributor: 'allegheny coffee & tea exchange',
            name: 'el salvador - santa maria',
            origin: 'el salvador',
            roastType: 'medium',
            tags: ['milk chocolate', 'caramel', 'orange']
        },
        {
            distributor: 'allegheny coffee & tea exchange',
            name: 'bali blue moon',
            origin: 'bali',
            roastType: 'medium',
            tags: ['chocolate', 'cedar', 'cherry']
        },
        {
            distributor: 'allegheny coffee & tea exchange',
            name: 'brazil natural cerrado',
            origin: 'brazil',
            roastType: 'light',
            tags: ['cocoa', 'dark chocolate', 'almond']
        }
    ])
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

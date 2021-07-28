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
            distributor: 'coava',
            name: 'robinson figueroa',
            origin: 'colombia',
            roastType: 'medium',
            tags: ['chocolately', 'rich', 'dried fig', 'maple', 'allspice']
        },
        {
            distributor: 'coava',
            name: 'nathalia maria',
            origin: 'brazil',
            roastType: 'medium',
            tags: [
                'chocolately',
                'rich',
                'red apple',
                'macadamia nut',
                'graham cracker'
            ]
        },
        {
            distributor: 'coava',
            name: 'kilenso',
            origin: 'ethiopia',
            roastType: 'light',
            tags: ['rich', 'fruity', 'brown sugar', 'lavendar', 'dark rum']
        }
    ])
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

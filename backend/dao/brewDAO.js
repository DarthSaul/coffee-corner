import BrewMethod from '../models/BrewMethod.js';
import User from '../models/User.js';

export default class BrewDAO {
    static async getBrewMethods() {
        try {
            const brewMethods = await BrewMethod.find().populate({
                path: 'user'
            });
            return { brewMethods };
        } catch (err) {
            console.error(`Unable to retrieve brew methods, ${err}`);
            return { error: err };
        }
    }
    static async addBrew(
        name,
        description,
        weights,
        grindType,
        items,
        user_id
    ) {
        try {
            const user = await User.findById(user_id);
            const brew = new BrewMethod({
                name,
                description,
                weights,
                grindType,
                items
            });
            user.profile.brewMethods.push(brew);
            brew.user = user_id;
            await user.save();
            await brew.save();
            return { brew };
        } catch (err) {
            console.error(`Unable to create brew method, ${err}`);
            return { error: err };
        }
    }
}

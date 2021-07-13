import BrewMethod from '../models/BrewMethod.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';

export default class BrewDAO {
    static async getBrewMethods() {
        try {
            const brewMethods = await BrewMethod.find().populate('user');
            return { brewMethods };
        } catch (err) {
            console.error(`Unable to retrieve brew methods, ${err}`);
            return { error: err };
        }
    }
    static async getBrewById(id) {
        try {
            const brewMethod = await BrewMethod.findById(id).populate('user');
            return brewMethod;
        } catch (err) {
            console.error(`Unable to find brew method, ${err}`);
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
            const profile = await Profile.findOne({ user: `${user_id}` });
            const brew = new BrewMethod({
                name,
                description,
                weights,
                grindType,
                items
            });
            profile.brewMethods.push(brew._id);
            brew.user = profile.user._id;
            await profile.save();
            await brew.save();
            return { brew };
        } catch (err) {
            console.error(`Unable to create brew method, ${err}`);
            return { error: err };
        }
    }
    static async deleteBrewMethod(brew_id, profile_id) {
        try {
            const deletedBrew = await BrewMethod.findByIdAndDelete(brew_id);
            await Profile.findByIdAndUpdate(profile_id, {
                $pull: { brewMethods: brew_id }
            });
            if (deletedBrew) {
                return { deletedBrew };
            } else {
                throw new Error('Unable to find brew method to delete.');
            }
        } catch (err) {
            console.error(`Unable to delete brew method, ${err}`);
            return { error: err };
        }
    }
}

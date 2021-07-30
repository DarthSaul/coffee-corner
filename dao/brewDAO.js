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
    static async addBrew(data, profile_id) {
        try {
            const profile = await Profile.findById(profile_id);
            const brew = new BrewMethod(data);
            brew.user = profile.user;
            await brew.save();
            profile.brewMethods.push(brew._id);
            await profile.save();
            return { brew };
        } catch (err) {
            console.error(`Unable to create brew method, ${err}`);
            return { error: err };
        }
    }

    static async updateBrewMethod(brew_id, data) {
        try {
            const brew = await BrewMethod.findByIdAndUpdate(brew_id, data, {
                new: true
            });
            if (!brew) {
                throw new Error('Unable to retrieve brew method for update.');
            }
            return { brew };
        } catch (err) {
            console.error(`Unable to update brew method, ${err}`);
            return { error: err };
        }
    }

    static async deleteBrewMethod(brew_id, profile_id) {
        try {
            const deletedBrew = await BrewMethod.findByIdAndDelete(brew_id);
            if (!deletedBrew) {
                throw new Error('Unable to find brew method to delete.');
            }
            await Profile.findByIdAndUpdate(profile_id, {
                $pull: { brewMethods: brew_id }
            });
            return { deletedBrew };
        } catch (err) {
            console.error(`Unable to delete brew method, ${err}`);
            return { error: err };
        }
    }
}

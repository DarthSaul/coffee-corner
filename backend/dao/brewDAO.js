import BrewMethod from '../models/BrewMethod.js';

export default class BrewDAO {
    static async addBrew(name, description, items, user_id) {
        try {
            const brew = new BrewMethod({ name, description, items });
            brew.user = user_id;
            await brew.save();
            return { brew };
        } catch (err) {
            console.error(`Unable to create brew method, ${err}`);
            return { error: err };
        }
    }
}

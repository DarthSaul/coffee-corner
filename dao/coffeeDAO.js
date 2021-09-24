import Coffee from '../models/Coffee.js';
import Profile from '../models/Profile.js';

export default class CoffeeDAO {
    static async getCoffees({ filters = null, page = 0, perPage = 50 } = {}) {
        let query;
        if (filters) {
            if ('name' in filters) {
                query = { name: { $regex: filters['name'], $options: 'i' } };
            } else if ('origin' in filters) {
                query = {
                    origin: { $regex: filters['origin'], $options: 'i' }
                };
            } else if ('distributor' in filters) {
                query = {
                    distributor: {
                        $regex: filters['distributor'],
                        $options: 'i'
                    }
                };
            }
        }

        try {
            const coffeesList = await Coffee.find(query)
                .populate({ path: 'reviews', populate: { path: 'user' } })
                .populate({
                    path: 'user',
                    populate: { path: 'profile' }
                })
                .limit(perPage)
                .skip(perPage * page);
            const totalNumCoffees = await Coffee.countDocuments(query);
            return { coffeesList, totalNumCoffees };
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            );
            return { coffeesList: [], totalNumCoffees: 0 };
        }
    }

    static async getCoffeeById(id) {
        try {
            const coffee = await Coffee.findById(id).populate({
                path: 'reviews',
                populate: { path: 'user' }
            });
            return coffee;
        } catch (err) {
            console.error(`Unable to find coffee, ${err}`);
            if (err.kind == 'ObjectId') {
                return { error: 'Coffee not found' };
            }
            return { error: err };
        }
    }

    static async getCoffeeDist() {
        let distributors = [];
        try {
            distributors = await Coffee.distinct('distributor');
            return distributors;
        } catch (err) {
            console.error(`Unable to get distributors, ${err}`);
            return distributors;
        }
    }

    static async addCoffee(coffeeData, profile_id) {
        try {
            const profile = await Profile.findById(profile_id);
            const coffee = new Coffee(coffeeData);
            coffee.user = profile.user;
            await coffee.save();
            profile.coffees.push(coffee._id);
            await profile.save();
            return { coffee };
        } catch (err) {
            console.error(`Unable to add coffee, ${err}`);
            return { error: err };
        }
    }

    static async updateCoffee(coffee_id, data) {
        try {
            const coffee = await Coffee.findByIdAndUpdate(coffee_id, data, {
                new: true
            });
            if (!coffee) {
                throw new Error('Unable to retrieve coffee for update');
            }
            return { coffee };
        } catch (err) {
            console.error(`Unable to update coffee, ${err}`);
            return { error: err };
        }
    }
    static async updateCoffeeImg(coffee_id, coffee_img) {
        try {
            const coffee = await Coffee.findById(coffee_id);
            if (!coffee) {
                throw new Error('Unable to retrieve coffee for update');
            }
            coffee.img = coffee_img;
            await coffee.save();
            return { coffee };
        } catch (error) {
            console.error(`Unable to update coffee, ${err}`);
            return { error: err };
        }
    }
    static async deleteCoffee(coffee_id, profile_id) {
        try {
            const deletedCoffee = await Coffee.findByIdAndDelete(coffee_id);
            if (!deletedCoffee) {
                throw new Error('Unable to find coffee to delete.');
            }
            await Profile.findByIdAndUpdate(profile_id, {
                $pull: { coffees: coffee_id }
            });
            return { deletedCoffee };
        } catch (err) {
            console.error(err);
            return { error: err };
        }
    }
}

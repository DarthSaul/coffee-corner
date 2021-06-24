import Coffee from '../models/Coffee.js';

export default class CoffeeDAO {
    static async getCoffees({
        filters = null,
        page = 0,
        itemsPerPage = 20
    } = {}) {
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
                .populate({ path: 'reviews', populate: { path: 'owner' } }) // Use ('reviews', ['owner', 'text']) to pop only owner ID & text
                .limit(itemsPerPage)
                .skip(itemsPerPage * page);
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
                populate: { path: 'owner' }
            });
            return coffee;
        } catch (err) {
            console.error(`Unable to find coffee, ${err}`);
            return { error: err };
        }
    }

    static async getCoffeeDist() {
        let distributors = [];
        try {
            // distributors = await Coffee.find({
            //     distributor: {
            //         $regex: dist,
            //         $options: 'i'
            //     }
            // });
            distributors = await Coffee.distinct('distributor');
            return distributors;
        } catch (err) {
            console.error(`Unable to get distributors, ${err}`);
            return distributors;
        }
    }
}

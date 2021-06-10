import Coffee from '../models/Coffee.js';

export default class CoffeeDAO {
    static async getCoffees({
        filters = null,
        page = 0,
        coffeesPerPage = 20
    } = {}) {
        let query;
        if (filters) {
            if ('name' in filters) {
                query = { name: filters['name'] };
            } else if ('origin' in filters) {
                query = { origin: filters['origin'] };
            } else if ('distributor' in filters) {
                query = { distributor: filters['distributor'] };
            }
        }

        try {
            const coffeesList = await Coffee.find(query)
                .limit(coffeesPerPage)
                .skip(coffeesPerPage * page);
            const totalNumCoffees = await Coffee.countDocuments(query);
            return { coffeesList, totalNumCoffees };
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            );
            return { coffeesList: [], totalNumCoffees: 0 };
        }
    }
}

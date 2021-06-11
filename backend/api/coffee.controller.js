import CoffeeDAO from '../dao/coffeeDAO.js';

export default class CoffeeController {
    static async apiGetCoffees(req, res, next) {
        const { coffeesPerPage, pageCount, name, origin, distributor } =
            req.query;
        const itemsPerPage = coffeesPerPage ? parseInt(coffeesPerPage, 10) : 20;
        const page = pageCount ? parseInt(pageCount, 10) : 0;

        let filters = {};
        if (name) {
            filters.name = name;
        } else if (origin) {
            filters.origin = origin;
        } else if (distributor) {
            filters.distributor = distributor;
        }

        const { coffeesList, totalNumCoffees } = await CoffeeDAO.getCoffees({
            filters,
            page,
            itemsPerPage
        });

        let response = {
            coffees: coffeesList,
            page: page,
            filters: filters,
            entries_per_page: coffeesPerPage,
            total_results: totalNumCoffees
        };
        res.json(response);
    }
}

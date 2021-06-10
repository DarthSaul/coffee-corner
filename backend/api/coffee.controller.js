import CoffeeDAO from '../dao/coffeeDAO.js';

export default class CoffeeController {
    static async apiGetCoffees(req, res, next) {
        const coffeesPerPage = req.query.coffeesPerPage
            ? parseInt(req.query.coffeesPerPage, 10)
            : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.origin) {
            filters.origin = req.query.origin;
        } else if (req.query.distributor) {
            filters.distributor = req.query.distributor;
        }

        const { coffeesList, totalNumCoffees } = await CoffeeDAO.getCoffees({
            filters,
            page,
            coffeesPerPage
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

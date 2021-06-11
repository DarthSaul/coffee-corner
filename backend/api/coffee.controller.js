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

    static async apiGetCoffeeById(req, res, next) {
        try {
            const { id } = req.params || {};
            const coffee = await CoffeeDAO.getCoffeeById(id);
            if (!coffee) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(coffee);
        } catch (err) {
            console.error(`api, ${err}`);
            res.status(500).json({ error: err });
        }
    }

    static async apiGetCoffeeDist(req, res, next) {
        try {
            // const { dist } = req.query;
            // const distributors = await CoffeeDAO.getCoffeeDist(dist);
            const distributors = await CoffeeDAO.getCoffeeDist();
            if (distributors.length === 0) {
                return res.json({
                    error: 'No distributors found.'
                });
            }
            res.json(distributors);
        } catch (err) {
            console.error(`Unable to get distributors, ${err}`);
            res.status(500).json({ error: err });
        }
    }
}

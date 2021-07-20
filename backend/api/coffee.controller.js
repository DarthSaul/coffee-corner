import CoffeeDAO from '../dao/coffeeDAO.js';

export default class CoffeeController {
    static async apiGetCoffees(req, res, next) {
        const { coffeesPerPage, pageCount, name, origin, distributor } =
            req.query;
        const perPage = coffeesPerPage ? parseInt(coffeesPerPage, 10) : 50;
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
            perPage
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
            const { error } = coffee;
            if (error) {
                return res.status(404).json({ error });
            }
            res.json(coffee);
        } catch (err) {
            console.error(`api, ${err}`);
            res.status(500).json({ error: err });
        }
    }

    static async apiGetCoffeeDist(req, res, next) {
        try {
            const distributors = await CoffeeDAO.getCoffeeDist();
            if (distributors.length === 0) {
                return res.json({
                    error: 'No distributors found.'
                });
            }
            res.json(distributors);
        } catch (err) {
            console.error(`Unable to get distributors, ${err}`);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiCreateCoffee(req, res, next) {
        try {
            const response = await CoffeeDAO.addCoffee(
                req.body,
                req.params.profile_id
            );
            const { coffee, error } = response;
            if (error) {
                throw new Error(error);
            }
            res.json({ status: 'success', coffee });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiUpdateCoffee(req, res, next) {
        try {
            const response = await CoffeeDAO.updateCoffee(
                req.params.id,
                req.body
            );
            const { coffee, error } = response;
            if (error) {
                throw new Error(error);
            }
            res.json({ status: 'success', coffee });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiDeleteCoffee(req, res, next) {
        try {
            const response = await CoffeeDAO.deleteCoffee(
                req.params.id,
                req.query.profile
            );
            const { deletedCoffee, error } = response;
            if (error) {
                throw new Error(error);
            }
            res.json({ status: 'success', deletedCoffee });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

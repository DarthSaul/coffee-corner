import BrewDAO from '../dao/brewDAO.js';

export default class BrewController {
    static async apiGetBrews(req, res, next) {
        const { brewMethods } = await BrewDAO.getBrewMethods();
        res.json(brewMethods);
    }

    static async apiCreateBrew(req, res, next) {
        try {
            const { name, description, weights, grindType, items } = req.body;
            const response = await BrewDAO.addBrew(
                name,
                description,
                weights,
                grindType,
                items,
                req.user.id
            );
            const { brew, error } = response;
            if (error) {
                throw new Error(error);
            }
            res.json({ status: 'success', brew });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

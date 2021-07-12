import BrewDAO from '../dao/brewDAO.js';

export default class BrewController {
    static async apiGetBrews(req, res, next) {
        const { brewMethods } = await BrewDAO.getBrewMethods();
        res.json(brewMethods);
    }
    static async apiGetBrewById(req, res, next) {
        try {
            const { id } = req.params || {};
            const brewMethod = await BrewDAO.getBrewById(id);
            if (!brewMethod) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(brewMethod);
        } catch (err) {
            console.error(`api, ${err}`);
            res.status(500).json({ error: err.message });
        }
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
    static async apiDeleteBrew(req, res, next) {
        try {
            const { id } = req.params;
            const response = await BrewDAO.deleteBrewMethod(id, req.user.id);
            const { deletedBrew } = response;
            res.json({ status: 'success', deletedBrew });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

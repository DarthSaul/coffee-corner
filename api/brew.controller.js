import BrewDAO from '../dao/brewDAO.js';

export default class BrewController {
    static async apiGetBrews(req, res, next) {
        try {
            const { brewMethods } = await BrewDAO.getBrewMethods();
            res.json(brewMethods);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
    static async apiGetBrewById(req, res, next) {
        try {
            const { brew_id } = req.params || {};
            const brewMethod = await BrewDAO.getBrewById(brew_id);
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
            const response = await BrewDAO.addBrew(
                req.body,
                req.params.profile_id
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

    static async apiUpdateBrew(req, res, next) {
        try {
            console.log(req.params.brew_id);
            const response = await BrewDAO.updateBrewMethod(
                req.params.brew_id,
                req.body
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
            const response = await BrewDAO.deleteBrewMethod(
                req.params.brew_id,
                req.query.profile
            );
            const { deletedBrew } = response;
            if (!deletedBrew) {
                throw new Error('Server error');
            }
            res.json({ status: 'success', deletedBrew });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

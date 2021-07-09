import UserDAO from '../dao/userDAO.js';

export default class ProfileController {
    static async apiGetUserProfile(req, res, next) {
        try {
            const profile = await UserDAO.getProfile(req.user.id);
            res.json(profile);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetProfileById(req, res, next) {
        try {
            const { id } = req.query;
            const profile = await UserDAO.getProfile(id);
            res.json(profile);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiCreateProfile(req, res, next) {
        try {
            const profile = await UserDAO.createProfile(req.user.id, req.body);
            res.json({ status: 'success', profile });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiUpdateProfile(req, res, next) {
        try {
            const updatedProfile = await UserDAO.updateProfile(
                req.user.id,
                req.body
            );
            res.json({ status: 'succes', updatedProfile });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}

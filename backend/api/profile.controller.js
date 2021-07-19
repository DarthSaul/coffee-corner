import UserDAO from '../dao/userDAO.js';
import ProfileDAO from '../dao/profileDAO.js';

export default class ProfileController {
    static async apiUpdateUser(req, res, next) {
        try {
            const user = await UserDAO.updateUser(req.user.id, req.body);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetUserProfile(req, res, next) {
        try {
            const profile = await ProfileDAO.getProfileByUserId(req.user.id);
            res.json(profile);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetProfileByUserId(req, res, next) {
        try {
            const { user_id } = req.params;
            const profile = await ProfileDAO.getProfileByUserId(user_id);
            res.json(profile);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiGetProfileById(req, res, next) {
        try {
            const { profile_id } = req.params;
            const profile = await ProfileDAO.getProfileById(profile_id);
            res.json(profile);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiCreateProfile(req, res, next) {
        try {
            const profile = await ProfileDAO.createProfile(
                req.user.id,
                req.body
            );
            res.json({ status: 'success', profile });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async apiUpdateProfile(req, res, next) {
        try {
            const updatedProfile = await ProfileDAO.updateProfile(
                req.user.id,
                req.body
            );
            res.json({ status: 'succes', updatedProfile });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

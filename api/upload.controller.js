import ProfileDAO from '../dao/profileDAO.js';
import CoffeeDAO from '../dao/coffeeDAO.js';

export default class UploadController {
    static async apiUploadAvatar(req, res, next) {
        try {
            const { filename, originalname, path: url } = req.file;
            if (!filename) {
                throw new Error('File upload failed.');
            }
            await ProfileDAO.avatarUpload(req.user.id, {
                url,
                filename,
                originalname
            });
            res.json(req.file);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
    static async apiUploadCoffeeImg(req, res, next) {
        try {
            const { filename, originalname, path: url } = req.file;
            if (!filename) {
                throw new Error('File upload failed.');
            }
            await CoffeeDAO.updateCoffeeImg(req.params.id, url);
            res.json(req.file);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

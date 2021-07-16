import ProfileDAO from '../dao/profileDAO.js';

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
}

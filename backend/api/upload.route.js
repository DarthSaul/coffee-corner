import express from 'express';
const router = express.Router();
import UploadCtrl from './upload.controller.js';
import { auth } from '../utils/middleware.js';

import multer from 'multer';
import { storage } from '../cloudinary/index.js';
const uploadFile = (req, res, next) => {
    const upload = multer({ storage }).single('file');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error(`Multer Error:`);
            console.error(err);
            return res.status(500).json('Server error');
        } else if (err) {
            console.error(`Error:`);
            console.error(err);
            return res.status(500).json('Server error');
        }
        next();
    });
};

router.post('/', uploadFile, auth, UploadCtrl.apiUploadAvatar);

export default router;

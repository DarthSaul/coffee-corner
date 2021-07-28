import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import dotenv from 'dotenv';
dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const key = process.env.CLOUDINARY_KEY;
const secret = process.env.CLOUDINARY_SECRET;

cloudinary.v2.config({
    cloud_name: cloudName,
    api_key: key,
    api_secret: secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'Coffee-Corner',
        allowedFormats: ['jpeg', 'jpg', 'png', 'svg']
    }
});

export { cloudinary, storage };

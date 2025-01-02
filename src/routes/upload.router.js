const { Router } = require('express');
const multer = require('multer');
const path = require('path')
const uuid = require('uuid');
const { ValidationError } = require('../utils/error.util');
const uploadController = require('../controllers/upload.controller');

const uploadRouter = Router();

const uploadPath = path.join(__dirname, '../../uploads');
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        let extension = path.extname(file.originalname);
        let filename = `${uuid.v4()}-${Date.now()}${extension}`;
        cb(null, filename);
    }
})

const fileFilter = (req, file, cb) => {
    let type = file.mimetype;
    if (allowedTypes.includes(type)) cb(null, true);

    else cb(new ValidationError('Image type is wrong'));
}

uploadRouter.post(
    '/',
    multer({ storage, fileFilter }).single('image'),
    uploadController.upload

);

module.exports = uploadRouter;
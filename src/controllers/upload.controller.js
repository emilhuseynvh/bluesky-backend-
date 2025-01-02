const uploadService = require("../services/upload.service");

const upload = async (req, res, next) => {
    try {
        if (!req.file) throw new NotFoundError('File is required');

        let result = await uploadService.upload(req.file);

        res.status(200).json({ image: result });
    } catch (err) {
        next(err);
    }
}

const uploadController = {
    upload
}

module.exports = uploadController;
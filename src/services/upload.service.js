const Image = require("../models/Upload.model");


const upload = async (file) => {
    let filename = file.filename;

    let image = new Image({
        url: `/upload/${filename}`
    });

    await image.save();

    return image;
}

const uploadService = {
    upload,
}

module.exports = uploadService;
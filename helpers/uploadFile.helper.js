const async = require("async");
const path = require("path");
const { uploadFileToAWS } = require("../utils/cloudStorage");

module.exports.uploadImage = async (image) => {
    return new Promise(async (resolve) => {
        
        const fileName = `product-image/${new Date().getTime()}${path.extname(
            image.name
        )}`;

        const Uploaded = await uploadFileToAWS(fileName, image, image.mimetype );
        console.log("%c Line:16 🍬 Uploaded", "color:#33a5ff", Uploaded);
        if (Uploaded.status === false) {
            resolve(null);
        } else {
            resolve(Uploaded?.fileName);
        }
    });
};
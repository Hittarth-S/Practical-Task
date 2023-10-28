const AWS = require('aws-sdk');
const fs = require('fs');
const stream = require('stream');
const { AWS_KEYS } = require("../config/config");

AWS.config.update({
  accessKeyId: AWS_KEYS.ACCESS_KEY,
  secretAccessKey: AWS_KEYS.SECRET_ACCESS_KEY,
  region: AWS_KEYS.REGION
});

const s3 = new AWS.S3();


exports.uploadFileToAWS = async (imageName, imagePath, mimetype) => {
  return new Promise(async (resolve) => {
    try {
      // Convert the buffer to a Readable Stream
      const bufferStream = new stream.PassThrough();
      bufferStream.end(imagePath?.data);

      const params = {
        Bucket: AWS_KEYS.BUCKET_NAME,
        Key: imageName,
        Body: bufferStream,
        ACL: 'public-read',
        ContentType: mimetype,
      };

      await s3.upload(params, (err, data) => {
        if (err) {
          resolve({ status: false, fileName: '' });
          console.error('Error uploading image:', err);
        } else {
          resolve({ status: true, fileName: data.Location });
          console.log('Image uploaded successfully. URL:', data.Location);
        }
      });

    } catch (error) {
      console.log("error", error)
      resolve(false);
    }
  });
};


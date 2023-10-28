var path = require("path");

exports.fileValidation = async (file) => {
  var allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".mp4", ".mov", ".mkv", ".avi", ".gif", ".doc", ".pdf"]; //add as per requirements
  var fileExtension = path.extname(file.name);
  if (!allowedExtensions.includes(fileExtension)) {
    return { status: false, message: "Invalid File Type" };
  }
  if (file.size > 9 * 1024 * 1024) {
    //9 mb limit
    return { status: false, message: "The file size must not exceed 9MB." };
  }
  return { status: true };
};

exports.imageValidation = (file) => {
  var allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"]; //add as per requirements
  var fileExtension = path.extname(file.name);

  if (!allowedExtensions.includes(fileExtension)) {
    return { status: false, message: "Invalid File Type" };
  }
  if (file.size > 9 * 1024 * 1024) {
    //9 mb limit
    return { status: false, message: "The file size must not exceed 9MB." };
  }
  return { status: true };
};
const multer = require('multer');
const path = require('path');
const { environment } = require('../config/environment')

const { FILE_SIZE } = environment;

// Multer middleware for file upload
function uploadFile(req, res, next) {
    const storage = multer.memoryStorage();
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, callback) => {
            let fileExt = path.extname(file.originalname);
            if (fileExt === '.mp3' || fileExt === '.m4a') {
                return callback(null, true);
            }

            return res.status(400).send({
                status: "Bad Request",
                message: "Only .mp3 and .m4a audio files are allowed"
            })
        },
        limits: {
            fileSize: parseInt(FILE_SIZE)
        }
    }).single("file");

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send({
                status: "Bad Request",
                message: `${err.message}`
            })
        } else if (err) {
            return res.status(500).send({
                status: "Internal server error",
                message: `${err.message}`
            })
        }
        next();
    })
}

module.exports = uploadFile
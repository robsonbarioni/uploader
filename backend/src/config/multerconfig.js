const path = require("path");
const crypto = require("crypto");
const storage = require('./storage');

const basePath = path.resolve(__dirname, "..", "..", "tmp");
const fileNameResolver = async (req, file, cb) => {
    const hash = (await crypto.randomBytes(16)).toString("hex");
    file.key = `${hash}-${file.originalname}`;
    cb(null, file.key);
};

module.exports = {
    dest: basePath,
    storage: storage.add(fileNameResolver, basePath),
    limits: {
        fileSize: 2 * 1024 * 1024, // 2mb
    },
    fileFilter: (req, file, cb) => {
        const allowerdTypes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];

        if (!allowerdTypes.includes(file.mimetype))
            return cb(new Error("Invalid image type."));

        cb(null, true);
    },
};

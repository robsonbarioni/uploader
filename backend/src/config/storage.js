const multer = require("multer");

module.exports = {
    local: {
        add : (fileNameResolver, basePath) => multer.diskStorage({
            destination: (req, file, cb) => cb(null, basePath),
            filename: fileNameResolver,
        }),
        remove: (post) => {
            const fs = require('fs');
            const path = require('path');
            const {promisify} = require('util');
            
            return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', post.key));
        }
    },
    amazon: {
        add : (fileNameResolver, basePath) => {
            const aws = require("aws-sdk");
            const multerS3 = require("multer-s3");

            aws.config.update({
                secretAccessKey: process.env.AwsKey,
                accessKeyId: process.env.AwsId,
                region: process.env.AwsRegion,
            });

            return new multerS3({
                s3: new aws.S3(),
                bucket: "photos",
                acl: "public-read",
                contentType: multerS3.AUTO_CONTENT_TYPE,
                key: fileNameResolver,
            });
        },
        remove: (post) => {
            return new (require('aws-sdk')).S3().deleteObject({
                Bucket: 'photos',
                key: post.key
            })
            .promise();
        }
    },
    azure: {
        add: (fileNameResolver, basePath) => {
            const multerAzure = require("multer-azure-storage");

            return new multerAzure({
                azureStorageConnectionString: process.env.AzureStorage,
                // azureStorageAccount: 'mystorageaccount',
                // azureStorageAccessKey: 'mykey',

                containerName: "photos",
                containerSecurity: "blob",
                fileName: fileNameResolver,
            });
        },
        remove: (post) => {
            throw new Error(`not implemented, could not remove file: ${post.key}`);
        }
    }
}[process.env.StorageType];

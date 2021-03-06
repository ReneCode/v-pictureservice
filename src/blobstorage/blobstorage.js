
var azure = require("azure-storage");

const containerPrefix = 'devcontainer';

class BlobStorage {
    connect(connectionString) {
        return new Promise((resolve, reject) => {
            try {
                this.blobService = azure.createBlobService(connectionString);
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    getBlob(containerName, key) {
        return new Promise((resolve, reject) => {
            this.blobService.getBlobToText(containerName, key, (err, content, blob) => {
                if (err) {
                    reject(err);
                }
                resolve(content);
            })

        })
    }

    getBlobToStream(containerName, key, stream, options) {
        return new Promise((resolve, reject) => {
            this.blobService.getBlobToStream(containerName, key, stream, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            })

        })
    }

    getBlobs(containerName, prefix, continuationToken, maxResults) {
        return new Promise((resolve, reject) => {
            let options = {
                maxResults: maxResults || 1000
            };
            blobService.listBlobsSegmentedWithPrefix(containerName, prefix, continuationToken, options, (err, result, response) => {
                if (err) {
                    reject(err);
                }
                const data = {
                    entries: result.entries,
                    continuationToken: result.continuationToken
                };
                resolve(data);
            });
        });
    }


    // existsContainer(containerName) {
    //     this.blobService.getBlobProperties()
    // }

};

module.exports = new BlobStorage();

const WebServer = require('./web-server');
const blobStorage = require('./blobstorage/blobstorage');


const OPTIONS = {
  port: process.env.PORT || 3002
};

const webServer = new WebServer(OPTIONS);
webServer.createServer();

const storageConnectionString = process.env.DV_BLOB_STORAGE_CONNECTION_STRING;

blobStorage.connect(storageConnectionString)
  .then(() => {
    return webServer.listen()
  })
  .then(() => {
    console.log("server listen on port:", OPTIONS.port);
  })
  .catch((err) => {
    console.log("can not start to blobstorage:", err);
  });



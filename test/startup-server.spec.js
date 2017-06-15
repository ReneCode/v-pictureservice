var WebServer = require('../src/web-server');
let blobStorage = require('../src/blobstorage/blobstorage');

const OPTIONS = {
  port: 3002,
  authorize: false,
  logging: false
};

let API = undefined;

/*
  start & stop the backend server for the mocha tests

  before() and after() are used before and after *ALL* test.spec.files
*/

before('start server', () => {
  const storageConnectionString = process.env.DV_BLOB_STORAGE_CONNECTION_STRING;
  console.log("conString:(", storageConnectionString + ")")
  return blobStorage.connect(storageConnectionString)
    .then(() => {
      // create Server
      let webServer = new WebServer(OPTIONS);
      webServer.createServer();
      return webServer.listen()
    })
    .then((api) => {
      API = api;
      // console.log("TESTING start server v-picture-service on port:", OPTIONS.port)
    })
});

after('close server', (done) => {
  // console.log("stop testing backend server")
  API.close(() => {
    done();
  });
});

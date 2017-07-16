
var fs = require('fs');
var express = require('express');
var router = express.Router();

let blobStorage = require('../blobstorage/blobstorage');

const tenantId = '0a7b63de-9e54-4d7d-a3b0-d15a2aef8679';

function getSvg(req, res) {
  const projectId = req.params.projectId;
  const fileName = req.params.fileName;
  const query = req.query;

  const containerName = blobStorage.getContainerName(tenantId);
  const key = blobStorage.getKey(projectId, fileName);
  blobStorage.getBlob(containerName, key)
    .then((svg) => {
      res.writeHead(200,
        {
          'Content-Type': 'image/svg+xml'
        });
      res.end(svg);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
}

function getImage(req, res) {
  const projectId = req.params.projectId;
  const imageName = req.params.imageName.toLowerCase();
  const query = req.query;

  const containerName = blobStorage.getContainerName(tenantId);
  const key = blobStorage.getKey(projectId, imageName);
  blobStorage.getBlobToStream(containerName, key, res)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
}

router.get("/svgs/:projectId/:fileName", getSvg);

router.get("/images/:projectId/:imageName", getImage);


module.exports = router;




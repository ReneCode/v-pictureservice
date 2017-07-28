
var fs = require('fs');
var express = require('express');
var router = express.Router();

let blobStorage = require('../blobstorage/blobstorage');

const tenantId = '6d6cb5cd-90b8-4f86-b173-828dbf6b9b12';

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




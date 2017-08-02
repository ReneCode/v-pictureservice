
var fs = require('fs');
const path = require('path');

var express = require('express');
var router = express.Router();

let blobStorage = require('../blobstorage/blobstorage');


function getContainerName(projectId) {
  return "prj-" + projectId;
}

function getDirectory(fileName) {
  const extension = path.extname(fileName);
  let directory = "other";
  switch (extension) {
    case ".svg":
      directory = "svg";
      break;
    case ".png":
      directory = "png";
      break;
    case ".e3d":
      directory = "e3d";
      break;
  }
  return directory;
}

function getBlobName(fileName) {
  return getDirectory(fileName) + "/" + fileName;
}

function getSvg(req, res) {
  const projectId = req.params.projectId;
  const fileName = req.params.fileName;
  const query = req.query;

  const containerName = getContainerName(projectId);
  const blobName = getBlobName(fileName);
  
  blobStorage.getBlob(containerName, blobName)
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

  const containerName = getContainerName(projectId);
  const blobName = getBlobName(imageName);
  blobStorage.getBlobToStream(containerName, blobName, res)
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




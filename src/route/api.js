
var express = require('express');
var router = express.Router();

let blobStorage = require('../blobstorage/blobstorage');
let SvgAsPng = require('./svg-as-png');

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

// function toDataURL(blob) {
// 	new Promise((resolve, reject) => {
// 		const reader = new FileReader()
// 		reader.onloadend = () => resolve(reader.result)
// 		reader.onerror = reject
// 		reader.readAsDataURL(blob)
// 	});
// }

function getSvgAsPng(req, res) {
  const projectId = req.params.projectId;
  const fileName = req.params.fileName;
  const query = req.query;

  const containerName = blobStorage.getContainerName(tenantId);
  const key = blobStorage.getKey(projectId, fileName);
  blobStorage.getBlob(containerName, key)
    .then((svg) => {
      const svgAsPng = new SvgAsPng();
      return svgAsPng.convert(svg);
    })
    .then((png) => {
      res.writeHead(200,
        {
          'Content-Type': 'image/png'
        });
      res.end(png, 'binary');
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
}

router.get("/svgs/:projectId/:fileName", getSvg);
router.get("/svgs/:projectId/:fileName/png", getSvgAsPng);

module.exports = router;




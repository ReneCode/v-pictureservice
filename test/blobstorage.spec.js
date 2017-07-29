
let should = require('chai').should();

let blobStorage = require('../src/blobstorage/blobstorage');


describe("blob storage", () => {
	it("get blob", () => {

		let container = "devcontainer-6d6cb5cd-90b8-4f86-b173-828dbf6b9b12";
		const projectId = "9949702d-c3e2-4f48-bfdb-f63780bb51cd";
		const file = "1.svg";
		const key = blobStorage.getKey(projectId, file);
		return blobStorage.getBlob(container, key)
		.then( (content) => {
			content.should.be.not.null;
			content.should.be.a('string');
			content.length.should.be.least(100);
			content.indexOf("<svg ").should.be.least(0);
//			console.log(content)
		});
		// https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/a76c8bc2-c591-4aee-b1ab-524b472bea92/images/EPLAN-LIC.png
	});


})


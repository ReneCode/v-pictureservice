
let should = require('chai').should();

let blobStorage = require('../src/blobstorage/blobstorage');


describe("blob storage", () => {
	it("get blob", () => {

		let container = "prj-210c93df-edac-4b0e-a658-6ee5e1e3954c";
		const file = "1.svg";
		const key = "svg/" + file;
		return blobStorage.getBlob(container, key)
			.then((content) => {
				content.should.be.not.null;
				content.should.be.a('string');
				content.length.should.be.least(100);
				content.indexOf("<svg ").should.be.least(0);
			});
	});


})


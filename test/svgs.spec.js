
let axios = require('axios');
let should = require('chai').should();

const PORT = 3002;
const host = `http://localhost:${PORT}`;

describe("svgs", () => {

	before("set axios header", () => {
		axios.defaults.headers["Content-Type"] = "application/json";
	});

	const PROJECT_ID = "aa7c8e1e-0ced-4c4e-a436-0828b8bb1138";
	const SVG_NAME = "2.svg";
	const SVG_URL = `${host}/api/v1/svgs/${PROJECT_ID}/${SVG_NAME}`;

	it("get one svg", () => {
		return axios.get(SVG_URL).then((res) => {
			res.should.be.not.null;
			res.data.should.be.a('string');
		});
	});

	it("get one svg as png", () => {

		const options = {
			params: {
			}
		}
		return axios.get(SVG_URL + "/png", options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.a('string');
		});
	}).timeout(4000);

})
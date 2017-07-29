
let axios = require('axios');
let should = require('chai').should();

const PORT = 3102;
const host = `http://localhost:${PORT}`;

describe("svgs", () => {

	before("set axios header", () => {
		axios.defaults.headers["Content-Type"] = "application/json";
	});

	const PROJECT_ID = "9949702d-c3e2-4f48-bfdb-f63780bb51cd";
	const SVG_NAME = "2.svg";
	const SVG_URL = `${host}/api/v1/svgs/${PROJECT_ID}/${SVG_NAME}`;

	it("get one svg", () => {
		return axios.get(SVG_URL).then((res) => {
			res.should.be.not.null;
			res.data.should.be.a('string');
		});
	});

})
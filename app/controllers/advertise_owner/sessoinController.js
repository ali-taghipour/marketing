// npm modules
const axios = require('axios');


class sessionController{
    async getSession(req, res) {
        try {

            const response = await axios.post(
                "http://195.248.240.222:8001/session", {},
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    }
                }
            );
            const result = await response.data;
            return res.json(result);
        } catch (error) {
            return res.json(error.response.data)
        }
    };
    async deleteSession(req, res) {
        try {
            const { sessionId } = req.body
            const response = await axios.delete(
                `http://195.248.240.222:8001/session/${sessionId}`,
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    }
                }
            );
            const result = await response.data;
            return res.json(result);
        } catch (error) {
            return res.json(error.response.data)
        }
    };
}

module.exports = new sessionController()
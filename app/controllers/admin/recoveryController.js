// npm modules
const axios = require('axios');


class recoveryController{
    // recovery
    async recoveryByLastPassword(req, res) {
        try {
            const { username, last_password } = req.body;
            const data = {
                username, last_password, service: "shid_news"
            }
            const response = await axios.post(
                "http://195.248.240.222:8001/recovery/by-last-password", data,
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
    async recoveryByNewPassword(req, res) {
        try {
            const { username, new_password, security_question_id, answer } = req.body;
            const data = {
                username, new_password, service: "shid_news", security_question_id, answer
            }
            const response = await axios.post(
                "http://195.248.240.222:8001/recovery/new-password", data,
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
    async securityAnswer(req, res) {
        try {
            const { security_question_id, answer } = req.body;
            const data = {
                service: "shid_news", security_question_id, answer
            }
            const response = await axios.post(
                "http://195.248.240.222:8001/security-answer", data,
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
    async securityQuestions(req, res) {
        try {
            const response = await axios.get(
                "http://195.248.240.222:8001/security-questions",
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

module.exports = new recoveryController()
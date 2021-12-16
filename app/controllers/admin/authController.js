// npm modules
const axios = require('axios');
// models
const Admin = require('../../models/index').Admin;



class adminAuth {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const data = { username, password };
            const response = await axios.post(`http://23.88.97.228:80/admin/login`, data, {
                headers: {
                    service: "shid_news",
                    auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                }
            })
            const result = await response.data;
            return res.json(result)
        } catch (error) {
            return res.json(error.response.data);
        }
    }
    async loginByPhone(req, res) {
        try {
            const { phone_number } = req.body;
            const data = { phone_number };
            const response = await axios.post(`http://23.88.97.228:80/admin/login/by-phone/`, data, {
                headers: {
                    service: "shid_news",
                    auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                }
            })

            const result = await response.data;
            return res.json(result);
        } catch (error) {
            return res.json(error.response.data);
        }
    }
    async loginByPhoneVerify(req, res) {
        try {
            const { phone_number, code } = req.body;
            const data = { phone_number, code };
            const response = await axios.post(`http://23.88.97.228:80/admin/login/by-phone/verify/`, data, {
                headers: {
                    service: "shid_news",
                    auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                }
            })
            const result = await response.data;
            return res.json(result);
        } catch (error) {
            return res.json(error.response.data);
        }
    }
    async updateMyCredentials(req, res) {
        try {
            const {
                phone_number,
                email,
                username,
            } = req.body;
            let data = {
                username,
                phone_number,
                email,
            };
            const response = await axios.post(
                "http://23.88.97.228:80/admin/me/update",
                data,
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    },
                }
            );
            const result = await response.data
            return res.json(result);
        } catch (error) {
            return res.json(error.response.data)
        }
    };
    async deleteMyAccount(req, res) {
        try {
            const { password } = req.body;
            let config = {
                method: 'delete',
                url: 'http://23.88.97.228:80/delete-my-account',
                data: { password },
                headers: {
                    'Authorization': req.headers['authorization'],
                    service: "shid_news",
                    auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                }
            };
            const response = await axios(config)
            const result = await response.data;

            return res.json(result);
        } catch (error) {
            return res.json(error.response.data);
        }

    };
    async userInformation(req, res) {
        try {
            let data = {};
            const response = await axios.post(
                "http://23.88.97.228:80/admin/me",
                data,
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    },
                }
            );
            const result = await response.data
            return res.json(result);
        } catch (error) {
            return res.json(error.response.data);
        }
    };

}

module.exports = new adminAuth();

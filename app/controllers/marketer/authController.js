// npm modules
const axios = require('axios');
// models
const Marketer = require('../../models/index').Marketer;

// jwt
const jwt = require('jsonwebtoken');

class marketerAuth {
    async registerUser(req, res) {
        try {
            const { first_name, last_name, username, password, phone_number, email } = req.body;
            const data = { first_name, last_name, username, password, phone_number, email };

            const response = await axios.post(`http://23.88.97.228:80/register/${process.env.marketer_role_id}/${process.env.service_id}`, data, {
                headers: {
                    service: "shid_news",
                    auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                }
            })
            const result = await response.data;
            if (result.status) {
                const user = await jwt.verify(result.data.token, process.env.JWT_PRIVATE_KEY);
                const data = { id: user.id , username, firstName: req.body.first_name, lastName: req.body.last_name, email: req.body.email, isBanned: false, walletId: user.wallet_id, marketerLevelId: "e3ed348c-f39d-4b8d-99a7-367a7185e48a", isDocumentVerified: false};
                const newUser = await Marketer.create(data);
            }

            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.json(error.response.data);
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const data = { username, password };
            const response = await axios.post(`http://23.88.97.228:80/login/${process.env.marketer_role_id}/${process.env.service_id}`, data, {
                headers: {
                    service: "shid_news",
                    auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                }
            })
            const result = await response.data
            return res.json(result)
        } catch (error) {
            return res.json(error.response.data);
        }
    }
    async loginByPhone(req, res) {
        try {

            const { phone_number } = req.body;
            const data = { phone_number };
            const response = await axios.post(`http://23.88.97.228:80/login/by-phone/${process.env.marketer_role_id}/${process.env.service_id}`, data, {
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
            const response = await axios.post(`http://23.88.97.228:80/login/by-phone/verify/${process.env.marketer_role_id}/${process.env.service_id}`, data, {
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
                "http://23.88.97.228:80/me/update",
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
                "http://23.88.97.228:80/me",
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

module.exports = new marketerAuth();

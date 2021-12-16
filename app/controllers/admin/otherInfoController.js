// npm modules
const axios = require('axios');



class otherInfoController {
    // info
    async getInfo(req, res) {
        try {
            const response = await axios.get(
                `http://195.248.240.222:8001/admin/info/my`,
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    }
                }
            );
            const result = await response.data;
          return  res.json(result);
        } catch (error) {
           return res.json(error.response.data)
        }
    };
    async setInfo(req, res) {
        try {
            const {
                email,
                phone_number,
                city,
                configurations,
                family_name,
                name,
                birthday,
                national_id,
                state,
                job,
                gender
            } = req.body;
            const data = {
                email,
                phone_number,
                city,
                configurations,
                family_name,
                name,
                birthday,
                national_id,
                state,
                job,
                gender
            }
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/info/my`, data,
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
    async getOneInfo(req, res) {
        try {
            const response = await axios.get(
                `http://195.248.240.222:8001/admin/info/${req.params.infoId}`,
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    }
                }
            );
            const result = await response.data;
          return  res.json(result);
        } catch (error) {
          return  res.json(error.response.data)
        }
    };
    async getAllInfo(req, res) {
        try {
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/info/`, {},
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    }
                }
            );
            const result = await response.data;
          return  res.json(result);
        } catch (error) {
          return  res.json(error.response.data)
        }
    };
    async updateInfo  (req, res) {
        try {
            const { email, phone_number, configurations, name, family_name, birthday, national_id, gender, job, state, city, others } = req.body;
            const data = {
                email, phone_number, configurations, name, family_name, birthday, national_id, gender, job, state, city, others
            }
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/info/${req.params.infoId}`, data,
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    }
                }
            );
            const result = await response.data;
          return  res.json(result);
        } catch (error) {
          return  res.json(error.response.data)
        }
    };
}

module.exports = new otherInfoController();

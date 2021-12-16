// npm modules
const axios = require('axios');


class companyController {
    // company
    async getCompany(req, res) {
        try {

            const response = await axios.get(
                `http://195.248.240.222:8001/company`,
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
    async setCompany(req, res) {
        try {
            const {
                name,
                economic_code,
                national_code,
                registeration_id,
                telephone_number,
                field_of_activity,
            } = req.body
            const data = { name, economic_code, national_code, registeration_id, telephone_number, field_of_activity }
            const response = await axios.post(
                `http://195.248.240.222:8001/company`, data,
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
    async updateCompany(req, res) {
        try {
            const {
                name,
                economic_code,
                national_code,
                registeration_id,
                telephone_number,
                field_of_activity,
                companyId
            } = req.body
            const data = { name, economic_code, national_code, registeration_id, telephone_number, field_of_activity }
            const response = await axios.post(
                `http://195.248.240.222:8001/company/${companyId}`, data,
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

module.exports = new companyController()
// npm modules
const axios = require('axios');


class usersManagmentController{
    async getAllUsers (req, res) {
        try {
            const response = await axios.post(
                "http://195.248.240.222:8001/admin/users", { ...req.body },
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
    async getOneUser (req, res) {
        try {
            const response = await axios.get(
                `http://195.248.240.222:8001/admin/users/${req.params.userId}`,
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

module.exports = new usersManagmentController()

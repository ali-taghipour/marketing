// npm modules
const axios = require('axios');


class rolesController {
  async getAllRoles(req, res){
        try {
            const response = await axios.post(
                "http://195.248.240.222:8001/admin/role", { ...req.body },
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    }
                }
            );
            const result = await response.data;
        return    res.json(result);
        } catch (error) {
          return  res.json(error.response.data)
        }
    };
  async getOneRole(req, res) {
        try {
            const { name } = req.body
            const response = await axios.get(
                `http://195.248.240.222:8001/admin/role/${req.params.role_id}`,
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    },
                    data: { name }
                }
            );
            const result = await response.data;
          return  res.json(result);
        } catch (error) {
          return  res.json(error.response.data)
        }
    };
  async createNewRole(req, res) {
        try {
            const { name, service_id } = req.body;
            const data = {name , service_id}
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/role/new`,data,
                {
                    headers: {
                        'authorization': req.headers['authorization'],
                        service: "shid_news",
                        auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                    }
                }
            );
            const result = await response.data;
        return    res.json(result);
        } catch (error) {
          return  res.json(error.response.data)
        }
    };
  async updateRole(req, res)  {
        try {
            const { name, is_permission } = req.body;
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/role/${req.params.role_id}`, { name, is_permission },
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
  async setRoleToUser(req, res){
        try {
            const { user_id } = req.body;
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/role/${req.params.role_id}/set-role-to-user`, { user_id },
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
  async removeRoleFromUser(req, res) {
        try {
            const { user_id } = req.body;
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/role/${req.params.role_id}/remove-role-from-user`, { user_id },
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

module.exports = new rolesController();

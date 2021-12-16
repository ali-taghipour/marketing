// npm modules
const axios = require('axios');


class sessionController{
    async getSession(req, res) {
        try {

            const response = await axios.post(
                "http://195.248.240.222:8001/admin/session", {},
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
                `http://195.248.240.222:8001/admin/session/${sessionId}`,
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
    async blockSession(req, res)  {
      try {
          const { block_status } = req.body
          const response = await axios.post(
              `http://195.248.240.222:8001/admin/session/${req.params.sessionId}`, { block_status },
              {
                  headers: {
                      'authorization': req.headers['authorization'],
                      service: "shid_news",
                      auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
                  }
              }
          );
          const result = await response.data;
          res.json(result);
      } catch (error) {
          res.json(error.response.data)
      }
  };
}

module.exports = new sessionController()

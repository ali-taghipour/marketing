// npm modules
const axios = require('axios');


class socialMediaController {
    // social-media
    async getSocialMedia(req, res) {
        try {
            const response = await axios.get(
                `http://195.248.240.222:8001/admin/social-media/my`,
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
          return  res.json(error.response.data)
        }
    };
    async setSocialMedia(req, res) {
        try {
            const {
                facebook,
                twitter,
                linkedIn,
                youtube,
                aparat,
                instagram,
                telegram
            } = req.body
            const data = { facebook, twitter, linkedIn, youtube, aparat, instagram, telegram }
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/social-media/my`, data,
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
    async getAllSocialMedia(req, res){
        try {
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/social-media/`, {},
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
    async getOneSocialMedia (req, res) {
        try {
            const response = await axios.get(
                `http://195.248.240.222:8001/admin/social-media/${req.params.socialId}`,
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
    async updateSocialMedia (req, res) {
        try {
            const {
                facebook,
                twitter,
                linkedIn,
                youtube,
                aparat,
                instagram,
                telegram
            } = req.body
            const data = { facebook, twitter, linkedIn, youtube, aparat, instagram, telegram }
            const response = await axios.post(
                `http://195.248.240.222:8001/admin/social-media/${req.params.socialId}`, data ,
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

module.exports = new socialMediaController()

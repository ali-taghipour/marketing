// npm modules
const axios = require("axios");

class addressController {
  // addresses
  async getAddresses(req, res) {
    try {
      const response = await axios.get(
        `http://195.248.240.222:8001/admin/address/my`,
        {
          headers: {
            authorization: req.headers["authorization"],
            service: "shid_news",
            auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
          },
        }
      );
      const result = await response.data;
      return res.json(result);
    } catch (error) {
      return res.json(error.response.data);
    }
  }
  async setAddresess(req, res) {
    try {
      const {
        name,
        stat,
        city,
        neighborhood,
        street,
        alley,
        house_number,
        others,
      } = req.body;
      const data = {
        name,
        stat,
        city,
        neighborhood,
        street,
        alley,
        house_number,
        others,
      };
      const response = await axios.post(
        `http://195.248.240.222:8001/admin/address`,
        data,
        {
          headers: {
            authorization: req.headers["authorization"],
            service: "shid_news",
            auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
          },
        }
      );
      const result = await response.data;
      return res.json(result);
    } catch (error) {
      return res.json(error.response.data);
    }
  }
  async updateAddresses(req, res) {
    try {
      const {
        name,
        stat,
        city,
        neighborhood,
        street,
        alley,
        house_number,
        others,
        addressId,
      } = req.body;
      const data = {
        name,
        stat,
        city,
        neighborhood,
        street,
        alley,
        house_number,
        others,
      };
      const response = await axios.post(
        `http://195.248.240.222:8001/admin/address/${addressId}`,
        data,
        {
          headers: {
            authorization: req.headers["authorization"],
            service: "shid_news",
            auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
          },
        }
      );
      const result = await response.data;
      return res.json(result);
    } catch (error) {
      return res.json(error.response.data);
    }
  }
  async getAllAddress(req, res) {
    try {
      const response = await axios.post(
        `http://195.248.240.222:8001/admin/address/`,
        { ...req.body },
        {
          headers: {
            authorization: req.headers["authorization"],
            service: "shid_news",
            auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
          },
        }
      );
      const result = await response.data;
      return res.json(result);
    } catch (error) {
      return res.json(error.response.data);
    }
  }
  async getOneAddress(req, res) {
    try {
      const response = await axios.get(
        `http://195.248.240.222:8001/admin/address/${req.params.addressId}`,
        {
          headers: {
            authorization: req.headers["authorization"],
            service: "shid_news",
            auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
          },
        }
      );
      const result = await response.data;
      return res.json(result);
    } catch (error) {
      return res.json(error.response.data);
    }
  }
}

module.exports = new addressController();

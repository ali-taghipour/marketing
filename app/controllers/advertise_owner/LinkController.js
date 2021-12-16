// npm mudoles
const { v4: uuidv4 } = require('uuid');
const randomNumber = require('number-random');

// models
const Link = require('../../models/index').Link;
const Advertiser = require('../../models/index').AdvertiseOwner;
class LinkController {
    async index(req, res) {
        try {
            const allLinks = await Link.findAll({ where: { advertiseOwnerId: req.user.id } })
            return res.json({
                success: true,
                message: "fetch all links",
                data: allLinks
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "we cant fetch all links"
            })
        }
    }
    async single(req, res) {
        try {
            const { linkId } = req.params;
            const link = await Link.findOne({ where: { advertiseOwnerId: req.user.id, id: linkId } })
            return res.json({
                success: true,
                message: `fetch link => ${link.title}`,
                data: link
            })
        } catch (error) {
            return res.json({
                success: false,
                message: "link id is not true"
            })
        }
    }
    async create(req, res) {
        try {
            const advertiser = await Advertiser.findOne({ where: { id: req.user.id } })
            if (!advertiser) {
                res.status(400);
                return res.json({
                    success: false,
                    message: "cant find this user"
                })
            }
            const { name, description, link } = req.body;
            const linkData = { description, link, name, id: uuidv4(), advertiseOwnerId: req.user.id };
            const newlink = await Link.create(linkData);
            return res.json({
                success: true,
                message: `create link => ${newlink.title}`,
                data: newlink
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "we cant create link"
            })
        }
    }
    async update(req, res) {
        try {
            const { linkId } = req.params;
            const prevLink = await Link.findOne({ where: { advertiseOwnerId: req.user.id, id: linkId } })
            if (!prevLink) {
                res.status(400);
                return res.json({
                    success: false,
                    message: "cant find this link"
                })
            }
            const { name, description, link } = req.body;
            const linkData = { name, description, link };
            const updatedlink = await Link.update(linkData, { where: { id: prevLink.id } });
            return res.json({
                success: true,
                message: `update link`,
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "we cant update link"
            })
        }
    }
    async delete(req, res) {
        try {
            const { linkId } = req.params;
            const prevLink = await Link.findOne({ where: { advertiseOwnerId: req.user.id, id: linkId } })
            if (!prevLink) {
                res.status(400);
                return res.json({
                    success: false,
                    message: "cant find this link"
                })
            }
            const removeLink = await Link.destroy({ where: { id: prevLink.id, } })
            return res.json({
                success: true,
                message: `delete link`,
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "we cant delete link"
            })
        }
    }
}
module.exports = new LinkController();
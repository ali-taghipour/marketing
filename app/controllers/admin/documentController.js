// moduels
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// models
const Document = require('../../models/index').Document;
class documentController {
    async index(req, res) {
        try {
            const document = await Document.findOne({ where: { userId: req.user.id } });
            if (document == null) {
                res.status(400);
                return res.json({
                    success: false,
                    message: "you dont have document plesae sned documents"
                })
            }
            return res.json({
                success: true,
                message: "",
                data: document
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "we have error cant find document"
            })
        }
    }
    async create(req, res) {
        try {
            const filePath = `${req.file.destination}/${req.file.filename}`;
            const findDocumnet = await Document.findOne({ where: { userId: req.user.id } })
            if (findDocumnet !== null) {
                // remove sended documents 
                const removeDocument = fs.unlinkSync(path.resolve(filePath))
                res.status(400);
                return res.json({
                    success: false,
                    message: "you have documnet in api"
                })
            }
            const documentData = {
                id: uuidv4(), userId: req.user.id, role: "Admin", name: req.user.username, filePath, isVerified: false, verificationMessage: ""
            }
            const newDocument = await Document.create(documentData);
            return res.json({
                success: true,
                message: "document sended and needs to verification by admin"
            })
        } catch (error) {
            console.log(error);
            res.status(400);
            return res.json({
                success: false,
                message: "we have error cant add document"
            })
        }
    }
    async fetchAllDocument(req, res) {
        try {
            const document = await Document.findAll();
            if (document == null) {
                res.status(400);
                return res.json({
                    success: false,
                    message: "dont have document in service"
                })
            }
            return res.json({
                success: true,
                message: "",
                data: document
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "we have error and cant find document"
            })
        }
    }
    async fetchSingleDocument(req, res) {
        try {
            const userId = req.params.userId;
            const document = await Document.findOne({ where: { userId } });
            if (document == null) {
                res.status(400);
                return res.json({
                    success: false,
                    message: "dont have users document in service"
                })
            }
            return res.json({
                success: true,
                message: "",
                data: document
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "we have error and cant find document"
            })
        }
    }
    async updateSingleDocument(req, res) {
        try {
            const userId = req.params.userId;
            const { isVerified, verificationMessage } = req.body;
            const document = await Document.update({ isVerified, verificationMessage }, { where: { userId } });
            if (document[0] == 0) {
                res.status(404);
                return res.json({
                    success: false,
                    message: "dont have users document in service"
                })
            }
            return res.json({
                success: true,
                message: "document updated",
                data: []
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "we have error and cant find document"
            })
        }
    }
}

module.exports = new documentController();
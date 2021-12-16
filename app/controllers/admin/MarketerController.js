// npm module
const { v4: uuidv4 } = require('uuid');
// models
const Marketer = require('../../models/index').Marketer;
const MarketerLevel = require('../../models/index').MarketerLevel;

class MarketerController {
    async index(req, res) {
        const data = await Marketer.findAll();
        return res.json({
            success: true,
            message: "fetched all marketer",
            data
        })
    }
    async show(req, res) {
        const { marketerId } = req.params;
        const data = await Marketer.findOne({ where: { id: marketerId } });
        return res.json({
            success: true,
            message: "fetched single marketer",
            data
        })
    }
    async updateMarketerSocialMedia(req, res) {
        try {
            const {
                socailMedia,
            } = req.body;
            const { marketerId } = req.params;
            const marketer = await Marketer.update({ isSocialMediaVerified: socailMedia }, { where: { id: marketerId } })
            if(marketer[0] == 0){
                res.status(404);
                return res.json({
                    success : false ,
                    message : "cant find marketer"
                })
            }
            return res.json({
                success: true,
                message: "marketer social media updated",
            });
        } catch (error) {
            console.log(error);
            res.status(500);
            return res.json({
                success: false,
                message: "we cant update socail media"
            })
        }
    }
    async setLevel(req, res) {
        try {
            const { marketer_level_id } = req.body;
            const { marketerId } = req.params;
            if (!marketerId) {
                res.status(400);
                throw new Error('ایدی بازاریاب را ارسال کنید')
            }
            // fetch marketer id and validation
            const marketerLevel = await MarketerLevel.findOne({ where: { id: marketer_level_id } })
            const setLevelMarketer = await Marketer.update({ marketerLevelId: marketer_level_id }, { where: { id: marketerId } })

            return res.json({
                success: true,
                message: "marketer level changed",
                data: []
            })
        } catch (error) {
            res.status(400)
            return res.json({ success: false, message: "marketer level id or marketer id is inncorect" })
        }
    }
    async getAllLevel(req,res){
        console.log("adsads")
        const data = await MarketerLevel.findAll({});
        return res.json({
            success: true,
            message: "fetched all marketer level id",
            data
        })
    }
    async createLevel(req, res) {
        try {
            const { title } = req.body;
            const id = await uuidv4();
            const newMarketerLevel = await MarketerLevel.create({
                title, id
            })
            return res.json({
                message: 'marketer level created',
                success: true,
                data: []
            })
        } catch (error) {
            res.status(400);
            return res.json({
                success: false,
                message: "we cant create the level"
            })
        }
    }
    async ban(req, res) {
        const { marketerId } = req.params;
        try {
            if (!marketerId) {
                res.status(400);
                throw new Error('we cant find the marketer id');
            }
            const marketer = await Marketer.update({
                isBanned: true
            }, { where: { id: marketerId } })
            return res.json({
                success: true,
                message: "update the marketer to baned",
                data: []
            })
        } catch (error) {
            res.status(404);
            return res.json({
                success: false,
                message: "cant find the marketer or marketer id is fail"
            })
        }
    }
    async unban(req, res) {
        const { marketerId } = req.params;
        try {
            if (!marketerId) {
                res.status(400);
                throw new Error('we cant find the marketer id');
            }
            const marketer = await Marketer.update({
                isBanned: true
            }, { where: { id: marketerId } })
            return res.json({
                success: true,
                message: "update the marketer to unbaned",
                data: []
            })
        } catch (error) {
            res.status(404);
            return res.json({
                success: false,
                message: "cant find the marketer or marketer id is fail"
            })
        }
    }
}

module.exports = new MarketerController();
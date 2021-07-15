const TINY = require('../model/index')

exports.get_content = async (req, res) => {
    try {
        const id = req.params.tinyId;
        const content = await TINY.findById(id)
        res.status(200).send({
            message: 'GET SUCCESS',
            content
        })
    } catch (error) {
        res.send({error})
    }
}
exports.get_all_content = async (req, res) => {
    try {
        const listData = await TINY.find({})
        res.send({
            message: "GET_SUCCESS",
            content: listData
        })
    } catch (error) {
        res.send({error})
    }
}
exports.create_a_content = async (req, res) => {
    try {
        const data = req.body;
        const newTiny = new TINY(data)
        const saveTiny = await newTiny.save()
        res.status(200).send({
            message: 'SAVING SUCCESS',
            saveTiny
        })
    } catch (error) {
        res.send({error})
    }
}
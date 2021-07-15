module.exports = (app) => {
    const tinyController = require('../controller/index')
    app.route('/tinyEditor')
        .get(tinyController.get_all_content)
        .post(tinyController.create_a_content)
    app.route('/tinyEditor/:tinyId')
        .get(tinyController.get_content)
}
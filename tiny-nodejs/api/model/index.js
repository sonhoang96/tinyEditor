var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var newTiny = new Schema({
    content: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('tiny', newTiny)
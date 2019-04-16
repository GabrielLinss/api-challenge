const mongoose = require('../../database');

const ToolSchema = new mongoose.Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    description: {type: String, required: true},
    tags: [{type: String}],
    createdAt: {type: Date, default: Date.now}
});

const Tool = mongoose.model('Tool', ToolSchema);

module.exports = Tool;

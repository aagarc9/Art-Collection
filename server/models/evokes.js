const { Schema, model } = require('mongoose');

const evokeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
    },
});

const Evoke = model('Evoke', evokeSchema);

module.exports = Evoke;
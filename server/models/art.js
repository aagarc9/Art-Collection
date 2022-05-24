const { Schema, model } = require('mongoose');

const artSchema = new Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
    },

    image: {
        type: String
    },

    likesCount: {
        type: Number,
        min: 0
    },

    viewsCount: {
        type: Number,
        min: 0
    },

    evokesCount: {
        type: Number,
        min: 0
    },

    description: {
        type: String,
    },
});

const Art = model('Art', artSchema);

module.exports = Art;
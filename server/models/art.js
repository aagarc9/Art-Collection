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

    description: {
        type: String,
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    submittedAt: {
        type: Date,
        default: Date.now
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

    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
});

const Art = model('Art', artSchema);

module.exports = Art;
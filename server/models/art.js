const { Schema, model } = require('mongoose');

const artSchema = new Schema({
    artId: {
        type: String,
        required: true,
    },
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

    evokeFunnyCount: {
        type: Number,
        min: 0
    },

    evokeBeautifulCount: {
        type: Number,
        min: 0
    },

    evokeSadCount: {
        type: Number,
        min: 0
    },

    evokeWholesomeCount: {
        type: Number,
        min: 0
    },

    evokeMysteriousCount: {
        type: Number,
        min: 0
    },

    evokeThoughtfulCount: {
        type: Number,
        min: 0
    },

    evokeInspiringCount: {
        type: Number,
        min: 0
    },

    evokeCalmingCount: {
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
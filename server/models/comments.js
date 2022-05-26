const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    comment: {
        type: String
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
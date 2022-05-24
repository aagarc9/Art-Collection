const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    comment: {
        type: String
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
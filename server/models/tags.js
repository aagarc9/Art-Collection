const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
    },
});

const Tag = model('Tag', tagSchema);

module.export = Tag;
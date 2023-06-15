const { Schema, model } = require('mongoose');
const reactionschema = require('./Reaction');
const thoughtSchema = new Schema(
    {
        thoughtText:
        {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionschema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
thoughtSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleDateString();
});
// Define a virtual property 'friendCount' to retrieve the length of the user's friends array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('thought', thoughtSchema);
module.exports = Thought;
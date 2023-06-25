const { Schema, model } = require('mongoose');
const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)


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
        reactions: [reactionSchema]
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
thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
const { Schema, model, ObjectId } = require('mongoose');

const reactionSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        reactions: {
            type: String,
            required: true,
            maxlength: 280,
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
            createdAt: {
                type: Date,
                default: Date.now,
                timestamp: true,
                get: (date) => {
                    date.toISOString().split("T") [0];
                },
        },       
    },
);

const reactions = model('reaction', reactionSchema);

module.exports = reactionSchema;
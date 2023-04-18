const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { Thought } = require('.');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [
            {
                type: String,
                required: true,
            },
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

userSchema.virtuals('reactionCount').get(function(){
    return this.reactions.length
});

const thoughts = model('thought', thoughtSchema);

module.exports = Thought;
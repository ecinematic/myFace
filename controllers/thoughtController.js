const { Thought, User } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThoughtById(req, res) {
        try {
            const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID'});
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
          const thoughts = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thoughts._id } },
            { new: true }
          );
          res.json(thoughts);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      async deleteThoughtById(req, res) {
        try {
          const thoughts = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thoughts) {
            res.status(404).json({ message: 'No thoughts with that ID' });
          };
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async updateThoughtById(req, res) {
        try {
          const thoughts = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thoughts) {
            res.status(404).json({ message: 'No thoughts with this id!' });
          }
    
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async createReaction(req, res) {
        try {
          const reactions = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body} },
            { runValidators: true, new: true }
          );
          res.json(reactions);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      async deleteReactionById(req, res) {
        console.log(req.params.thoughtId);
        console.log(req.params.reactionId);
        try {
          const reactions = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: {reactionId: req.params.reactionId}} },
            { runValidators: true, new: true }
            );
            
          if (!reactions) {
            res.status(404).json({ message: 'No reaction with that ID' });
          };
          res.json(reactions);
        } catch (err) {
          res.status(500).json(err);
        }
      }
}
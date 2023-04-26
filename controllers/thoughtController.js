const { Thought } = require('../models');

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

            res.jsonz(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
          const thoughts = await Thought.create(req.body);
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
}
const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    async getSingleUserById(req, res) {
        try {
            const users = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!users) {
                return res.status(404).json({ message: 'No user with that ID'});
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
          const users = await User.create(req.body);
          res.json(users);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      async deleteUserById(req, res) {
        try {
          const users = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!users) {
            res.status(404).json({ message: 'No users with that ID' });
          };
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async updateUserById(req, res) {
        try {
          const users = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: req.body },
            { runValidators: true, new: true }
          );
    
          if (!users) {
            res.status(404).json({ message: 'No users with this id!' });
          }
    
          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async addFriend (req, res) {
        try {
          const users = await User.findOneAndUpdate({_id: req.params.userId }, 
            { $addToSet: {friends: req.params.userId}},
            { new: true}
            );
          res.json(users);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      async removeFriend(req, res) {
        try {
          const users = await User.findOneAndUpdate({ _id: req.params.userId },
            {$pull: {friends: req.params.friendId}},
            {new: true});
    
          if (!users) {
            res.status(404).json({ message: 'No friend with that ID' });
          };
        } catch (err) {
          res.status(500).json(err);
        }
      },
}
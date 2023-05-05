const router = require('express').Router();

const {
    getAllUsers,
    getSingleUserById,
    createUser,
    deleteUserById,
    updateUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:userId').get(getSingleUserById).put(updateUserById).delete(deleteUserById);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
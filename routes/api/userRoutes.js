const router = require('express').Router();

const {
    getAllUsers,
    getSingleUserById,
    createUser,
    deleteUserById,
    updateUserById,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUserById).put(updateUserById).delete(deleteUserById);

module.exports = router;
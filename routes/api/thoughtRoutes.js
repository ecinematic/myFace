const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThoughtById,
    createThought,
    deleteThoughtById,
    updateThoughtById,
    createReaction,
    deleteReactionById
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThoughtById).put(updateThoughtById).delete(deleteThoughtById);

router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionById);

module.exports = router;
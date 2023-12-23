const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// for each route:
// try {

// } catch (err) {
//     res.status(500).json({ status: 'error', payload: err.message })
// }

// get all comments (why?)
router.get('/', async (req, res) => {
    try {
        const payload = await Comment.findAll(
            {
                include: [
                    { model: User }
                ]
            }
        );
        res.status(200).json(payload)
    } catch (err) {
        res.status(500).json(err.message)
    }
});

// get individual comment
router.get('/', async (req, res) => {
    try {
        const payload = Comment.findByPk(
            req.params.id,
            {
                include: [
                    { model: User }
                ]
            }
        );
        res.status(200).json(payload)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// post a comment
router.post('/', async (req, res) => {
    try {
        const payload = await Comment.create(
            {
                ...req.body, //do i need the spread operator somewhere i forgot? check later
                user_id: req.session.user_id,
            }
        );
        res.status(200).json(payload)
    } catch (err) {
        res.status(500).json(err.message)
    }
});

// update a comment
router.put('/:id', async (req, res) => {
    try {
        const payload = await Comment.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            });

        res.status(200).json(payload);
    } catch (err) {
        res.status(500).json(err.message)
    }
});

// delete a comment
router.put('/:id', async (req, res) => {
    try {
        const payload = await Comment.destroy(
            {
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({ message: 'comment deleted' })
    } catch (err) {
        res.status(500).json(err.message)
    }
});

module.exports = router;

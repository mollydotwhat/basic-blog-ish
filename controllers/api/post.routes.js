const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

//all posts
router.get('/', async (req, res) => {
    try {
        const payload = await Post.findAll();
        res.status(200).json({ status: 'success', payload })
    } catch (err) {
        res.status(500).json({ status: 'error', payload: err.message })
    }
});

// get individual post
router.get('/:id', async (req, res) => {
    try {
        const payload = await Post.findByPk(
            req.params.id,
            // {
                // includes or more model defs?
            // }
        );
        res.status(200).json({status: 'success', payload})
    } catch (err) {
        res.status(500).json({ status: 'error', payload: err.message })
    }
});

// POST new post
router.post('/', async (req, res) => {
    try {

    } catch (err) {

    }
});

// PUT update post
router.put('/:id', async (req, res) => {
    try {

    } catch (err) {

    }
})


// DELETE remove post
router.delete('/:id', async (req, res) => {
    try {

    } catch (err) {
        
    }
})



module.exports = router;
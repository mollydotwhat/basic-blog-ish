const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res)=> {
    try {
        const payload = Post.findAll(

        )
    } catch (err){

    }
})

module.exports = router;
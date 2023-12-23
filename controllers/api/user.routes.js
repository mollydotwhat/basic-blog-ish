const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// for each route:
// try {

// } catch (err) {
//     res.status(500).json({ status: 'error', payload: err.message })
// }


//all users
router.get('/', async (req, res) => {
    try {
        const payload = await User.findAll({
            include: [
                { model: Post },
                { model: Comment }
            ]
        });
        res.status(200).json({ status: 'success', payload })
    } catch (err) {
        res.status(500).json({ status: 'error', payload: err.message })
    }
});

// get individual user
router.get('/:id', async (req, res) => {
    try {
        const payload = await User.findByPk(
            req.params.id
        );
        res.status(200).json({ status: 'success', payload })
    } catch (err) {
        res.status(500).json({ status: 'error', payload: err.message })
    }
});

// POST new user
router.post('/', async (req, res) => {
    try {
        const payload = await User.create(
            req.body
        );
        // logs in user after creation. if i got it right.
        req.session.save(() => {
            req.session.user_id = payload.id;
            req.session.logged_in = true;
            res.status(200).json({ status: 'success', payload });
        })
        res.status(200).json({ status: 'success', payload })
    } catch (err) {
        res.status(500).json({ status: 'error', payload: err.message })
    }
});

// log in user
router.post('/login', async (req, res) => {
    try {
        const payload = await User.findOne(
            {
                where:
                    { username: req.body.username }
            });
        // if username does not exist send error message (your username or password is incorrect)
        if (!payload) {
            res.status(400).json({message: 'This username or password is incorrect.'});
            return;
        }
        // validate password
        const correctPass = await payload.checkPassword(req.body.password);
        // if !correctPass send error message (your username or password is incorrect)
        if (!correctPass) {
            res.status(400).json({message: 'This username or password is incorrect.'});
            return;
        }

        // THEN use session to log in user
        // if login breaks CHECK HERE FIRST. should be basically the same as the create user session bit?
        req.session.save(() => {
            req.session.user_id = payload.id;
            req.session.logged_in = true;
            res.json({ user: payload, message: 'You are now logged in!' });
          });
        res.status(200).json({ status: 'success', payload })
    } catch (err) {
        res.status(500).json({ status: 'error', payload: err.message })
    }
});

router.post('/logout', async (req, res) => {
    // need to use session stuff here
    // SHOULD be simple bc just destroying current session, not database stuff
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
          });
    } else {
        console.log(err.message)
    }

})

// PUT update User
// router.put('/:id', async (req, res) => {
//     try {

//     } catch (err) {
//         res.status(500).json({ status: 'error', payload: err.message })
//     }
// })


// DELETE remove user
router.delete('/:id', async (req, res) => {
    try {
        const payload = await User.destroy({
            where: {
                id: req.params.id
              }
        });
        res.status(200).json({message: 'user deleted'})
    } catch (err) {
        res.status(500).json({ status: 'error', payload: err.message })
    }
})




module.exports = router;
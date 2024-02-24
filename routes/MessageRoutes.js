const express = require('express');
const router = express.Router();
const MessageSchema = require('../models/Message');

router.get('/messages', async (req, res) => {
    let messages = await MessageSchema.findOne().populate({
        path: 'from',
        select: '-password'
    })
        .populate({
            path: 'to',
            elect: '-password'
        })
    res.json(messages)
})

router.post('/message', async (req, res) => {
    let user = MessageSchema({
        body: req.body.body,
        from: req.body.from,
        to: req.body.to
    })

    user.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send({ "status": "error", "message": err.message })
    })
})

module.exports = router;
module.exports = app =>{
    const comments = require("../controller/comment.controller");

    const router = require("express").Router();

    // create a new tutorial
    router.post("/", comments.create_comment);    
    app.use('/api/comment', router);
};
const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.create_comment = (req, res)=>{
    if(!req.body) return res.status(400).json({message: "Content cannot be empty"});

    // create
    const comment = {
        name: req.body.name,
        text: req.body.text,
        tutorialId:req.body.tutorialId
    }
    // save
    Comment.create(comment)
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(500).json({message: err.message || "Something went wrong"}));
}
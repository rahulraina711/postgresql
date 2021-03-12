const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
    if(!req.body.title) return res.status(400).json({message: "Content cannot be empty"});

    // create
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }
    // save
    Tutorial.create(tutorial)
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(500).json({message: err.message || "Something went wrong"}));
}
exports.findAll = (req, res)=>{
    const title = req.query.title;
    let condition = title ? {title: {[Op.iLike]:`%${title}%`}}: null;

    Tutorial.findAll({where : condition})
    .then(data=>res.status(201).json(data))
    .catch(err=>res.status(501).json({message: err.message||"Error retrieving tutorials"}));
}
exports.findOne = (req, res)=>{
    const id = req.params.id;

    Tutorial.findByPk(id).then(data=>res.status(201).json(data)).catch(err=>res.status(501).json({message: err.message||"Error retrieving tutorial"}));
}
exports.update = (req, res)=>{
    const id = req.params.id;

    Tutorial.update(req.body,{where:{id:id}})
    .then(num=>{
        if(num==1){
            res.status(201).json({message:"Updated successfully"})
        }
        else{
            res.status(400).json({message:`Cannot update @ id: ${id}`})
        }
    })
    .catch(err=>res.status(501).json({message:err.message || "error updating Tutorial wit id: "+id}));
}
exports.delete = (req, res)=>{
    const id = req.params.id;

    Tutorial.destroy({
        where: {id:id}
    })
    .then(num=>{
        if(num==1){
            res.status(201).json({message:"Updated successfully"})
        }
        else{
            res.status(400).json({message:`Cannot update @ id: ${id}`})
        }
    })
    .catch(err=>res.status(501).json({message:err.message || "error deleting Tutorial wit id: "+id}));
}
exports.deleteAll = (req, res)=>{
    Tutorial.destroy({where:{}, truncate: false})
    .then(nums=>res.status(201).json({message:`${nums} tutorials deleted successfully`}))
    .catch(err=>res.status(500).json({message: err.message || "an error occured while deleting all the tutorials"}));
}
exports.findAllPublished = (req, res)=>{
    Tutorial.findAll({where : {published:true}})
    .then(data=>res.status(201).json(data))
    .catch(err=>res.status(501).json({message: err.message||"Error retrieving tutorials"}));
}
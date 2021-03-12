module.exports = app =>{
    const tutorials = require("../controller/tutorial.controller");

    const router = require("express").Router();

    // create a new tutorial
    router.post("/", tutorials.create);

    // Retrieve all tutorial
    router.get("/", tutorials.findAll);

    // retrieve all published
    router.get('/published', tutorials.findAllPublished);

    // retrieve by id
    router.get('/:id', tutorials.findOne);

    // update tutorial
    router.put('/:id', tutorials.update);

    // delete with id
    router.delete('/:id', tutorials.delete);

    // delete all
    router.delete('/', tutorials.deleteAll);

    app.use('/api', router);
};
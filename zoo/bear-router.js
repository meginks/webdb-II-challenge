const router = require('express').Router(); 
const knex = require('knex'); 

const knexConfig = {
    client: 'sqlite3', 
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
}

const db = knex(knexConfig); 

// HELPER FUNCTIONS 

function targetById(id) {
    return db('bears')
    .where({
        id: Number(id)
    })
}

// GET BEARS 

router.get('/', (req, res) => {
    db('bears') 
    .then(bears => {
        res.status(200)
        .json(bears);
    })
    .catch (error => {
        res.status(500)
        .json(error)
    })
})


// GET BEARS BY ID

router.get('/:id', (req, res) => {
    targetById(req.params.id)
    .then(bear => {
        res.status(200)
        .json(bear)
    })
    .catch(error => {
        res.status(500)
        .json(error)
    })
})


// POST BEARS 

router.post('/', (req, res) => {
    db('bears')
    .insert(req.body)
    .then(ids => {
        const [id] = ids 
        db('bears')
        .where({id})
        .first()
        .then(bear => {
            res.status(200)
            .json(bear)
        })
    })
    .catch(error => {
        res.status(500)
        .json(error)
    })
})


// DELETE BEARS 

router.delete('/:id', (req, res) => {
    targetById(req.params.id).del()
    .then(count => {
        if (count > 0) {
            return res.status(204).json({message: 'Deleted!'})
        } else end();
    })
    .catch(error => {
        res.status(500)
        .json(error)
    })
})


// UPDATE BEARS 

router.put('/:id', (req, res) => {
    db('bears')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
        if (count>0) {
        db('bears')
        .where({id: req.params.id})
        .first()
        .then(bear => { 
        res.status(200)
        .json(bear) }) } 
        else {
            res.status(404)
            .json({ error: `Couldn't find it so I couldn't update it.`})
        }})
    .catch(error => 
        res.status(500)
        .json(error))
})


module.exports = router; 
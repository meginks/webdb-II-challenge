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
    return db('zoos')
    .where({
        id: Number(id)
    })
}

function update(id, item) {
    targetById(id)
    .update(item)
} 


// POST  to zoos 

router.post('/', (req, res) => {
    db('zoos')
    .insert(req.body)
    .then(ids => {
        const [id] = ids 
        db('zoos')
        .where({id})
        .first()
        .then(zoo => {
            res.status(200)
            .json(zoo)
        })
    })
    .catch(error => {
        res.status(500)
        .json(error)
    })
})


// GET from zoos 

router.get('/', (req, res) => {
    db('zoos') 
    .then(zoos => {
        res.status(200)
        .json(zoos);
    })
    .catch (error => {
        res.status(500)
        .json(error)
    })
})

// GET BY ID from zoos

router.get('/:id', (req, res) => {
    targetById(req.params.id)
    .then(zoo => {
        res.status(200)
        .json(zoo)
    })
    .catch(error => {
        res.status(500)
        .json(error)
    })
})

// DELETE from zoos 
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

// PUT to zoos 

router.put('/:id', (req, res) => {
    db('zoos').update(req.params.id, req.body)
    .then(count => {
        if (count>0) {
            res.status(200)
            .json(count)
        } 
    })
    .catch(error => 
        res.status(500)
        .json(error))
})



module.exports = router; 
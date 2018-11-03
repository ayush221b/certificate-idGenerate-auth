const getid = (req, res, db) => {
	db.select('serial').from('participant')
	  .where('serial','=',req.body.serial)
	.then(data=> {
        return db.select('*').from('participant')
            .where('serial','=',req.body.serial)
            .then(participant=> {
            res.json(participant[0].name)
            })
            .catch(err=> res.status(400).json(`Error unable to get participant ${err}`))
	})
	.catch(err=> res.status(400).json('Wrong Request'))
}

module.exports = {
	getid:getid
}
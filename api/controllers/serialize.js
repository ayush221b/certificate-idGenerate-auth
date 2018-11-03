const serialize = (req,res,db) => {
    const {name, email} = req.body;
    const serial = `WHHC-${Math.random().toString(36).slice(2)}`
	if(!email || !name ) {
		return res.status(400).json('No fields can be empty')
	}
		db.transaction(trx=> {
			trx.insert({
				name: name,
                email: email,
                serial: serial
			})
            .into('participant')
            .returning('*')
            .then(participant=>{
				res.json(participant[0]);
				})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		
		.catch(err => res.status(400).json(`unable to register ${err}`))
}

module.exports={
	serialize:serialize
};
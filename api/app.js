const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const serialize = require('./controllers/serialize');
const getid = require('./controllers/getid');

const db= knex({
	client: 'pg',
  	connection: {
	    connectionString : process.env.DATABASE_URL,
	    ssl: true
	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
	res.json('it is working!')
})

app.post('/serialize', (req,res)=> {serialize.serialize(req,res,db)})

app.post('/getid', (req,res)=> {getid.getid(req,res,db)})

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`Up and running on port ${process.env.PORT}`)
});
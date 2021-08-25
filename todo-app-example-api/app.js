const Express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = process.env.MONGO_URL;
const db_name = process.env.MONGO_DATABASE_NAME;

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(cors());
var database, collection;


app.listen(5000,()=>{
    MongoClient.connect(url, { useNewUrlParser: true},(error,client)=>{
        if(error){
            throw error;
        }
        database = client.db(db_name);
        collection = database.collection(process.env.MONGO_COLLECTION_NAME);
        console.log(`Connected to ${db_name}!`);
    })
})
//Routes


//Get All Todo Tasks via 'GET' Method
app.get('/todos',(req,res)=>{
    collection.find().toArray((err,result)=>{
        if(err){
            return res.status(500).send(err)
        }
        res.status(200).json(result);
    })
})


//Add New Task via 'POST' Method
app.post('/todos',(req,res)=>{
    let newTodo = {
        "_id": new ObjectId(),
        "title": `${req.body.title}`,
        "note": `${req.body.note}`,
        "done": false
    };
    collection.insertOne(newTodo,(err,result)=>{
        if(err){
            return res.status(500).send(err);
        }
        res.status(200).send("succeeded")
    })

})
//Delete Task via 'DELETE' Method

app.delete('/todos/:_id',(req,res)=>{
    collection.deleteOne({"_id":ObjectId(`${req.params._id}`)},(err,result)=>{
        if(err){
            return res.status(500)
        }
        res.status(200).send('successfully deleted');
    })
})
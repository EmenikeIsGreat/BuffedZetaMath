// app.js

const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'zetamac';
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.argv[2] || 3000; // Use the provided port number or default to 3000

const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.harrkly.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', './');
app.set('view engine', 'ejs');
app.use(express.static('/'));
app.use(express.json());


app.get('/', async (req, res) => {
    res.render('loginPage', { highScore: 'My P-rbv3irebi3rnebouvni4rnbi3nee', message: 'Hello, World!' });
})
app.get('/start', async (req, res) => {
    console.log(req.query)
    console.log("-------")
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('users');
      // Fetch the top high scores
      const topHighScores = await collection.find().sort({ highScore: -1 }).limit(10).toArray();
      const user = await collection.findOne({username:req.query.username})
      res.render("start", { topHighScores: topHighScores,username:user.username,highScore:user.highScore});
    } finally {
      await client.close();
    }
  });

app.get('/game', async (req, res) => {
    console.log(req.query)
    console.log("chickennnnnnnnn")
    try{
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({username:req.query.username})
        res.render("game",{username:user.username,highScore:user.highScore})
        
    }
    finally{
        return
    }
    
});

app.post('/updateScore', async (req, res) => {
    const {username,score} = req.body
    
    console.log("yooooowovnjoe")
    console.log(req.body)
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('users');
      const user = await collection.findOne({ username });
      if (user) {
        if (user.highScore < score) {
          await collection.updateOne(
            { username: user.username },
            { $set: { highScore: score } }
          );
        }
      }
      res.send("done")
    } finally {
      await client.close();
    }
});



// Login route
// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('users');
      const user = await collection.findOne({ username });
      console.log(user,password)
  
      if (user) {
        if (user.password === password) {
            res.send(true)
        } else {
          res.status(401).send('Incorrect password');
        }
      } else {
        res.status(404).send('User not found');
      }
    } finally {
      await client.close();
    }
  });
  
  // Sign up route
  app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('users');
      const existingUser = await collection.findOne({ username });
  
      if (existingUser) {
        res.status(409).send('Username already exists');
      } else {
        let highScore = 0;
        await collection.insertOne({ username, password, highScore });
          }
    } finally {
      await client.close();
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  
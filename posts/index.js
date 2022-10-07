const express = require ('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();

const posts = {};
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

//generate random ID, store with body of post
app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  //get access to the title; destructuring!
  const { title } = req.body;
  //add new id and title to posts object
  posts[id] = {
    id, title
  }
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Post Serv listening on 4000")
});
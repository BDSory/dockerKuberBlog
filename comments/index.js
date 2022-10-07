const express = require('express');
const bodyParser= require('body-parser');
const {randomBytes} = require('crypto');

const app = express();
app.use(bodyParser.json());

//an object of arrays that contain all the comments for a post.
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  //pull out content property provided by user on req object
  const { content } = req.body;
  //an array containing objects with postId and content
  //think of next line like a check...does the obj already contain
  //all those comments? yes: load 'em up into comments array, no?: then comments is empty
  const comments = commentsByPostId[req.params.id] || [];
  //now push this one from req onto the end
  comments.push({id: commentId, content});
  //comments is complete; so key is postId/value is array of all comments for that post
  //and that array contains objects that have a commentId and some content
  commentsByPostId[req.params.id] = comments; 

  res.status(201).send(comments)
})

app.listen(4001, () => {
  console.log("Comments Serv listening on 4001...")
})


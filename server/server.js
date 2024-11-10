require('dotenv').config()
const express = require('express')
const FileDB = require('./fileDB')
const path = require('path')
const fileDB = require('./fileDB')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'../dist/build')))

const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

fileDB.registerSchema('newspost', newspostSchema);

const newsPostTable = fileDB.getTable('newspost')

app.get('/api/newsposts', (req, res) => {
  try {
    const posts = newsPostTable.getAll();
    res.status(200).json(posts);
  } catch (e) {
    console.error('Error fetching posts:', e);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/newsposts/:id', (req,res)=>{
  try {
    const post = newsPostTable.getById(parseInt(req.params.id))
    if(!post){
      return res.status(500).json({error : 'There is no posts with such id'})
    }
    res.status(200).json(post)
  }
  catch (e){
    res.status(500).json({error:'Failed to fetch post'})
  }
})

app.post('/api/newsposts', (req,res)=>{
  try{
    const newPost = newsPostTable.create(req.body)
    res.status(200).json(newPost)
  }
  catch(e){
    res.status(500).json({error:"Failed to create a new post", message: e.message})
  }
})

app.put('/api/newsposts/:id', (req, res) => {
  try {
    console.log(req.body, req.params.id);
    
    const updatedPost = newsPostTable.update(parseInt(req.params.id), req.body)
    res.status(200).json(updatedPost)
  } catch (err) {
    if (err.message.includes('not found')) return res.status(404).json({ error: err.message })
    res.status(500).json({ error: 'Failed to update post' })
  }
})

app.delete('/api/newsposts/:id', (req,res)=>{
  try {
    const deletedPost = newsPostTable.delete(parseInt(req.params.id))
    res.status(200).send()
  } catch (err) {
    if (err.message.includes('not found')) return res.status(404).json({ error: err.message })
      res.status(500).json({ error: 'Failed to delete post' })
  }
})

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(PORT, ()=>{
  console.log(`http://${process.env.HOST}:${PORT}`);
  
})
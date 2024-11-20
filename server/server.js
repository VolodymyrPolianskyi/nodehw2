require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const newsRouter = require('./src/routes/news.routes')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'../dist/build')))



app.use('/api/newsposts', newsRouter)


app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(PORT, ()=>{
  console.log(`http://${process.env.HOST}:${PORT}`);
  
})
// npm run start 
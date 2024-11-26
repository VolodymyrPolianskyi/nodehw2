require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const newsRouter = require('./src/routes/news.routes')
const usersRouter = require('./src/routes/users.routes')
const authenticateToken = require('./src/middlewares/jwt.auth')
const fileDB = require('./src/DAL/schemas.dal')
const users = fileDB.getUserTable('users')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'../dist/build')))



app.use('/api/auth', usersRouter)
app.use('/api/newsposts', newsRouter)
app.get('/api/user', authenticateToken, (req, res) => {
  const email = req.user.email
  const user = users.getUserByEmail(email)
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }
  res.json({ email: user.email })
})

// app.get('*', (req,res)=>{
//   res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
// }) 

app.listen(PORT, ()=>{
  console.log(`http://${process.env.HOST}:${PORT}`);
  
})
// npm run start 
// jwt token logging in console, also u can get it in response
// to get user data using postman, add that token in bearer type of authorization
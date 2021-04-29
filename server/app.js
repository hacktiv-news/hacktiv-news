require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000 //Buat di deploy di heroku butuh process.env.PORT
const cors = require('cors')
const routes = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)


app.listen(port, () => {
  console.log(`your server listening at http://localhost:${port}`)
})
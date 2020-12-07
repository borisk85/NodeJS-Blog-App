const { render } = require('ejs')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const dbURI =
  'mongodb+srv://borisk1:6KPehXrjdpRpNGRv@nodejs-crash-course.ymnua.mongodb.net/nodejs-crash-course?retryWrites=true&w=majority'
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err))

app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})

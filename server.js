const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

//const connection_url = 'mongodb+srv://db-admin:youfa100@cluster0.hnm4d.mongodb.net/tinderdb?retryWrites=true&w=majority'
//Connect to mongodb
mongoose.connect('mongodb+srv://db-admin:youfa100@cluster0.hnm4d.mongodb.net/tinderdb?retryWrites=true&w=majority')

// View engine
app.set('view engine', 'ejs')

// middlewares
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))




// Endpoints (routes)
app.get('/', async ( req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', { articles: articles})
})

app.use('/articles', articleRouter)
//Listener
app.listen(5000)
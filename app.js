const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Aricle = require('./models/articles');
const articleRouter = require('./routes/articles');
const app = express();

//database connection
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

//view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));//for POST req
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {
    const articles = await Aricle.find().sort({ created_at: 'desc' });
    res.render('articles/index', { articles: articles })
});
//Middleware for Aricle
app.use('/articles', articleRouter);

app.listen(3000, () => {
    console.log('Running on port 3000...')
});
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ejsLayouts from 'express-ejs-layouts';

//import Blog from './models/blog.model.js'
import blogRouter from './routes/blogRoutes.js';

dotenv.config({
    path: './.env'
});

// express app & db connection
const app = express();
const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});

mongoose.connect(dbURI)
    .then(() => console.log(`Connected to the database ${dbURI}`))
    .catch(err => console.log(err));

// register view engine
//app.use(ejsLayouts);
app.set('layout', '../layouts/main');
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

// mongoose & mongo test routes
app.use('/test', blogRouter)

// redirection
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRouter)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
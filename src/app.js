import express from 'express';
import connectDB from './server/config/db_connection.js';
import ejsLayouts from 'express-ejs-layouts';
import testRouter from './routes/testRoutes.js';
import blogRouter from './routes/blogRoutes.js';

// express app listen
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});

// db connection
connectDB();

// register ejs view engine
app.use(ejsLayouts);
app.set('layout', '../views/layouts/main.ejs');
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
    console.log('in the next middleware - test');
    next();
});

// ROUTES
// move to routes?
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// dev routes
app.use('/dev', testRouter)

// blog routes
app.use('/blogs', blogRouter)

// 404 page
// blogs/fdsfsdf doesnt work
app.use((req, res) => {
    res.status(404).render('layouts/404.ejs', { title: '404' });
});
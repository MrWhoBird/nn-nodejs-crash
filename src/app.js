import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import mongoose from 'mongoose';
import Blog from './models/blog.model.js'

dotenv.config({
    path: './.env'
});

// express app
const app = express();

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then(res => console.log("Connected to the database", dbURI), app.listen(3000))
    .catch(err => console.log(err));


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
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

//wtf?
// app.use((req, res, next) => {
//     res.locals.path = req.path;
//     next();
// });

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })

    blog.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('5ea99b49b8531f40c0fde689')
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs });
});

// app.get('/', (req, res) => {
//     res.redirect('/blogs');
// });

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    //console.log(req.body,res.body)
    const blog = new Blog(req.body);

    blog.save()
        .then(result => {
            //the res from beggining of ap.post
            // /home vs /blogs
            res.redirect('/blogs')
        })
        .catch(err => {
            console.log(err)
        })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
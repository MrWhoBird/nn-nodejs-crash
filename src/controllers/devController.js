import Blog from '../models/blog.model.js';

// test controllers
const dev_blog_create = (req, res) => {
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
};

const dev_display_all_blogs = (req, res) => {
    Blog.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
};

const dev_single_blog = (req, res) => {
    Blog.findById('6958210c1519009f478ac435')
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
};

const dev_predefined = (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur', createdAt: new Date() },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur', createdAt: new Date() },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur', createdAt: new Date() }
    ];
    res.render('layouts/index.ejs', { title: 'Home', blogs });
};


export default {
    dev_blog_create,
    dev_display_all_blogs,
    dev_single_blog,
    dev_predefined
}
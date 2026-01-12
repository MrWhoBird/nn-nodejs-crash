import Blog from '../models/blog.model.js';

// my test controllers to be deleted
// const new_home = (req,res) => {
//     res.render('layouts/create.ejs', { title: 'hom' })
// };

// const new_abut = (req,res) => {
//     res.render('layouts/abut.ejs', { title: 'abut' })
// }

//nn controllers
// const blog_index = (req, res) => {
//   Blog.find().sort({ createdAt: -1 })
//     .then(result => {
//       res.render('layouts/index.ejs', { blogs: result, title: 'All blogs' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// router.get('', async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });

// const blog_details = (req, res) => {
//   const id = req.params.id;
//   Blog.findById(id)
//     .then(result => {
//       res.render('layouts/details', { blog: result, title: 'Blog Details' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// const blog_create_get = (req, res) => {
//   res.render('layouts/create', { title: 'Create a new blog' });
// }

// const blog_create_post = (req, res) => {
//   const blog = new Blog(req.body);
//   blog.save()
//     .then(result => {
//       res.redirect('/blogs');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// const blog_delete = (req, res) => {
//   const id = req.params.id;
//   Blog.findByIdAndDelete(id)
//     .then(result => {
//       res.json({ redirect: '/blogs' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// const blog_about = (req, res) => {
//     res.render('layouts/about.ejs', { title: 'About XXXX' });
// };

// test controllers
const test_blog_create = (req, res) => {
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

const test_display_all_blogs = (req, res) => {
    Blog.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
};

const test_single_blog = (req, res) => {
    Blog.findById('6958210c1519009f478ac435')
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
};

const test_predefined = (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur', createdAt: new Date() },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur', createdAt: new Date() },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur', createdAt: new Date() }
    ];
    res.render('layouts/index.ejs', { title: 'Home', blogs });
};


export default {
  // blog_index, 
  // blog_details, 
  // blog_create_get, 
  // blog_create_post, 
  // blog_delete,
  // blog_about,
  test_blog_create,
  test_display_all_blogs,
  test_single_blog,
  test_predefined
}
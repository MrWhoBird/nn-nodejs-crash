import Blog from '../models/blog.model.js';

//blog controllers

const blog_index = async (req, res) => {
  try{
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Blog.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Blog.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    console.log("dupa",nextPage, hasNextPage)

    res.render('layouts/index.ejs', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });
  } catch(error){
    console.log(error)
  }
  // Blog.find().sort({ createdAt: -1 })
  //   .then(result => {
  //     let perPage = 3;
  //     let page = req.query.page || 1;

  //     const data = Blog.aggregate()
  //       .skip(perPage * page - perPage)
  //       .limit(perPage)
  //       .exec();

  //     const count = Blog.countDocuments({});
  //     console.log("dupa", count);
  //     const nextPage = parseInt(page) + 1;
  //     const hasNextPage = nextPage <= Math.ceil(count / perPage);
  //     console.log("dupa2", Math.ceil(count / perPage));
  //     console.log("dupa3", hasNextPage);

  //     //res.render('layouts/index.ejs', { blogs: result, title: 'All blogs' });

  //     res.render('layouts/index.ejs', {
  //       blogs: result,
  //       title: 'All blogs',
  //       data,
  //       current: page,
  //       //this gives always false?
  //       nextPage: hasNextPage ? nextPage : null,
  //       currentRoute: '/'
  //     });

  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
}

const blog_about = (req, res) => {
  res.render('layouts/about.ejs', { title: 'About XXXX' });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('layouts/details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_create_get = (req, res) => {
  res.render('layouts/create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

export default {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_about
}
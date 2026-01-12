import express from 'express';
import blogController from '../controllers/blogController.js'

const blogRouter = express.Router();

// blog routes
blogRouter.get('/about', blogController.blog_about);
blogRouter.get('/create', blogController.blog_create_get);
blogRouter.get('/', blogController.blog_index);
blogRouter.post('/', blogController.blog_create_post)
blogRouter.get('/:id', blogController.blog_details);
blogRouter.delete('/:id', blogController.blog_delete);

export default blogRouter;
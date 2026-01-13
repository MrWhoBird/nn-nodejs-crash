import express from 'express';
import devController from '../controllers/devController.js'

const devRouter = express.Router();

// test routes
devRouter.get('/add-blog', devController.dev_blog_create);
devRouter.get('/all-blogs', devController.dev_display_all_blogs);
devRouter.get('/single-blog', devController.dev_single_blog);
devRouter.get('/predefined', devController.dev_predefined);

export default devRouter;
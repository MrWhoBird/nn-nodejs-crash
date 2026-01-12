import express from 'express';
import testController from '../controllers/testController.js'

const testRouter = express.Router();

// test routes
//must be first before :id??
testRouter.get('/add-blog', testController.test_blog_create);
testRouter.get('/all-blogs', testController.test_display_all_blogs);
testRouter.get('/single-blog', testController.test_single_blog);
testRouter.get('/predefined', testController.test_predefined);

export default testRouter;
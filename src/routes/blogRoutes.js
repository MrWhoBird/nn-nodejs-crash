import express from 'express';
import blogController from '../controllers/controllers.js'

const router = express.Router();

//must be first before :id??
// test routes
router.get('/add-blog', blogController.test_blog_create);
router.get('/all-blogs', blogController.test_display_all_blogs);
router.get('/single-blog', blogController.test_single_blog);
router.get('/predefined', blogController.test_predefined);

// standard routes
router.get('/create', blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post)
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);




export default router;
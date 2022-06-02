const router = require('express').Router();
const complainController = require('./../controllers/complainController');
const authMiddleware = require('./../middleware/authMiddleware')

router.use(authMiddleware);

router.get('/view-all', complainController.viewAllComplain);
router.get('/view/:id',complainController.viewComplain);
router.post('/create',complainController.createComplain);
router.patch('/edit/:id',complainController.editComplain);
router.delete('/delete/:id',complainController.deleteComplain);

module.exports = router;
const express = require('express');
const router = express.Router();
const {getAll, createCar, editCar, deleteCar} = require('../controllers/CarControllers')
const {verifyToken} = require('../middleware/auth')

/* GET users listing. */

router.get('/',verifyToken, getAll)
router.post('/create',verifyToken, createCar);
router.put('/update/:id',verifyToken, editCar);
router.delete('/delete/:id',verifyToken, deleteCar);

module.exports = router;

const express = require('express');
const {getEmployees, postEmployees, putEmployees,deleteEmployees} = require('../controller/employeesController');
const middlewareFunc = require('../middleware/middleware');
const router = express.Router();


router.get('/employees', getEmployees);
router.post('/employees/add', middlewareFunc, postEmployees);
router.put('/employees/update/:id', putEmployees);
router.delete('/employees/delete/:id', deleteEmployees);




module.exports = router;
const router = require('express').Router();
const auth = require('~/src/middleware/check-auth');

// init controller
const {
    get_provinsi,
    get_provinsi_by_id
   
} = require('~/src/controllers/provinsi/provinsiController');


// provinsi
router.route('/')
    .get(auth,get_provinsi);

// provinsi  by id
router.route('/')
    .post(auth,get_provinsi_by_id);


module.exports = router;
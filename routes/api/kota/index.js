const router = require('express').Router();
const auth = require('~/src/middleware/check-auth');

// init controller
const {
    get_kota,
    get_kota_by_id,
    get_kota_by_id_prov
   
} = require('~/src/controllers/kota/kotaController');


// kota
router.route('/')
    .get(auth,get_kota);

// kota by id
router.route('/id')
    .post(auth,get_kota_by_id);

    // kota by id
router.route('/')
    .post(auth,get_kota_by_id_prov);

module.exports = router;
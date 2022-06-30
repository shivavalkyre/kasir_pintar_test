const router = require('express').Router();
const auth = require('~/src/middleware/check-auth');

// init controller
const {
    get_kecamatan,
    get_kecamatan_by_id,
    get_kecamatan_by_id_kota
} = require('~/src/controllers/kecamatan/kecamatanController');


// kecamatan
router.route('/')
    .get(auth,get_kecamatan);

// kecamatan by id
router.route('/id')
    .post(auth,get_kecamatan_by_id);


// kecamatan by id
router.route('/')
    .post(auth,get_kecamatan_by_id_kota);

module.exports = router;
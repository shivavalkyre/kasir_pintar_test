const router = require('express').Router();
const auth = require('~/src/middleware/check-auth');

// init controller
const {
    get_kelurahan,
    get_kelurahan_by_id,
    get_kelurahan_by_id_kecamatan
} = require('~/src/controllers/kelurahan/kelurahanController');


// kelurahan
router.route('/')
    .get(auth,get_kelurahan);

// kelurahan by id
router.route('/id')
    .post(auth,get_kelurahan_by_id);

// kelurahan by id
router.route('/')
    .post(auth,get_kelurahan_by_id_kecamatan);

module.exports = router;
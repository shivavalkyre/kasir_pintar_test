const express = require('express');
const router = express.Router();

// PATH FOLDER
// AUTH
const auth = require('./auth');
router.use(`/auth`, auth);

const provinsi = require('./provinsi');
router.use(`/provinsi`, provinsi);

const kota = require('./kota');
router.use(`/kota`, kota);


const kecamatan = require('./kecamatan');
router.use(`/kecamatan`, kecamatan);


const kelurahan = require('./kelurahan');
router.use(`/kelurahan`, kelurahan);

module.exports = router;

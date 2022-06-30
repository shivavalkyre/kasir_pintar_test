const router = require('express').Router();
const { errorHandler } = require('~/services/kaspin-core');
const NodeCache = require("node-cache");
const appCache = new NodeCache({ stdTTL: 3599 });
const axios = require('axios');
var _ = require("underscore");

// get alamat by id
exports.get_kecamatan_by_id_kota = async (req, res) => {

    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        errorHandler.BadRequest(res, 'Object missing');
    }else{
        var obj= req.body;
        var id_kota= obj.id;
    }
   
    var alamat_kecamatan;


    let url = "https://kasirpintar.co.id/allAddress.txt";

    if (appCache.has('kecamatan_cache'))
    {

        
        alamat_kecamatan = appCache.get('kecamatan_cache');
        var filtered = _.where(alamat_kecamatan, {kota_id: id_kota.toString()});

          res.json({
            status: "sukses",
            data: filtered
        });


    }
    else
    {
        //console.log('here');

        axios.get(url).then(resData => {
            
            alamat_kecamatan = resData.data['address_kecamatan'];
            var filtered = _.where(alamat_kecamatan, {kota_id: id_kota.toString()});
            appCache.set('kecamatan_cache', alamat_kecamatan);

             res.json({
               status: "sukses",
               data: filtered
           });
                 
       
         })
         .catch(error => {
           //console.error(error);
       
           res.json({
               status: "gagal",
               data: error
           });
       
       
       
         });


    }

   
}

// get alamat by id
exports.get_kecamatan_by_id = async (req, res) => {

    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        errorHandler.BadRequest(res, 'Object missing');
    }else{
        var obj= req.body;
        var id= obj.id;
    }
   
    var alamat_kecamatan;


    let url = "https://kasirpintar.co.id/allAddress.txt";

    if (appCache.has('kecamatan_cache'))
    {

        
        alamat_kecamatan = appCache.get('kecamatan_cache');
        var filtered = _.where(alamat_kecamatan, {id: id.toString()});

          res.json({
            status: "sukses",
            data: filtered
        });


    }
    else
    {
        //console.log('here');

        axios.get(url).then(resData => {
            
            alamat_kecamatan = resData.data['address_kecamatan'];
            var filtered = _.where(alamat_kecamatan, {id: id.toString()});
            appCache.set('kecamatan_cache', alamat_kecamatan);

             res.json({
               status: "sukses",
               data: filtered
           });
                 
       
         })
         .catch(error => {
           //console.error(error);
       
           res.json({
               status: "gagal",
               data: error
           });
       
       
       
         });


    }

   
}

exports.get_kecamatan = async (req, res) => {
    
  var obj= req.body;
  var alamat_kecamatan;


  let url = "https://kasirpintar.co.id/allAddress.txt";

  if (appCache.has('kecamatan_cache'))
  {
    alamat_kecamatan = appCache.get('kecamatan_cache');
  

        res.json({
        status: "sukses",
        data: alamat_kecamatan
    });


  }
  else
  {

    axios.get(url).then(resData => {
        //console.log(resData.data['address_kecamatan']);
      
         alamat_kecamatan = resData.data['address_kecamatan'];
         appCache.set('kecamatan_cache', alamat_kecamatan);
      
          res.json({
            status: "sukses",
            data: alamat_kecamatan
        });
        
      
      
      })
      .catch(error => {
        //console.error(error);
      
        res.json({
            status: "gagal",
            data: error
        });
      
      });

  }



}
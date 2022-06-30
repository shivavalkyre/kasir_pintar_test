const router = require('express').Router();
const { errorHandler } = require('~/services/kaspin-core');
const NodeCache = require("node-cache");
const appCache = new NodeCache({ stdTTL: 3599 });
const axios = require('axios');
var _ = require("underscore");

// get alamat by id
exports.get_kelurahan_by_id_kecamatan = async (req, res) => {
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        errorHandler.BadRequest(res, 'Object missing');
    }
    else
    {
        var obj= req.body;
        var id_kecamatan= obj.id;
    }
   
    var alamat_kota;


    let url = "https://kasirpintar.co.id/allAddress.txt";

    if (appCache.has('kelurahan_cache'))
    {

        alamat_kelurahan = appCache.get('kelurahan_cache');
        var filtered = _.where(alamat_kelurahan, {kecamatan_id: id_kecamatan.toString()});

          res.json({
            status: "sukses",
            data: filtered
        });

    }
    else
    {
        //console.log('here');
        axios.get(url).then(resData => {

            alamat_kelurahan = resData.data['address_kelurahan'];
            var filtered = _.where(alamat_kelurahan, {kecamatan_id: id_kecamatan.toString()});
            appCache.set('kelurahan_cache', alamat_kelurahan);

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

exports.get_kelurahan_by_id = async (req, res) => {
    
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        errorHandler.BadRequest(res, 'Object missing');
    }
    else
    {
        var obj= req.body;
        var id= obj.id;
    }
   
    var alamat_kota;


    let url = "https://kasirpintar.co.id/allAddress.txt";

    if (appCache.has('kelurahan_cache'))
    {

        alamat_kelurahan = appCache.get('kelurahan_cache');
        var filtered = _.where(alamat_kelurahan, {id: id.toString()});

          res.json({
            status: "sukses",
            data: filtered
        });

    }
    else
    {
        //console.log('here');
        axios.get(url).then(resData => {

            alamat_kelurahan = resData.data['address_kelurahan'];
            var filtered = _.where(alamat_kelurahan, {id: id.toString()});
            appCache.set('kelurahan_cache', alamat_kelurahan);

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

exports.get_kelurahan = async (req, res) => {
    
  var obj= req.body;
  var alamat_kota;


  let url = "https://kasirpintar.co.id/allAddress.txt";

  
  if (appCache.has('kelurahan_cache'))
  {
            alamat_kelurahan = appCache.get('kelurahan_cache');
        

            res.json({
            status: "sukses",
            data: alamat_kelurahan
        });

   
  }
  else
  {
    //console.log('here');

    axios.get(url).then(resData => {
        //console.log(resData.data['address_provinsi']);
      
         alamat_kelurahan = resData.data['address_kelurahan'];
         appCache.set('kelurahan_cache', alamat_kelurahan);
      
          res.json({
            status: "sukses",
            data: alamat_kelurahan
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
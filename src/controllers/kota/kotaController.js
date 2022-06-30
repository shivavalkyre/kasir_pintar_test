const router = require('express').Router();
const { errorHandler } = require('~/services/kaspin-core');
const NodeCache = require("node-cache");
const appCache = new NodeCache({ stdTTL: 3599 });
const axios = require('axios');
var _ = require("underscore");

// get alamat by id
exports.get_kota_by_id_prov = async (req, res) => {

    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        errorHandler.BadRequest(res, 'Object missing');
    }else{
        var obj= req.body;
        var id_provinsi= obj.id;
    }
    
    var alamat_kota;


    let url = "https://kasirpintar.co.id/allAddress.txt";

    if (appCache.has('kota_cache'))
    {

        alamat_kota = appCache.get('kota_cache');
        var filtered = _.where(alamat_kota, {provinsi_id: id_provinsi.toString()});

          res.json({
            status: "sukses",
            data: filtered
        });

    }
    else
    {

        axios.get(url).then(resData => {

            alamat_kota = resData.data['address_kota'];
            var filtered = _.where(alamat_kota, {provinsi_id: id_provinsi.toString()});
            appCache.set('kota_cache', alamat_kota);

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
exports.get_kota_by_id = async (req, res) => {

    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        errorHandler.BadRequest(res, 'Object missing');
    }else{
        var obj= req.body;
        var id= obj.id;
    }
    
    var alamat_kota;


    let url = "https://kasirpintar.co.id/allAddress.txt";

    if (appCache.has('kota_cache'))
    {

        alamat_kota = appCache.get('kota_cache');
        var filtered = _.where(alamat_kota, {id: id.toString()});

          res.json({
            status: "sukses",
            data: filtered
        });

    }
    else
    {

        axios.get(url).then(resData => {

            alamat_kota = resData.data['address_kota'];
            var filtered = _.where(alamat_kota, {id: id.toString()});
            appCache.set('kota_cache', alamat_kota);

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


exports.get_kota = async (req, res) => {
    
  var obj= req.body;
  var alamat_kota;


  let url = "https://kasirpintar.co.id/allAddress.txt";

  
  if (appCache.has('kota_cache'))
  {
    alamat_kota = appCache.get('kota_cache');
  

    res.json({
      status: "sukses",
      data: alamat_kota
  });

   
  }
  else
  {

    axios.get(url).then(resData => {
        //console.log(resData.data['address_provinsi']);
      
         alamat_kota = resData.data['address_kota'];
         appCache.set('kota_cache', alamat_kota);
      
          res.json({
            status: "sukses",
            data: alamat_kota
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
const router = require('express').Router();
const { errorHandler } = require('~/services/kaspin-core');
const axios = require('axios');
const NodeCache = require("node-cache");
const appCache = new NodeCache({ stdTTL: 3599 });
var _ = require("underscore");


// get alamat by id
exports.get_provinsi_by_id = async (req, res) => {

  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
          errorHandler.BadRequest(res, 'Object missing');
  }else{
    var obj= req.body;
    var id_provinsi= obj.id;
  }
    
    
    var alamat_provinsi;


    let url = "https://kasirpintar.co.id/allAddress.txt";


    if (appCache.has('prop_cache'))
    {
          //console.log('Data from cache');
          //return res.send(appCache.get('cache'))
          alamat_provinsi = appCache.get('prop_cache');
          var filtered = _.where(alamat_provinsi, {id: id_provinsi.toString()});

          res.json({
            status: "sukses",
            data: filtered
        });

    }
    else
    {

      axios.get(url).then(resData => {
        //console.log(resData.data['address_provinsi']);
    
         alamat_provinsi = resData.data['address_provinsi'];
         var filtered = _.where(alamat_provinsi, {id: id_provinsi.toString()});
    
         appCache.set('prop_cache',  alamat_provinsi);
    
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

exports.get_provinsi = async (req, res) => {
    
  

  let url = "https://kasirpintar.co.id/allAddress.txt";

  if (appCache.has('prop_cache'))
  {
          //console.log('Data from cache');
          //return res.send(appCache.get('cache'))
          res.json({
            status: "sukses",
            data: appCache.get('prop_cache')
        });
  }
  else
  {
   

    axios.get(url).then(resData => {
       //console.log(resData.data['address_provinsi']);
    
       alamat_provinsi = resData.data['address_provinsi'];
       appCache.set('prop_cache', alamat_provinsi);
    
        res.json({
          status: "sukses",
          data: alamat_provinsi
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



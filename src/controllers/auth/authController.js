const { errorHandler, payloadJwt } = require('~/services/kaspin-core');
const router = require('express').Router();
const User = require('~/src/databases/models/userModel');
const jwt = require('jsonwebtoken');

var refreshtokens = {};
const crypto = require('crypto');
const moment = require('moment');

// bcrypt config
const bcrypt = require('bcrypt');
const saltRounds = 10;



exports.register =  async (req, res) => {

  
    var obj = req.body;
    



    try {
        if (!obj.email) {
            return errorHandler.BadRequest(res, 'Email is required');
        }

        const user = await User.findOne({
            $or: [
                { email: obj.email },
                { noPhone: obj.phone }
            ]
        });

        console.log(user);

        if (user) {
            if (user.email === obj.email) {
                return errorHandler.BadRequest(res, 'Email already taken.');
            } else if (user.noPhone === obj.phone) {
                return errorHandler.BadRequest(res, 'Phone already registered');
            } else {
                return errorHandler.BadRequest(res, 'User is exist');
            }
        } else { // register


            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) throw err;

                bcrypt.hash(obj.password, salt, async (err, hash) => {
                    if (err) throw err;

                    const resData = {
                        accessToken: crypto.randomBytes(32).toString('Hex'),
                        email: obj.email
                    }
                   
                    const newUser = new User({
                        fullname: obj.fullname,
                        email: resData.email,
                        password: hash,
                        noPhone: obj.phone,
                        isAdmin:false,
                        accessToken: resData.accessToken,
                    });
                    await newUser.save();

                    const user = await User.findOne({ email: obj.email });
                    const expired = moment().add('3', 'minutes').unix();
                    const payload = payloadJwt(user);
                    const sign = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '180s' });
                    resData.isVerified = !!user.emailVerifiedAt;
                    resData.accessToken = sign;
                    
                    res.json({
                        status: 'sukses',
                        data: resData
                    });
                });
            });
        }
    } catch (err) {
        errorHandler.UnHandler(res, err);
    }
}


exports.login = async (req, res) => {

   var obj = req.body;

    try {
        if (!obj.email) {
            return errorHandler.BadRequest(res, 'Email is required');
        }
        if (!obj.password) {
            return errorHandler.BadRequest(res, 'Password is empty');
        }

        var email = obj.email;

        const user = await User.findOne({ 'email': obj.email });

        if (user) {
            
            var userID = user._id;
            var emailVerifiedAt = user.emailVerifiedAt;
            var isVerified;
            var user_password =  user.password;

            if (emailVerifiedAt == null) {
                isVerified = false;
            } else if (emailVerifiedAt !== null) {
                isVerified = true;
            }

            
            bcrypt.compare(obj.password, user_password, function (err1, res1) {
            //console.log(res1);

                if (res1) {
                    // generate access token

                    var accessToken = crypto.randomBytes(32).toString('Hex');
                    var sign = jwt.sign({ userID, accessToken, email }, process.env.SECRET_KEY, { expiresIn: '600s' });

                    //update to mongo
                    User.findOneAndUpdate({ "email": email }, { "$set": { "accessToken": accessToken } }).exec(function (err, user) {
                        if (err) {
                            //console.log(err);
                            res.status(500).send(err);
                        }
                    });
                    // await User.updateOne({ email : email }, { accessToken:access_token, refreshToken:refresh_token, updatedAt:update_at }, options, callback);

                    res.json({ status: 'sukses', data: { accessToken: sign, email: email, isVerified: isVerified } });


                } else {
                    return errorHandler.BadRequest(res, 'Your password is wrong');
                }

            })
        } else {
            return errorHandler.BadRequest(res, 'Email not registered');
        }

    } catch (err) {
        errorHandler.UnHandler(res, err);
    }

}


exports.logout = async (req, res) => {

    var token = req.headers.authorization;
    var isExpiredToken = false;
    var decodeSign ="";
    //const decodeSign = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decodeSign);

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) {
            isExpiredToken = true;
            //console.log(isExpiredToken);
        }else{
            decodeSign = jwt.verify(token, process.env.SECRET_KEY);
            isExpiredToken=false;
        }
       
      });

      //console.log(decodeSign);

    try {

        if (isExpiredToken === false)
        {
            const user = await User.findOne({ '_id': decodeSign.userID });

            if (user) {
                //console.log(user);
                var userID = user._id;
                var emailVerifiedAt = user.emailVerifiedAt;
                var isVerified;
    
                if (emailVerifiedAt == null) {
                    isVerified = false;
                } else if (emailVerifiedAt !== null) {
                    isVerified = true;
                }
    
    
               
                        var accessToken = null;
    
                        //update to mongo
                        User.findOneAndUpdate({ "_id": userID }, { "$set": { "accessToken": accessToken } }).exec(function (err, user) {
                            if (err) {
                                //console.log(err);
                                res.status(500).send(err);
                            }
                        });
                        // await User.updateOne({ email : email }, { accessToken:access_token, refreshToken:refresh_token, updatedAt:update_at }, options, callback);
    
                        res.json({ status: 'sukses', data: 'Logout Success' });
    
    
            } else {
                        return errorHandler.BadRequest(res, 'User not found');
            }
    

        }else{

            return errorHandler.BadRequest(res, 'JWT Expired');
        }


    } catch (err) {
        errorHandler.UnHandler(res, err);
    }

}



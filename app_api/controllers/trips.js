const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const tripModel = mongoose.model('trips');
const userModel = mongoose.model('users');
 

const tripsList = async(req, res) => {
    const q = await tripModel
        .find({})
        .exec();

        console.log(q);
    
        if(!q)
        {
            return res 
                .status(404)
                .json(err);
        } else {
            return res
                .status(200)
                .json(q);
        }

};

const tripsFindByCode = async(req, res) => {
    const q = await tripModel
        .find({'code' : req.params.tripCode})
        .exec();

        console.log(q);
    
        if(!q)
        {
            return res 
                .status(404)
                .json(err);
        } else {
            return res
                .status(200)
                .json(q);
        }
};

// POST: /trips - add a new trip
const tripsAddTrip = async (req, res) => {
    console.log('TravelController#tripsAddTrip', req.body);
    getUser(req, res, async (req, res) => {
        try {
            const trip = await tripModel.create( {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
                } );
            if(trip)
            {
                return res.status(201).json(trip);
            }
            } catch(error) {
                return res.status(400).json(error);
            }
        } );
    }

const tripsUpdateTrip = async(req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip.findOneAndUpdate( {'code' : req.params.tripCode }, {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }, { new : true } )
            .then(trip => {
                if(!trip)
                {
                    return res.status(400).send({
                        message: "Trip not found with code: " + req.params.tripCode
                    } );
                }
                res.send(trip);
            }).catch(err => {
                if(err.kind === 'ObjectId')
                {
                    return res.status.send( {
                        message: "Trip not found with code: " + req.params.tripCode
                    } );
                }
                return res.status(500).json(err); // Server Error
            } );
        }
    );
};


// Return the user name if authenticated
const getUser = async (req, res, callback) => {
    if (req.auth && req.auth.email) {
      try {
        const user = await userModel.findOne({ email: req.auth.email }).exec();
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        callback(req, res, user.name);
      } catch (err) {
        console.error(err);
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  };


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
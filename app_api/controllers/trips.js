const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async(req, res) => {
    const q = await Model
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
    const q = await Model
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

const tripsAddTrip = async(req, res) => {
    try {
        const trip = await Model.create( {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        } );

        console.log(trip);
        return res.status(201).json(trip)
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
}

const tripsUpdateTrip = async (req, res) => {
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
        )
        .exec();

        if(!q)
        {
            return res.status(404).json( { message: "Trip not found"});
        } else {
            return res.status(201).json(q);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }

}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
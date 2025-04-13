const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes TripsList
    .post(tripsController.tripsAddTrip); // POST Method adds a Trip

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip); 
    

module.exports = router;

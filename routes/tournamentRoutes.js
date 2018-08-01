const express                 = require('express');
const tournamentRoute         = express.Router();
const passport                = require('passport')
const bcrypt                  = require('bcryptjs')
const User                    = require('../models/user')
const Team                    = require('../models/team')
const Tournament              = require('../models/tournament')

//tournament page
tournamentRoute.get('/tournament', (req, res, next)=>{
  Team.find()
  .then(response =>{
    res.json(response);
  })
  .catch((err)=>{
    res.json({
      message: "error seeing the tournament",
      err
    })
  })
})

//create tournament

tournamentRoute.get('/tournament/create', (req, res, next)=>{
  Team.find()
    .then((allTeams)=>{
      User.findById(id)
        .then((user)=>{
          console.log("user id:",id);
          console.log("teams", allTeams);
        })
      })
    .catch((err)=>{
      console.log(err);
    })
})

tournamentRoute.post('/tournament/create',(req, res, next)=>{
  Team.find()
    .then((allTeams) => {
      res.json(allTeams);
    })
    .catch((err)=>{
      res.json({
        message: "Error in editing team",
        err
      });
  
  
  
//   ({
//     User.findById(_id)({
//     Tournament.create({
//     administrator:  req.body.tournamentAdminOf,
//     teams:          req.body.allTeams,
//     tournamentType: req.body.tournamentType,
//     rules:          req.body.rules
//    })
//   })
//  })
// })

//get team list
tournamentRoute.get('/teams', (req, res, next)=>{
  Team.find()
  .then((allTheTeams)=>{
      res.json(allTheTeams);
  })
  .catch((err)=>{
      res.json(err);
  })
});

//edit tournament details
tournamentRoute.post('/teams/add', (req, res, next)=>{
  Tournament.put({
      administrator: req.body._id,
      teams: req.body.teams,
      tournamentType: req.body.tournamentType,
      rules: req.body.rules
  })
  .then((response)=>{
      res.json(response)
  })
  .catch((err)=>{
      res.json({
        message: "Error in editing team",
        err
      });
  })
})

//edit team for win/lose
tournamentRoute.put('/teams/edit/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({  message: "specified Id is not valid" });
    return;
  }
  const updatedTeam = {
    Win: Boolean,
    Lose: Boolean
  }
  Team.findByIdAndUpdate(req.params.id, updatedTeam)
  .then(team => {
    res.json({
      message: "win/lose status updated"
      })
    })
    .catch(error => next(error))
  })

//delete team

tournamentRoute.delete('/teams/:id',(req, res, next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      res.status(400).json({ 
      message: "Specified id is not valid"
    })
    return;
  }
  Team.remove({_id: req.params.id })
  .then(message => {
    return res.json({
      message: "Team has been removed"
    })
  })
  .catch(error => next(error))
})


module.exports = tournamentRoute;
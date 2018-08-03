const express                 = require('express');
const tournamentRoute         = express.Router();
const User                    = require('../models/user')
const Team                    = require('../models/team')
const Tournament              = require('../models/tournament')
//===========================================>
const bcrypt                  = require('bcryptjs')
const session                 = require('express-session')
const passport                = require('passport')
const LocalStrategy           = require('passport-local').Strategy;
const flash                   = require('connect-flash');
const ensureLoggedIn          = require('connect-ensure-login').ensureLoggedIn;
//===========================================>
//tournament maker main page
//============================================================>
tournamentRoute.get('/tournament', (req, res, next)=>{
  Team.find()
  .then(response =>{
    res.json(response);
  })
  .catch((err)=>{
    res.json({
      message: "error seeing the tournament page",
      err
    })
  })
})
//============================================================>
//create tournament page
tournamentRoute.get('/tournament/create', ensureLoggedIn('/'), (req, res, next)=>{
  Team.find()
  .then(response =>{
    res.json("something");
  })
  .catch((err)=>{
    res.json(err);
  })
})

//============================================================>
// creating tournament
tournamentRoute.post('/tournament/create',ensureLoggedIn('/'),(req, res, next)=>{
  const tournamentName          = req.body.tournamentName;
  const tournamentDescription   = req.body.tournamentDescription;
  const tournamentAdministrator = req.body.tournamentAdminId;
  if (tournamentName.length < 6) {
      res.status(400).json({ message: 'Your team name should contain 6 or more characters'});
      return;
    } //closed
  Tournament.findOne({ tournamentName }, 'tournamentName', (err, foundTournament) => {
      if(foundTournament) {
        res.status(400).json({ message: 'The team name already exist' });
        return;
      }
    const theTournament = new Tournament({
      tournamentName:           tournamentName,
      tournamentDescription:    tournamentDescription,
      tournamentAdministrator:  tournamentAdministrator,
      winnerCondition:          false,
      });
    theTournament.save((err) => {
      res.json(theTournament)
      if(err) 
      {
        res.status(400).json({ message: 'Something went wrong'})
      }
    })
  })
})

//============================================================>
//a tournament detail page
tournamentRoute.get('/tournament/details/:id',ensureLoggedIn('/'),(req, res, next)=>{
  const tournamentId = req.params.id;
  Tournament.findById(tournamentId)
  .then((theTournament) =>{
    res.json(theTournament);
  })
  .catch((err)=>{
    res.json(err)
  })
})

//============================================================>
//get team list
tournamentRoute.get('/tournament/teamlist',ensureLoggedIn('/'),(req, res, next)=>{
  Team.find()
  .then((allTheTeams)=>{
      res.json(allTheTeams);
  })
  .catch((err)=>{
      res.json(err);
  })
});

//=============================================================>
//edit tournament details
//this needs to be tournament/editTournament/:id in the future

tournamentRoute.post('/tournament/editTournament', ensureLoggedIn('/'),(req, res, next)=>{
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
        message: "Error in editing tournament",
        err
      });
  })
})

//edit team for win/lose
tournamentRoute.put('/tournament/team/edit/:id',ensureLoggedIn('/'),(req, res, next)=>{
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
tournamentRoute.delete('/tournament/team/delete/:id',ensureLoggedIn('/'),(req, res, next)=>{
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
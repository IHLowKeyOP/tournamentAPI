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
//create tournament page IT WORKS BUT ONCE THE TOURNAMENT/TEAM IS CREATED WE NEED TO AUTOUPDATE
//SO THAT THE USER ITSELF HAS A RECORD OF THE TOURNAMENTS THAT THEY ARE IN/THEY ADMIN
//AND THE TEAMS THAT THEY ARE IN/THEY ADMIN. WE CAN DO THAT USING THE RESPONSE. CONSOLE LOG
//THE RESPONSE TO SEE IF THE RESPONSE HAS THE ID. IF IT DOES, GRAB THAT ID AND IMMEDIATELY
//FIND BY ID AND UPDATE.
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
tournamentRoute.post('/tournament/create',/*ensureLoggedIn('/'),*/(req, res, next)=>{
  const tournamentName          = req.body.tournamentName;
  const tournamentDescription   = req.body.tournamentDescription;
  const tournamentAdministrator = req.user._id;
  const tournamentTeamsInit     = req.body.tournamentTeamsInit;
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
      tournamentTeams:          tournamentTeamsInit,
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

///Four things:

//1. Merge win/lose with update of the admin form.
//2. Merge pushing new teams into the array
//3. Reactivate the check for administration: if req.user._id !== Touranment.administrator







//ADDING TEAMS TO ARRAY
tournamentRoute.post('/tournament/edit/:id', ensureLoggedIn('/'),(req, res, next)=>{
  const tournamentId = req.params.id;
  const newTeam = req.body.teamId;


//WE NEED THE ACTUAL TOURNAMENT FUNCTIONS
  //ADD REMOVING TEAMS FROM THE ARRAY
  //ADD SHUFFLE TEAMS IN THE ARRAY
  //ADD CHUNKING TEAMS IN THE ARRAY FOR THE BRACKET.

    //Function declare winner. when a team loses and a team wins. It should kick the loser out of the array,
    //check for a winner. If no winner, then nothing happens. Send the information of the changes to Angular2 to run
    //the animations, etc.
    //add a function to check for the winner. Basically if the length of the teams array is =1.
  const updatedTournament = {
      tournamentName:             req.body.tournamentName,
      tournamentDescription:      req.body.tournamentDescription,
      tournamentAdministrator:    req.body.tournamentAdmin,
      winnerCondition:            req.body.winnerCondition,      
  }

  Tournament.findById(tournamentId)
      .then((theTournament)=>{
        if(req.user._id !== theTournament.administrator){
          res.redirect('/');
        }
      })

  Tournament.findByIdAndUpdate(tournamentId, {$push:{teams:newTeam}})
  .then((afterThatIsDone)=>{
    Tournament.findByIdAndUpdate(tournamentId, updatedTournament)
      .then((whatHasBeenDone)=>{
        console.log(whatHasBeenDone);
        res.json(whatHasBeenDone)
      })
      .catch((err)=>{
        next(err);
      })
  })
    .catch((err)=>{
      next(err);
    })
  })

















//edit team for win/lose
tournamentRoute.put('/tournament/team/edit/:id',ensureLoggedIn('/'),(req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({  message: "specified Id is not valid" });
    return;
  }
  const updatedTeam = {
    //replacing with a radio or select value. This may end up a string.
    //the value for that string will come for the angular radio/select
    win: Boolean,
    lose: Boolean
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
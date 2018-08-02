const express = require('express');
const teamRoutes = express.Router();
const Team = require('../models/team');
const passport = require('passport');

 
    

teamRoutes.post('/team/creation', (req, res, next) => {
    const teamCaptain = req.body.userId;
    const teamName = req.body.teamName;
    const teamDescription = req.body.teamDescription;
    
    if (teamName.length < 3) {
        res.status(400).json({ message: 'Please make your team name should contain 3 or more characters' });
        return;
    } //closed
    Team.findOne({ teamName }, '_id', (err, foundTeam) => {
        if (foundTeam) {
            res.status(400).json({ message: 'The team name already exists' });
            return;
        } //closed
        const theTeam = new Team({
            teamCaptain: teamCaptain,
            teamName: teamName,
            teamDescription: teamDescription,
            // teamLogo: teamLogo,
            win: false,
            lose: false,
        }); //closed
        theTeam.save((err) => {
            res.json(theTeam)

            if (err) {

                res.status(400).json({ message: 'Something went wrong' });
                return;

            }
            // console.log('it works')

        }); //theTeam.save 
    }); // team.findOne
}); // teamRoutes.post


teamRoutes.post('/team/update/:id', (req, res, next) => {
    const newMember = req.body.newMemberId;
    const teamId = req.params.id;
    const updatedTeam = {
        teamName:req.body.teamName,
        teamLogo: req.body.image,
        description: req.body.description,
        win:req.body.win, //ify
        lose:req.body.lose, //ify
        //players
    } 
console.log(newMember)

    Team.findByIdAndUpdate(teamId,updatedTeam, 
        {$push: {roster: newMember}}
    )
        .then((response) => {
            console.log(response)
            res.json(response)
        })
        .catch((err) => {
            next(err);
        })
})

//DELETE Team
teamRoutes.post('/team/delete/:id', (req, res, next) => {
    const teamId = req.params.id;
    Team.findByIdAndRemove(teamId)
        .then((response) => { // look into difference between promises and callbacks*
            res.json(response)
        })
        .catch((err) => {
            next(err);
        })
})



// Thise route is display infromation when pulled from database /DB
teamRoutes.get('/team/details/:id', (req, res, next) => {
    const teamId = req.params.id;
    Team.findById(teamId)
    .then((theTeam)=>{
        res.json(theTeam);
    })
    .catch((err)=>{
        res.json(err);
    })
});

        


module.exports = teamRoutes;
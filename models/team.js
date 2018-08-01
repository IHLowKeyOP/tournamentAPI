const mongoose = require('mongoose'); // connects to the data base
const Schema = mongoose.Schema // connects model to  database in mongo etc...

const teamSchema = new Schema({
    teamLogo: String,
    teamCaptain:[{ type: Schema.Type.ObjectID, ref: 'User'}],//reffering to the User Schema hence capital U in User
    roster:[{ type: Schema.Type.ObjectId, ref: 'User'}], //reffering to the User Schema hence capital U in User hence capital U in User 
    Win: Boolean,
    lose: Boolean,
    },
    { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);//stating that User w/ capital u is going to be the model userSchem.
//      |
// this const states that Team with capital T is calling the team Schema/Model
module.exports = Team;
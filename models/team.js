const mongoose          = require('mongoose'); // connects to the data base
const Schema            = mongoose.Schema // connects model to  database in mongo etc...
const User              = require('./user')
const teamSchema = new Schema({
    teamCaptain:[{ type: Schema.Types.ObjectId, ref: 'User'}],//reffering to the User Schema hence capital U in User
    teamLogo: String,
    teamName:{
        type: String,
        required: [true, 'The team name is required']
      },
    // roster:[{ type: Schema.Type.ObjectId, ref: 'User'}], //reffering to the User Schema hence capital U in User hence capital U in User 
    teamDescription: String,
    win: Boolean,
    lose: Boolean,
    },
    { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);//stating that User w/ capital u is going to be the model userSchem.
//      |
// this const states that Team with capital T is calling the team Schema/Model
module.exports = Team;

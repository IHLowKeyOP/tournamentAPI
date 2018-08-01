const mongoose = require('mongoose'); // connects to the data base
const Schema = mongoose.Schema // connects model to  database in mongo etc...



//Making the user
const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    image: String,
    description: String,
    role: String,
    stats: String,
    tournamentAdminOf: [{ type: Schema.Types.ObjectId, ref: 'Tournament'}],
    tournamentMemberOf: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
    teamCaptainOf: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    teamMemberOf: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    },
    { timestamps: true }
);
//Defining the user schema to use with outside. 
const User = mongoose.model("User", userSchema);//stating that User w/ capital u is going to be the model userSchem.

module.exports = User;

// something to add
// TOURNAMENT_id

// NAME: string

// TEAM_id Schema.typeObjectid
// <ref:team>

// ROLE: schema.type.objectid
// (add default image/string/)

// IMAGE: string

// DESCRIPTION: string

// FEATURE:delete yourself 
// from team

// STATS:  string or graph

// username: string

// password: string
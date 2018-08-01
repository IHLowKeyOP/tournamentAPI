const mongoose = require('mongoose'); // connects to the data base
const Schema = mongoose.Schema // connects model to  database in mongo etc...

const userSchema = new Schema({
    name: String,
    image: String,
    description: String,
    username: String,
    password: String,
    },
    { timestamps: true }
);

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
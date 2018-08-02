const mongoose = require('mongoose'); 
const Schema = mongoose.Schema        

const tournamentSchema = new Schema({
    tournamentName:             String,
    tournamentDescription:      String,
    tournamentAdministrator:    {type: Schema.Types.ObjectId, ref: "User"},
    teams:                      [{type: Schema.Types.ObjectId, ref: "Team"}],
    winnerCondition:            Boolean,
    winner:                     [{type: Schema.Types.ObjectId, ref: "Team"}],
    tournamentType:             {type: String, default: "insert tournament type"},
    rules:                      {type: String, default: "insert tournament rules"}
    },
    { timestamps: true }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
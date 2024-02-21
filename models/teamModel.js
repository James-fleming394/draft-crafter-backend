const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Regular expression for URL validation
const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;

const TeamSchema = new Schema({
    name: { type: String, required: true },
    record: { type: String, required: true },
    picture: { type: String, required: true, validate: {
        validator: function(v) {
            return urlRegex.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
        } },
    teamNeeds: { type: String, required: true, enum: ['QB', 'RB', 'WR', 'TE', 'OT', 'G', 'C', 'EDGE', 'DL', 'ILB', 'OLB', 'CB', 'S'] },
    picks2024: [{
        round: Number,
        pickNumber: Number,
        originalTeam: String, // If the pick was acquired through a trade
        conditions: String, // Any conditions tied to the pick
        isTraded: Boolean, // If the pick was traded
    }],
    picks2025: [{
        round: Number,
        pickNumber: Number,
        originalTeam: String,
        conditions: String,
        isTraded: Boolean,
    }],
    picks2026: [{
        round: Number,
        pickNumber: Number,
        originalTeam: String,
        conditions: String,
        isTraded: Boolean,
    }],
    players: [{
        name: { type: String, required: true },
        position: {
            type: String,
            required: true,
            enum: ['QB', 'RB', 'WR', 'TE', 'OT', 'G', 'C', 'EDGE', 'DL', 'ILB', 'OLB', 'CB', 'S']
        }
    }],
});

module.exports = mongoose.model('Team', TeamSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Regular expression for URL validation
const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;

const PlayerSchema = new Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    college: { type: String, required: true },
    collegePicture: { type: String, required: true, validate: {
        validator: function(v) {
            return urlRegex.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
        } }, 
    conference: { type: String, required: true, enum: ['ACC', 'Big Ten', 'Big 12', 'Pac-12', 'SEC', 'American','MAC', 'MAAC', 'Mountain West', 'Sun-Belt', 'Conference USA', 'Independent', ] },
    position: { type: String, required: true, enum: ['QB', 'RB', 'WR', 'TE', 'OT', 'G', 'C', 'EDGE', 'DL', 'ILB', 'OLB', 'CB', 'S'] },
    age: { type: Number, required: true },
    height: { type: String, required: true },  
    weight: { type: Number, required: true },
    class: { type: String, required: true, enum: ['Fr', 'So', 'Jr', 'Sr',] },
    picture: { type: String, required: true, validate: {
        validator: function(v) {
            return urlRegex.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
        } },  }, 
    bestFit1: { type: String, required: true },
    bestFit2: { type: String, required: true },
    bestFit3: { type: String, required: true },
    pros: { type: String, required: true },
    cons: { type: String, required: true },
    description: { type: String, required: true },
    playerCompCeiling: { type: String, required: true },
    playerCompFloor: { type: String, required: true },
    roundGrade: { type: String, required: true },
    rating: { type: Map, of: Number, default: {} },
});

module.exports = mongoose.model('Player', PlayerSchema);

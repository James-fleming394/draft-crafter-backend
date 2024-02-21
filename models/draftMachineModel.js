const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DraftMachineSchema = new Schema({
    year: {
        type: Number,
        required: true,
    },
    draftOrder: [{
        teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
        originalTeamId: { type: Schema.Types.ObjectId, ref: 'Team' },
        pickNumber: Number,
    }],
    picks: [{
        pickNumber: Number,
        teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
        playerId: { type: Schema.Types.ObjectId, ref: 'Player' },
        selected: { type: Boolean, default: false },
    }],
    trades: [{
        teamsInvolved: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
        picksTraded: [{
            pickNumber: Number,
            year: Number,
        }],
        tradeDate: { type: Date, default: Date.now },
    }],
    state: {
        type: String,
        enum: ['open', 'closed', 'in_progress'],
        default: 'open',
    },
}, { timestamps: true });

module.exports = mongoose.model('DraftMachine', DraftMachineSchema);

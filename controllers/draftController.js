const DraftMachine = require('../models/DraftMachine');
const Team = require('../models/Team');
const Player = require('../models/Player');

// Create a new draft
exports.createDraft = async (req, res) => {
    try {
        const newDraft = new DraftMachine(req.body);
        const savedDraft = await newDraft.save();
        res.status(201).json(savedDraft);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAvailablePlayers = async (req, res) => {
    try {
        // Find the draft for the current or specified year
        const currentYear = new Date().getFullYear();
        const draft = await DraftMachine.findOne({ year: currentYear });
        if (!draft) {
            return res.status(404).json({ message: "Draft not found for the current year." });
        }

        // Extract IDs of players who have already been picked
        const pickedPlayerIds = draft.picks
            .filter(pick => pick.selected)
            .map(pick => pick.playerId);

        // Find players who have not been picked yet
        const availablePlayers = await Player.find({ 
            _id: { $nin: pickedPlayerIds } 
        });

        res.status(200).json(availablePlayers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Update draft order
exports.updateDraftOrder = async (req, res) => {
    const { draftId, draftOrder } = req.body;
    try {
        const updatedDraft = await DraftMachine.findByIdAndUpdate(draftId, { $set: { draftOrder: draftOrder } }, { new: true });
        res.status(200).json(updatedDraft);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Make a pick
exports.makePick = async (req, res) => {
    const { draftId, pickNumber, teamId, playerId } = req.body;
    try {
        // Find the draft and the specific pick
        const draft = await DraftMachine.findById(draftId);
        const pick = draft.picks.find(p => p.pickNumber === pickNumber);

        if (pick.selected) {
            return res.status(400).json({ message: "Pick already made." });
        }

        pick.teamId = teamId;
        pick.playerId = playerId;
        pick.selected = true;

        await draft.save();
        res.status(200).json(draft);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Handle a trade
exports.handleTrade = async (req, res) => {
    const { draftId, teamsInvolved, picksTraded } = req.body;
    try {
        const draft = await DraftMachine.findById(draftId);
        draft.trades.push({ teamsInvolved, picksTraded });
        await draft.save();
        res.status(200).json(draft);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
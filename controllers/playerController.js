const Player = require('../models/playerModel.js');

// Get all players
exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get a single player by ID
exports.getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).send('Player not found');
        res.json(player);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Add a new player
exports.createPlayer = async (req, res) => {
    try {
        const newPlayer = new Player(req.body);
        await newPlayer.save();
        res.status(201).send(newPlayer);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Update a player
exports.updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlayer) return res.status(404).send('Player not found');
        res.json(updatedPlayer);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Delete a player
exports.deletePlayer = async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) return res.status(404).send('Player not found');
        res.send(`Deleted player.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
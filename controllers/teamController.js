const Team = require('../models/teamModel');

// Get all teams
exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get a single team by ID
exports.getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).send('Team not found');
        res.json(team);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create a new team
exports.createTeam = async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Update a team
exports.updateTeam = async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeam) return res.status(404).send('Team not found');
        res.json(updatedTeam);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) return res.status(404).send('Team not found');
        res.send('Team deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

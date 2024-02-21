const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Routes for the Team entity
router.get('/teams', teamController.getTeams); // Get all teams
router.get('/teams/:id', teamController.getTeamById); // Get a single team by ID
router.post('/teams', teamController.createTeam); // Create a new team
router.put('/teams/:id', teamController.updateTeam); // Update an existing team
router.delete('/teams/:id', teamController.deleteTeam); // Delete a team

module.exports = router;

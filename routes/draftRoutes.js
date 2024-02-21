const express = require('express');
const router = express.Router();

// Import your draft controller
const {
    createDraft,
    getAvailablePlayers,
    updateDraftOrder,
    makePick,
    handleTrade,
} = require('../controllers/draftController');

// Route to create a new draft
router.post('/drafts', createDraft);

// Route to get available (unpicked) players
router.get('/drafts/available-players', getAvailablePlayers);

// Route to update the draft order
router.put('/drafts/:draftId/order', updateDraftOrder);

// Route to make a pick in the draft
router.post('/drafts/:draftId/picks', makePick);

// Route to handle a trade
router.post('/drafts/:draftId/trades', handleTrade);

// Export the router
module.exports = router;

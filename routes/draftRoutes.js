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
router.post('/draft', createDraft);

// Route to get available (unpicked) players
router.get('/draft/available-players', getAvailablePlayers);

// Route to update the draft order
router.put('/draft/:draftId/order', updateDraftOrder);

// Route to make a pick in the draft
router.post('/draft/:draftId/picks', makePick);

// Route to handle a trade
router.post('/draft/:draftId/trades', handleTrade);

// Export the router
module.exports = router;

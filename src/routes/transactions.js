import {Router} from 'express';
import {roleMiddleware} from "../middleware/routes";
import {createTransaction, getTransactions} from "../service/transactions";
import {getLocations} from "../service/locations";
import {getItems} from "../service/items";

const router = Router();

router.get('/', async function (req, res, next) {
    const transactions = await getTransactions(req.user.currentProject ? req.user.currentProject._id : null);
    const locations = await getLocations(req.user.currentProject ? req.user.currentProject._id : null);
    const items = await getItems(req.user.currentProject ? req.user.currentProject._id : null);
    res.render('transactions', {
        transactions: transactions,
        locations: locations,
        items: items,
        username: req.user.username,
        currentProject: req.user.currentProject
    });
});
router.post('/', roleMiddleware(['admin', 'writer']), async function (req, res, next) {
    await createTransaction(
        req.user._id,
        req.body.sourceId,
        req.body.destinationId,
        req.body.itemId,
        req.user.currentProject ? req.user.currentProject._id : null,
        req.body.quantity
    );
    res.redirect('/warehouse/transactions');
});

export default router;
import {Router} from 'express';
import {roleMiddleware} from "../middleware/routes";
import {createItem, getItems} from "../service/items";

const router = Router();

router.get('/', async function (req, res, next) {
    const items = await getItems(req.user.currentProject ? req.user.currentProject._id : null);
    res.render('items', {
        items: items,
        username: req.user.username,
        currentProject: req.user.currentProject
    });
});
router.post('/', roleMiddleware(['admin', 'writer']), async function (req, res, next) {
    await createItem(
        req.user._id,
        req.user.currentProject ? req.user.currentProject._id : null,
        req.body.name
    );
    res.redirect('/warehouse/items');
});

export default router;
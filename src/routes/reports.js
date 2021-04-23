import {Router} from 'express';
import {getItems} from "../service/items";
import {getItemReport, getLocationReport} from "../service/reports";
import {getLocations} from "../service/locations";

const router = Router();

router.get('/', async function (req, res, next) {
    res.render('reports', {
        username: req.user.username,
        currentProject: req.user.currentProject
    });
});
router.get('/item', async function (req, res, next) {
    const items = await getItems(req.user.currentProject ? req.user.currentProject._id : null);
    res.render('reports-item', {
        items,
        username: req.user.username,
        currentProject: req.user.currentProject
    });
});
router.post('/item', async function (req, res, next) {
    const items = await getItems(req.user.currentProject ? req.user.currentProject._id : null);
    const report = await getItemReport(req.body.itemId, req.user.currentProject ? req.user.currentProject._id : null);
    res.render('reports-item', {
        items,
        report,
        username: req.user.username,
        currentProject: req.user.currentProject
    });
});
router.get('/location', async function (req, res, next) {
    const locations = await getLocations(req.user.currentProject ? req.user.currentProject._id : null);
    res.render('reports-location', {
        locations,
        username: req.user.username,
        currentProject: req.user.currentProject
    });
});
router.post('/location', async function (req, res, next) {
    const locations = await getLocations(req.user.currentProject ? req.user.currentProject._id : null);
    const report = await getLocationReport(req.body.locationId, req.user.currentProject ? req.user.currentProject._id : null);
    res.render('reports-location', {
        locations,
        report,
        username: req.user.username,
        currentProject: req.user.currentProject
    });
});

export default router;
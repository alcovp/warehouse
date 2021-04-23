import {Router} from 'express';
import {roleMiddleware} from "../middleware/routes";
import {createLocation, getLocations} from "../service/locations";

const router = Router();

router.get('/', async function (req, res, next) {
    const locations = await getLocations(req.user.currentProject ? req.user.currentProject._id : null);
    res.render('locations', {
        locations: locations,
        username: req.user.username,
        currentProject: req.user.currentProject
    });
});
router.post('/', roleMiddleware(['admin', 'writer']), async function (req, res, next) {
    await createLocation(
        req.user._id,
        req.user.currentProject ? req.user.currentProject._id : null,
        req.body.name
    );
    res.redirect('/warehouse/locations');
});

export default router;
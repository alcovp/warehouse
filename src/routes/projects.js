import {Router} from 'express';
import {roleMiddleware} from "../middleware/routes";
import {setProjectMembers, chooseProject, createProject, getProjects} from "../service/projects";
import {getUsers} from "../service/users";

const router = Router();

router.get('/', async function (req, res, next) {
    const projects = await getProjects(req.user._id);
    const users = await getUsers();
    res.render('projects', {
        projects: projects,
        users: users,
        username: req.user.username,
        currentProject: req.user.currentProject
    });
});
router.post('/', roleMiddleware(['admin', 'writer']), async function (req, res, next) {
    await createProject(
        req.user._id,
        req.body.name
    );
    res.redirect('/warehouse/projects');
});
router.get('/choose/:projectId', async function (req, res, next) {
    await chooseProject(req.user._id, req.params.projectId);
    res.redirect('/warehouse/projects');
});
router.post('/set-members', roleMiddleware(['admin', 'writer']), async function (req, res, next) {
    await setProjectMembers(
        req.body.members,
        req.body.projectId
    );
    res.redirect('/warehouse/projects');
});

export default router;
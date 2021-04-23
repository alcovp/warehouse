import Project from "../models/project";
import User from "../models/user";

export const getProjects = async (userId) => {
    return await Project
        .find({
            $or: [
                {user: userId},
                {members: {$elemMatch: {$eq: userId}}}
            ]
        })
        .populate({
            path: 'members',
            populate: {
                path: 'user',
                select: 'username'
            }
        })
        .then(projects => projects.map(mapProject))
        .catch(err => console.error(err));
};
const mapProject = (project) => {
    return {
        id: project._id,
        name: project.name,
        members: project.members.map(mapMember),
        user: project.user
    };
};
const mapMember = (member) => {
    return {
        id: member._id,
        name: member.username
    };
};
export const createProject = async (userId, name) => {
    const project = new Project({
        name: name,
        user: userId
    });
    project.save()
        .then((project) => {
            console.log("New project created: " + project.name);
        })
        .catch((error) => {
            console.error(error);
        });
};
export const setProjectMembers = async (userIds, projectId) => {
    return Project.findOneAndUpdate(
        {_id: projectId},
        {members: userIds},
        {new: true}
    )
        .catch((error) => {
            console.error(error);
        });
};
export const chooseProject = async (userId, projectId) => {
    return User.findOneAndUpdate(
        {_id: userId},
        {currentProject: projectId},
        {new: true}
    )
        .catch((error) => {
            console.error(error);
        });
};
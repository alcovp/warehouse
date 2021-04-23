import Item from "../models/item";

export const getItems = async (projectId) => {
    return await Item
        .find({project: projectId})
        .then(items => items.map(mapItem))
        .catch(err => console.error(err));
};
const mapItem = (item) => {
    return {
        id: item._id,
        name: item.name,
        user: item.user
    };
};
export const createItem = async (userId, projectId, name) => {
    const item = new Item({
        name: name,
        project: projectId,
        user: userId
    });
    item.save()
        .then((item) => {
            console.log("New item created: " + item.name);
        })
        .catch((error) => {
            console.error(error);
        });
};
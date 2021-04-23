import Location from "../models/location";

export const getLocations = async (projectId) => {
    return await Location
        .find({project: projectId})
        .then(locations => locations.map(mapLocation))
        .catch(err => console.error(err));
};
const mapLocation = (location) => {
    return {
        id: location._id,
        name: location.name,
        user: location.user
    };
};
export const createLocation = async (userId, projectId, name) => {
    const location = new Location({
        name: name,
        project: projectId,
        user: userId
    });
    location.save()
        .then((location) => {
            console.log("New location created: " + location.name);
        })
        .catch((error) => {
            console.error(error);
        });
};
import Transaction from "../models/transaction";
import mongoose from 'mongoose';

export const getItemReport = async (itemId, projectId) => {
    return Transaction.aggregate(
        [
            {"$match": {"item": mongoose.Types.ObjectId(itemId)}},
            {"$match": {"project": mongoose.Types.ObjectId(projectId)}},
            {"$sort": {"date": 1}},
            {
                "$group": {
                    "_id": "$location",
                    "location": {"$first": "$location"},
                    "item": {"$first": "$item"},
                    "quantity": {"$sum": "$quantity"},
                }
            },
            {"$match": {"quantity": {$gt: 0}}},
            {
                "$lookup": {
                    "from": "locations",
                    "localField": "location",
                    "foreignField": "_id",
                    "as": "location"
                }
            },
            {
                "$lookup": {
                    "from": "items",
                    "localField": "item",
                    "foreignField": "_id",
                    "as": "item"
                }
            },
            {"$unwind": {"path": "$location"}},
            {"$unwind": {"path": "$item"}}
        ]
    )
        .then(rows => rows)
        .catch(error => console.error(error));
};
export const getLocationReport = async (locationId, projectId) => {
    return Transaction.aggregate(
        [
            {"$match": {"location": mongoose.Types.ObjectId(locationId)}},
            {"$match": {"project": mongoose.Types.ObjectId(projectId)}},
            {"$sort": {"date": 1}},
            {
                "$group": {
                    "_id": "$item",
                    "location": {"$first": "$location"},
                    "item": {"$first": "$item"},
                    "quantity": {"$sum": "$quantity"},
                }
            },
            {"$match": {"quantity": {$gt: 0}}},
            {
                "$lookup": {
                    "from": "locations",
                    "localField": "location",
                    "foreignField": "_id",
                    "as": "location"
                }
            },
            {
                "$lookup": {
                    "from": "items",
                    "localField": "item",
                    "foreignField": "_id",
                    "as": "item"
                }
            },
            {"$unwind": {"path": "$location"}},
            {"$unwind": {"path": "$item"}}
        ]
    )
        .then(rows => rows)
        .catch(error => console.error(error));
};
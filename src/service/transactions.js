import Transaction from "../models/transaction";
import moment from "moment";

export const getTransactions = async (projectId) => {
    //TODO везде нужно проверять, входит ли юзер в проект
    return await Transaction
        .find({project: projectId})
        .sort('date')
        .populate('location', 'name')
        .populate('item', 'name')
        .then(transactions => transactions.map(mapTransaction))
        .then(transactions => {
            const transactionsForUI = [];
            for (let i = 0; i < transactions.length; i += 2) {
                let source;
                let destination;
                if (transactions[i].quantity > 0) {
                    source = transactions[i + 1].location;
                    destination = transactions[i].location;
                } else {
                    source = transactions[i].location;
                    destination = transactions[i + 1].location;
                }
                transactionsForUI.push({
                    source: source,
                    destination: destination,
                    item: transactions[i].item,
                    quantity: Math.abs(transactions[i].quantity),
                    date: transactions[i].date,
                    user: transactions[i].user
                });
            }
            return transactionsForUI;
        })
        .catch(err => console.error(err));
};
const mapTransaction = (transaction) => {
    return {
        id: transaction._id,
        location: transaction.location,
        item: transaction.item,
        quantity: transaction.quantity,
        date: moment(transaction.date).format('DD.MM.YYYY HH:mm'),
        user: transaction.user
    };
};
export const createTransaction = async (userId, sourceId, destinationId, itemId, projectId, quantity) => {
    const date = new Date();
    Transaction.create([
        {
            location: sourceId,
            item: itemId,
            quantity: -quantity,
            date: date,
            project: projectId,
            user: userId
        },
        {
            location: destinationId,
            item: itemId,
            quantity: quantity,
            date: date,
            project: projectId,
            user: userId
        }
    ])
        .catch((error) => {
            console.error(error);
        });
};
const User = require("../models/User.model");
const Entry = require("../models/Entry.model");

async function getIncompletePromptUsers () {
    const allUsers = await User.find();
    const usersWithouEntries = allUsers.filter(user => user.entries.length === 0);

    const today = new Date();
    const usersWithIncompletePrompts = allUsers.filter(async user => {

        const startOfDay = new Date(today.setHours(0,0,0,0));
        const endOfDay = new Date(today.setHours(23,59,59,999));

        const incompleteEntries = await Entry.find({
            creator: user._id,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            $or: [
                {focusPrompt: null},
                {focusPrompt: ""},
                {letGoPrompt: null},
                {letGoPrompt: ""},
                {gratefulPrompt: null},
                {gratefulPrompt: ""}
            ],
        })
        .populate("creator");
    });
    return [...usersWithouEntries,...usersWithIncompletePrompts];
}

module.exports = getIncompletePromptUsers;




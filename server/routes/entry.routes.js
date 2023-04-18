const router = require("express").Router();
const mongoose = require("mongoose");
const Entry = require("../models/Entry.model");
const User = require("../models/User.model");

// GET /api/entries - for that user
// this probably needs isOwner mw
router.get("/entries", (req, res, next) => {
    const creator = req.payload._id

    Entry.find({creator : creator})
    .then(allEntries => {
        console.log(allEntries);
        res.json(allEntries);
    })
    .catch(err => console.log(err));
})

// GET /api/entries/:entryId
//this probably needs isOwner mw
router.get("/entries/:entryId", async (req, res, next) => {
    const { entryId } = req.params;

    //if the entry belongs in the [entries] arr of that user, can show the entry
    //find the user thats logged in 
    //access the [entries] arr
    //check if id of entry is included in [entries] array
    const creatorId = req.payload._id
    console.log("creatorId ==> ", creatorId)

    const foundUser = await User.findById(creatorId)
    console.log("foundUser ===> ", foundUser)

    if (foundUser.entries.includes(entryId)) {
        Entry.findById(entryId)
        .then(oneEntry => {
            console.log(oneEntry);
            res.json(oneEntry);
        })
        .catch(err => console.log(err));
    } else {
        res.status(404).send()
    }
})

// POST /api/entries
router.post("/entries", async (req, res, next) => {
    const { focusPrompt, gratefulPrompt, letGoPrompt} = req.body;
    console.log("req.body ===> ", req.body);

    const creator = req.payload._id

    try {
        //create the Entry in the db
        const newEntry = await Entry.create({focusPrompt, gratefulPrompt, letGoPrompt, creator})
        //push created Entry into the array of Entries for the current User/creator
        const entryCreator = await User.findById(creator);
        entryCreator.entries.push(newEntry);
        entryCreator.save();
        res.json({newEntry, entryCreator}); 
    } catch (err) {
        console.log("Error while creating a new entry: ", err);
    }
});

// PUT /api/entries/:entryId (update an entry by its id)
router.put("/entries/:entryId", async (req, res, next) => {
    const {entryId} = req.params;

    // const {focusPrompt, gratefulPrompt, letGoPrompt} = req.body;

    const creatorId = req.payload._id
    console.log("creatorId ==> ", creatorId)

    const foundUser = await User.findById(creatorId)
    console.log("foundUser ===> ", foundUser)

    if (foundUser.entries.includes(entryId)) {
        try {
            const editedEntry = await Entry.findByIdAndUpdate(entryId, req.body, {new:true});
            editedEntry.save();
            res.json(editedEntry);
        } catch (err) {
            console.log("Error while updating the entry: ", err)
        }
    }
});

// DELETE /api/entries/:entryId
//must delete the entry document and also remove it from the [entries] of the User/creator
router.delete("/entries/:entryId", async (req, res, next) => {
    const { entryId } = req.params;

    const creatorId = req.payload._id
    console.log("creatorId ==> ", creatorId)

    const foundUser = await User.findById(creatorId)
    console.log("foundUser ===> ", foundUser)

    if (foundUser.entries.includes(entryId)) {
        try {
            const entryToDelete = await Entry.findById(entryId);
            console.log("entryToDelete: ", entryToDelete);
            //must find the User creator, then grab [entries], then splice the entryToDelete
            const creatorId = entryToDelete.creator;
            const creator = await User.findById(creatorId);
            console.log("creator: ", JSON.stringify(creator, null, 2));
            console.log("creator.entries ==> ", creator.entries)
            const entryIndex = creator.entries.indexOf(entryId);
            console.log("entryIndex: ", entryIndex);
            creator.entries.splice(entryIndex, 1);
            console.log("current entries: ", creator.entries);
            creator.save();
    
            await Entry.findByIdAndRemove(entryId);
            res.json({message: `Entry with entryId ${entryId} has been removed.`})
        } catch (err) {
            console.log("Error while deleting the entry: ", err)
        }
    }
})
 
module.exports = router;
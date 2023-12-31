const router = require("express").Router();
const User = require("../models/user.js");
const List = require("../models/list.js");

router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById( id );

        if (existingUser) {
            const list = new List({ title, body, user: existingUser });

            // Save the list item to the database
            await list.save();

            // Add the newly created list item to the user's list array
            existingUser.list.push(list);

            // Save the user with the updated list array
            await existingUser.save();

            // Send a response with the added list item and associated user data
            res.status(200).json({ list });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.put("/updateTask/:id", async (req, res) => {
    try {
        // const { title, body, email } = req.body;
        // const existingUser = await User.findOne({ email });

        //if (existingUser) {
           // const listBelongsToUser = existingUser.list.includes(req.params.id);

            // if (existingUser) {
                // Update the list item using findByIdAndUpdate
                const {title,body}=req.body;
                const updatedList = await List.findByIdAndUpdate(
                    req.params.id,
                    { title, body },
                    { new: true } // This option returns the updated document
                );

                if (updatedList) {
                    res.status(200).json({ message: "List is updated", list: updatedList });
                } else {
                    res.status(404).json({ message: 'List not found' });
                }
            // } else {
                // res.status(403).json({ message: 'List does not belong to the user' });
            // }
        } /* else {
            res.status(404).json({ message: 'User not found'});
        } */
     catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const {  id } = req.body;
        const existingUser = await User.findByIdAndUpdate( id ,{$pull:{list:req.params.id}});

        //if (existingUser) {
           // const listBelongsToUser = existingUser.list.includes(req.params.id);

            if (existingUser) {
                // Update the list item using findByIdAndUpdate
                const updatedList = await List.findByIdAndDelete(
                    req.params.id,
                );

                if (updatedList) {
                    res.status(200).json({ message: "Task is deleted", list: updatedList });
                } else {
                    res.status(404).json({ message: 'List not found' });
                }
            } else {
                res.status(403).json({ message: 'List does not belong to the user' });
            }
        } /* else {
            res.status(404).json({ message: 'User not found'});
        } */
     catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get("/getTask/:id",async(req,res)=>{
    try{
        const list=await List.find({user:req.params.id}).sort({createdAt:-1});
        if(list.length!==0){
            res.status(200).json({list});
        }else{
            res.status(200).json({message:"There is no tasks"})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

module.exports = router;

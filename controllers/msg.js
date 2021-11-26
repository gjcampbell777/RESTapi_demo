const Msg = require('../models/msg'); //import msg model

//GET all messages
const getAllMsg = (req, res) => {

    // Get info for the database and returns json data along with a 200 status code
    // or returns the error json with 404
    Msg.find({}, (err, data)=>{
        if (err){
            return res.status(404).json({Error: err});
        }
        return res.status(200).json(data);
    })
};

//GET message based on id
const getOneMsg = (req, res) => {

    // Finds the id within the database and returns json data along with a 200 status code
    // returns the error json with 404 if an error is returned
    // or it is assumed the message doesnt exist so a 400 message is returned instead
    Msg.findOne({id:req.params.id}, (err, data) => {
        if(data) {
            return res.status(200).json(data);
        }else{
            if(err) return res.status(404).json(`Something went wrong, please try again. ${err}`);
            return res.status(400).json({message: "Message can't be found, it doesn't exist."});
        }  
    });
};

//POST message
const newMsg = (req, res) => {

    //check if the id already exists in db
    Msg.findOne({ id:req.params.id }, (err, data) => {

        //if this message is not in db, add it
        if (!data) {
            //create a new Msg object using the Msg model, req.params and req.body
            const newMsg = new Msg({
                id:req.params.id,
                message:req.body.message,
                time: Date.now(),
            })

            // save this object to database
            newMsg.save((err, data)=>{
                if(err) return res.status(404).json({Error: err});
                return res.status(201).json(data);
            })
        //if there's an error or the message is already in db, return an error message         
        }else{
            if(err) return res.status(404).json(`Something went wrong, please try again. ${err}`);
            return res.status(400).json({message:"Message can't be posted. A message with that id already exists."});
        }
    })    
};

//PUT message based on id
const updateMsg = (req, res) => {

    // Finds the id within the database and updates json data along with a 200 status code
    // returns the error json with 404 if an error is returned
    // or it is assumed the message doesnt exist so a 400 message is returned instead
    Msg.findOneAndUpdate({id:req.params.id}, {message:req.body.message}, {new: true}, (err, data) => {
        if (data) {
            return res.status(201).json(data);        
        }else{
            if(err) return res.status(404).json(`Something went wrong, please try again. ${err}`);
            return res.status(400).json({message:"Message can't be updated, it doesn't exist."});
        }
    })    
};

//DELETE all messages
const deleteAllMsg = (req, res) => {

    // Deletes all info from database and returns a json message and a 200 status code
    // or returns the error json with 404
    Msg.deleteMany({}, err => {
        if(err) {
          return res.status(404).json({message: "Deletion of all messages failed"});
        }
        return res.status(200).json({message: "Deletion of all messages successful"});
    })
};

//DELETE message based on id
const deleteOneMsg = (req, res) => {

    // Finds the id within the database and removes json data along with a 200 status code
    // returns the error json with 404 if an error is returned
    // or it is assumed the message doesnt exist so a 400 message is returned instead
    Msg.deleteOne({id:req.params.id}, (err, data) => {
        if (err) return res.status(404).json(`Something went wrong, please try again. ${err}`);
        else if( data.deletedCount == 0) return res.status(400).json({message: "Message can't be deleted, it doesn't exist."});
        else return res.status(200).json({message: "Message deleted."});
    });
};

//export controller functions
module.exports = {
	getAllMsg,
    getOneMsg,
	newMsg,
    updateMsg,
	deleteOneMsg,
    deleteAllMsg
};
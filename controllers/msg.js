const Msg = require('../models/msg'); //import msg model


//GET all messages
const getAllMsg = (req, res) => {
    Msg.find({}, (err, data)=>{
        if (err){
            return res.status(404).json({Error: err});
        }
        return res.status(200).json(data);
    })
};

//POST message
const newMsg = (req, res) => {

    //check if the id already exists in db
    Msg.findOne({ id:req.params.id }, (err, data) => {

        //if this message is not in db, add it
        if (!data) {
            //create a new msg object using the Msg model and req.params
            const newMsg = new Msg({
                id:req.params.id,
                message:req.params.message,
                time: Date.now(),
            })

            // save this object to database
            newMsg.save((err, data)=>{
                if(err) return res.status(404).json({Error: err});
                return res.status(201).json(data);
            })
        //if there's an error or the msg is in db, return an error message         
        }else{
            if(err) return res.status(404).json(`Something went wrong, please try again. ${err}`);
            return res.status(400).json({message:"Message can't be posted. A message with that id already exists."});
        }
    })    
};

//DELETE all messages
const deleteAllMsg = (req, res) => {
    Msg.deleteMany({}, err => {
        if(err) {
          return res.status(404).json({message: "Deletion of all messages failed"});
        }
        return res.status(200).json({message: "Deletion of all messages successful"});
    })
};

//GET message based on id
const getOneMsg = (req, res) => {

    //find the specific msg with that id
    Msg.findOne({id:req.params.id}, (err, data) => {
    if(err || !data) {
        return res.status(400).json({message: "Message can't be found, it doesn't exist."});
    }
    else return res.status(200).json(data); //return the msg object if found
    });
};

//PUT message based on id
const updateMsg = (req, res) => {

    //check if the id already exists in db
    Msg.findOneAndUpdate({id:req.params.id}, {message:req.params.message}, {new: true}, (err, data) => {

        //if this message is in db, update it
        if (data) {
            return res.status(201).json(data);
        //if there's an error or the msg is in db, return an error message         
        }else{
            if(err) return res.status(404).json(`Something went wrong, please try again. ${err}`);
            return res.status(400).json({message:"Message can't be updated, it doesn't exist."});
        }
    })    
};

//DELETE message based on id
const deleteOneMsg = (req, res) => {

    Msg.deleteOne({id:req.params.id}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.status(400).json({message: "Message can't be deleted, it doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.status(404).json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.status(200).json({message: "Message deleted."});
    });
};

//export controller functions
module.exports = {
	getAllMsg,
	newMsg,
	deleteAllMsg,
	getOneMsg,
    updateMsg,
	deleteOneMsg
};
const Msg = require('../models/msg'); //import msg model


//GET all messages
const getAllMsg = (req, res) => {
    Msg.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

//POST message
const newMsg = (req, res) => {
    let id = req.params.id; //get the msg id
    let msg = req.params.message; //get the msg message

    //check if the id already exists in db
    Msg.findOne({ id:id }, (err, data) => {

        //if this message is not in db, add it
        if (!data) {
            //create a new msg object using the Msg model and req.params
            const newMsg = new Msg({
                id:id,
                message:msg,
                time: Date.now(),
            })

            // save this object to database
            newMsg.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if there's an error or the msg is in db, return an error message         
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"Message can't be posted. A message with that id already exists."});
        }
    })    
};

//DELETE all messages
const deleteAllMsg = (req, res) => {
    Msg.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Deletion of all messages failed"});
        }
        return res.json({message: "Deletion of all messages successful"});
    })
};

//GET message based on id
const getOneMsg = (req, res) => {
    let id = req.params.id; //get the msg id

    //find the specific msg with that id
    Msg.findOne({id:id}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Message can't be found, it doesn't exist."});
    }
    else return res.json(data); //return the msg object if found
    });
};

//PUT message based on id
const updateMsg = (req, res) => {
    let id = req.params.id; //get the msg id
    let msg = req.params.message; //get the msg message

    //check if the id already exists in db
    Msg.findOne({ id:id }, (err, data) => {

        //if this message is not in db, add it
        if (data) {
            //create a new msg object using the Msg model and req.params
            const newMsg = new Msg({
                id:id,
                message:msg,
                time: Date.now(),
            })

            Msg.deleteOne({id:id}, (err, data) => {
            //if there's an error, return the err message
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            });

            // save this object to database
            newMsg.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if there's an error or the msg is in db, return an error message         
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"Message can't be updated, it doesn't exist."});
        }
    })    
};

//DELETE message based on id
const deleteOneMsg = (req, res) => {
    let id = req.params.id; // get the id of msg to delete

    Msg.deleteOne({id:id}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "Message can't be deleted, it doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.json({message: "Message deleted."});
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
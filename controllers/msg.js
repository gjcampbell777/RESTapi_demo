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
    //check if the id already exists in db
    Msg.findOne({ id: req.body.id }, (err, data) => {

        //if tea not in db, add it
        if (!data) {
            //create a new tea object using the Msg model and req.body
            const newMsg = new Msg({
                id:req.body.id,
                message: req.body.message,
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
            return res.json({message:"Msg already exists"});
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
        return res.json({message: "Message doesn't exist."});
    }
    else return res.json(data); //return the msg object if found
    });
};

//DELETE message based on id
const deleteOneMsg = (req, res) => {
    let id = req.params.id; // get the id of msg to delete

    Msg.deleteOne({id:id}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "Message doesn't exist."});
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
	deleteOneMsg
};
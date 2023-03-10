const router = require('express').Router();
let User = require('../Models/user.model');

router.route('/').get((req,res)=>{
    User.find()  // Mongoose Find method
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()   //Mongoose Save method
    .then(()=> res.json("User added!"))
    .catch(err=> res.status(400).json('Error : '+err))
});

// get the single user
router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then((user)=>res.json(user))
    .catch((err)=>res.status(400).json("Error !"+err))
})


//update
router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then((user)=>{
        user.username = req.body.username

        user.save()
        .then(()=>res.json("Updated User"))
        .catch((err)=>res.status(400).json("Error : "+err))
    })
    .catch((err)=>res.status(400).json("Error : "+err))
})


//Delete 
router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Deleted"))
    .catch((err)=>res.status(400).json("Error : "+err))
})


module.exports = router;
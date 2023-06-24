const {User} = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})


router.get(`/:id`, async (req, res) => {
    const users = await User.findById(req.params.id).select("-passwordHash");

    if (!users) {
        res.status(500).json({message:"the user with the given id was not found"})
    }
    res.status(200).send(users);
})



router.post(`/`, async (req, res) => {
    let users = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    users = await users.save();

    if (!users)
        return res.status(400).send("the user cannot be registered!")
    
    res.send(users)
})



router.put(`/:id`, async (req, res) => {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = userExist.passwordHash;
    }

    const users = await User.findByIdAndUpdate(
        req.params.id,
        {
        name: req.body.name,
        email: req.body.email,
        passwordHash: newPassword,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country 
        },
        { new: true }
    )
    if (!users) 
        return res.status(400).send("the user cannot be created!")
    
        res.send(users)
})



router.post(`/login`, async (req, res) => {
    console.log(req.body)
    let users = await User.findOne({ email: req.body.email });
    const secret = process.env.secret;
    if (!users) {
        return res.status(400).send("the user not found")
    }
    if (users && bcrypt.compareSync(req.body.password, users.passwordHash)) {
        const token = jwt.sign(
            {
                userId: users.id,
                isAdmin: users.isAdmin
            },
            secret,
            { expiresIn: '1w' }
        )
        res.status(200).send({user: users.email, token: token, message: "login successfully"});
    } else {
        res.status(400).send({message:"password is wrong"});
    }

})

// var token = undefined;
// var newOTPVerification;

// let transporter = nodemailer.createTransport({
//     host: 'smpt.host.com',
//     auth: {

//         user: 'abhishekranjansrivastava19@gmail.com',
//         pass: "Abhi@123"
//     }
// })

// router.post('/login', async (req, res) => {
//     let user = await User.findOne({ email: req.body.email });

//     let [first, second] = Object.keys(req.body);
//     // console.log(first , second);
//     if (Object.keys(req.body).length > 2 || first != 'email' || second != 'password') {
//         res.json({ success: "False", message: "Please donot add Extra/Invalid/Empty fields in the Request Body" });
//     }
//     else {
//         if (!req.body.email) {
//             res.json({ success: false, message: "Please provide a Email_ID" });
//         }
//         else {
//             if (!req.body.password) {
//                 res.json({ success: false, message: "Please provide a password" });
//             }
//             else {
//                 //finding user in database
//                 // will get either error or user
//                 User.findOne({ email: req.body.email }, (err) => {
//                     if (err) {
//                         res.json({ success: false, message: err })
//                     }
//                     else {
//                         if (!user) {
//                             res.json({ success: false, message: "User Not Found!!" })
//                         }
//                         else {
//                             // Decrypt password method we created in user.js , will use that method
//                             // const email=req.body.email;
//                             if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
                                       
//                                         res.status(400).send({message:"password is wrong"});
//                                     }
//                             else {
//                                 // encrypting userid and using secret token to let browser know that particular user sign in 
//                                 // userId coming from user object above we use if(!user)  // user will log out in 24h


//                                 // test this in postman and create some function for login in authservice




//                                 // OTP :

//                                token = jwt.sign({ email: user._id }, secret, { expiresIn: '360s' });

                                



//                                 const sendOTPVerificationEmail = async (email, _id, res) => {
//                                     try {
//                                         const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//                                         const mailOptions = {
//                                             from: 'abhishekranjansrivastava19@gmail.com',
//                                             to: email,
//                                             subject: "Email Verification !!",
//                                             html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete LOGIN  </p>
//                                          <p><b> This OTP is going to be expired in an hour !! </b></p>
//                                          `
//                                         }


//                                         newOTPVerification = await new UserOTPVerification(
//                                             {
//                                                 userID: _id,
//                                                 OTP: otp,
//                                                 createdAt: Date.now(),
//                                                 expiresAt: Date.now() + 10,
//                                                // Token: token
//                                             }
//                                         );
//                                         await newOTPVerification.save(),
//                                             await transporter.sendMail(mailOptions);
//                                         // return newOTPVerification._id;




//                                     }
//                                     catch (error) {
//                                         console.log("Error !!", error);
//                                     };


//                                 }
//                                 //const ID = 
//                                 sendOTPVerificationEmail(user.email, user._id)
//                                    .then((id) => {
//                                        console.log("id ", id);
//                                         res.json({ success: true, message: "Valid User !! Otp is sent to user's email id "/*and your token will expire in 360 seconds ", token: token*/, email: user.email });

//                                    })

//                             }
//                         }
//                     }
//                 }
//                 )


//             }
//         }
//     }
// });
// router.post('/:otp', async (req, res) => {
//     console.log(req.params);
//     UserOTPVerification.findOne({ OTP: req.params.otp }, async (err, user) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             if (!user) {
//                 res.send({ message: "Invalid OTP !!" })
//             }

//             else {
//                 token = jwt.sign({ email: user._id }, secret, { expiresIn: '360s' });
                
//                 Secrettoken = await new tokenkey(
//                     {
//                         Token: token
//                     }
//                 );
//                 await Secrettoken.save(),
//              res.send({Token : token , message : "Token got created !!" , id : Secrettoken._id})
//             }
//         }
//     }
//     )
// })


router.post('/register', async (req,res)=>{
    let users = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    users = await users.save();

    if(!users)
    return res.status(400).send('the user cannot be created!')

    res.send(users, {message: "registered successfully"});
})


router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(users =>{
        if(users) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})


module.exports = router;
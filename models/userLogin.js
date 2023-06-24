// const mongoose=require('mongoose');
// const bcrypt =require('bcrypt-nodejs');
// const { Auth } = require("two-step-auth")

// let emailLengthChecker=(email) =>
// {
//     if(!email)
//     {
//         return false;
//     }
//     else
//     {
//         if(email.length < 5 || email.length > 30)
//         {
//             return false;
//         }
//         else
//         {
//             return true;
//         }
//     }
// };

// let validEmailChecker =(email)=>
// {
//     if(!email)
//     {
//         return false;
//     }
//     else{
//         const regExp=new RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
//         return regExp.test(email);
//     }
// }

// const emailValidators =[
//     {
//         validator : emailLengthChecker , message : 'Email must be atleast 5 character but not more than 30 characters'
//     },
//     {
//         validator : validEmailChecker , message : 'Please enter a valid Email!!'
//     }
// ];

// let passwordLengthChecker=(password) =>
// {
//     if(!password)
//     {
//         return false;
//     }
//     else
//     {
//         if(password.length < 5 || password.length > 30)
//         {
//             return false;
//         }
//         else
//         {
//             return true;
//         }
//     }
// };

// let validPasswordChecker =(password)=>
// {
//     if(!password)
//     {
//         return false;
//     }
//     else{
//         const regExp=new RegExp( /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
//         return regExp.test(password);
//     }
// }

// const passwordValidators =[
//     {
//         validator : passwordLengthChecker , message : 'Password must be atleast 5 character but not more than 30 characters'
//     },
//     {
//         validator : validPasswordChecker , message : 'Your Password must have atleast 1 UPPERCASE , 1 LOWERCASE , 1 SPECIALCASE and 1 NUMBER  '
//     }
// ];

// const userSchema = mongoose.Schema({
//         name: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true
//         },
//         passwordHash: {
//             type: String,
//             required: true
//         },
//         phone: {
//             type: String,
//             required: true
//         },
        
//     });

// // const userSchema=mongoose.Schema(
// //     {
// //     email: {type:String ,unique:true,required:true  ,validate :emailValidators},
// //     password : {type:String ,required:true }//, validate :passwordValidators }
// //     }
// // )

// // creating middleware so before this schema is saved pls perform this middleware 
// // Middleware will encrypt the password

// // encrypting password

// userSchema.pre('save' , function(next)
// {
//    if(!this.isModified('password'))
//    {
//     return next();
//    } 
//    bcrypt.hash(this.password,null,null,(err,hash)=>
//    {
//     if(err)
//     return next(err);

//     this.password=hash;
//     next();
//    });
// });
// // Decrypting password to be used in login feature
// userSchema.methods.comparePassword = function(password)
// {
//     return bcrypt.compareSync(password,this.password);
// };


// // Exporting schema
// userSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// userSchema.set('toJSON', {
//     virtuals: true,
// });

// exports.UserLogin = mongoose.model("UserLogin", userSchema);
// exports.userSchema = userSchema;
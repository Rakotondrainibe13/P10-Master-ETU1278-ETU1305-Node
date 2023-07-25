
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const maxAge = 3 * 24 * 60 * 60 * 1000;


function sendResult(res, result) {
    return res.status(200).json({
        result
    });
}
function sendErreur(res, message) {
    res.status(202).json({
        message: message
    })
}


async function redirectLogin(res){
    return res.redirect('/');
}

module.exports = (req,res,next)=>{
    try {
        // const token= req.body.token;
        // const token= req.headers.authorization.split(" ")[1];
        // req.iduser = jwt.verify(token,"NOTESAPI").id;
        // req.token=token;
        // res.json({"token": token});
        const token= req.headers.token.split(" ")[1];
        // const token =req.cookies.jwt;
        if(token){
            jwt.verify(token,"NOTESAPI",async(err,decodedToken)=>{
                if(err){
                    res.locals.user =null;
                    // res.cookie("jwt",'',{maxAge:1});
                    sendErreur(res,"Token invalide");
                    // redirectLogin();
                    // return res.status(200).json({message :"token invalide",err})
                }
                else{
                    res.cookie('jwt', token, {
                        httpOnly: false,
                        maxAge: maxAge
                    });
                    let user = await User.findById(decodedToken.id);
                    res.locals.user =user;
                    console.log("vous etes connecté");
                    next();
                }
            })
        }
        else {
            redirectLogin(res);
            // return res.status(404).json({msg: "vous n'etes pas connecté"})
        }
    } catch (error) {
        console.log(error);
        redirectLogin(res);
        sendErreur(res,"Pas de Token trouvé");
        // return res.status(200).json({message :"token invalide",error})
    }
}
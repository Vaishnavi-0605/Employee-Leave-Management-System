exports.loginPage=(req,res)=>{
    res.render("index");
};


exports.login=(req,res)=>{

let {email,password}=req.body;


if(!email || !password){
    return res.send("Please provide details");
}


res.redirect("/dashboard");

};



exports.register=(req,res)=>{
    res.render("register");
};
const express = require("express");
const router = express.Router();
const logged = require("../controllers/logged")
const logout = require("../controllers/logout")

router.get("/", logged ,(req,res)=>{
    if (req.user) {
        res.render("index",{status:"logged", user:req.user}
        )
    } else {
        res.render("index",{ status:'void', user:'no user' })
    }
})
router.get("/register",(req,res)=>{
    res.sendFile("register.html", { root: "./public/"})
})
router.get("/login",(req,res)=>{
    res.sendFile("login.html", { root: "./public/"})
})

router.get("/profile=14", (req,res)=>{
    res.sendFile("profile=14.html", { root: "./public"})
})
router.get("/logout", logout)

module.exports = router;
const express = require("express");
const session = require("express-session");

const datas = require("./products.json");
const randomNumber = require("./utils/index.js");

const app = express();
const PORT = 9000;

app.set("views", "./src/views")
   .set("view engine", "ejs")
   .use(express.static("public"))
   .use(express.urlencoded({extended: true}))
   .use(session({
        secret: "Jxd1ktmDaHByoQ4r0KpIQ028EVjyqqfm",
        resave: false,
        saveUninitialized: false,
    }))
    .use((req, res, next)=> {
        if( !req.session.user ) req.session.user = { isLogged : false, email : null }
        next();
});

app.get("/", (req, res) => {
    const randomDatas = [...datas];
    const datasToDisplay = 3;
    for (let i = 0; i < datas.length - datasToDisplay ; i++) {
        const index = randomNumber(0, randomDatas.length -1);
        randomDatas.splice(index, 1 );
    }
    res.status(200).render("layout", {template: "./home", randomDatas, user: req.session.user });
});

app.get("/product", (req, res) => {      
    res.status(200).render("layout", {template: "./product/all", datas, user: req.session.user });
});

app.get("/product/:id", (req, res) => {
    const data = datas.find((data) => data.id === parseInt(req.params.id));
    res.status(200).render("layout", {template: "./product/one", data, user: req.session.user });
});

app.get("/search", (req, res) => {  
    const search = datas.filter((data) => data.label.toLowerCase().includes(req.query.search.toLowerCase()));
    res.status(200).render("layout", {template: "./search", search, user: req.session.user});
});

app.post("/search", (req, res) => {    
    res.redirect(`/search?search=${req.body.search}`);
});

// USER
app.get("/user/signin", (req, res) => {
    res.status(200).render("layout", {template: "./user/signin", user: req.session.user});
});

app.post("/user/signin", (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.redirect("/user/signin");
        return;
    };
    req.session.user = { isLogged: true, email: req.body.email };
    res.redirect("/");
});

app.get("/user/signup", (req, res) => {
    res.status(200).render("layout", {template: "./user/signup", user: req.session.user});
});

app.get("/user/signout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
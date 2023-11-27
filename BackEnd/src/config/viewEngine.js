import express from "express"
// import homepage from "../views/homepage"

let configViewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine","ejs")
    app.set("views","./src/views")
}

module.exports = configViewEngine
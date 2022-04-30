const initialConfig = require("./config")
const mongoose = require("mongoose")

const mongoUrl = initialConfig.getUrl()
console.log(mongoUrl)

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => {

    console.log("conected to products db sucsessfully ");

}).catch((err) => {
    console.log("Connection to product db failed", err)
})





module.exports = { mongoose }
const { mongoose } = require("./mongo-db-connect")
const { nanoid } = require("nanoid")

let reciboSchema = mongoose.Schema({
    owner: { type: String },
    fecha: { type: String },
    address: { type: String },
    list: [{
        producto: {
            type: String
        },
        cantidad: Number
    }],
    total: { type: Number }
})

reciboSchema.statics.saveRecibo = async (recibo) => {
    var today = new Date();
    recibo.fecha = today.getMonth() + '/' + today.getDay() + '/' + today.getFullYear();
    let reciboToSave = Recibo(recibo);
    return await reciboToSave.save();

}

reciboSchema.statics.getRecibos = async (filtro) => {
    console.log("|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|")
    console.log("|                             |");
    console.log("|    ejecutando getRecibos    |");
    console.log("|                             |");
    console.log("|_____________________________|")
    return await Recibo.find(filtro);
}


reciboSchema.statics.getLastRecibos = async (filtro) => {
    console.log("|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|")
    console.log("|                             |");
    console.log("|          ejecutando         |");
    console.log("|        getLastRecibos       |");
    console.log("|_____________________________|");
    
    return await Recibo.find(filtro).sort({ _id: -1 }).limit(1);

}
const Recibo = mongoose.model("Recibo", reciboSchema);

module.exports = { Recibo }
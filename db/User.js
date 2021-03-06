const { mongoose } = require("./mongo-db-connect");
const { nanoid } = require("nanoid");
const { getHash } = require("../utils/crypt");
const { Console } = require("console");

let usersSchema = mongoose.Schema(
    {
        id: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        carrito: [{
            producto: {
                type: String
            },
            cantidad: Number
        }]
    }
)

usersSchema.statics.login=async(username)=>{

        let filtro= {username:username}
      
        return await User.find(filtro);
}

usersSchema.statics.getUsers = async (filtro, isAdmin) => {
    let project = { _id: 0, id: 1, name: 1, username: 1, email: 1 ,carrito:1}
    let search = { $or: filtro }
    if (isAdmin)
        project.password = 1;
    return await User.find(filtro, project);
}

usersSchema.statics.existeUser = async (username)=>{
    return await User.findOne({ username });
}

usersSchema.statics.getUser = async (id) => {
    return await User.findOne({ id });
}

usersSchema.statics.deleteUser = async (id) => {
    return await User.findOneAndDelete({ id })
}
usersSchema.statics.updateCart = async (user,cart) => {
    return await User.findOneAndUpdate({ email: user.email}, { carrito: cart })
}
usersSchema.statics.updateUser = async (user,passwordChange=false) => {
    return await User.findOneAndUpdate({ id: user.id }, { $set: user }, { new: true })
}

usersSchema.statics.findUser= async (query)=>{

    let user = await User.find(query);
    return user
}

usersSchema.statics.saveUser = async (user) => {
    user.id = nanoid();
    user.password = await getHash(user.password);
    user.carrito = [];
    let userToSave = User(user);
    console.log(userToSave);
    return await userToSave.save();
}

const User = mongoose.model("User", usersSchema);

module.exports = { User }


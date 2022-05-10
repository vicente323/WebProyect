const bcrypt = require("bcryptjs");
const { get } = require("express/lib/response");
const { resolve } = require("path");


function getHash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 8, (err, hash) => {
            if (hash) {
                resolve(hash);
            }
            if (err) {
                reject(err);
            }
        })
    });
}


async function   compareHash(password1,password2) {
    









    return  bcrypt.compareSync(password1,password2);
       

    
}

module.exports = { getHash,compareHash }
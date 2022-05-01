
/** 
    * * Configures the basics of products
    * *Only for products if you want access to a diferent schema change dbName or create a new db  

*/
module.exports={


    dbUser:"testing",
    dbPassword:"HardPassword",
    dbName:"ProductsDB",
    getUrl: function(){

        return `mongodb+srv://${this.dbUser}:${this.dbPassword}@proyectwebcluster.m0zvr.mongodb.net/${this.dbName}?retryWrites=true&w=majority`

    }
}
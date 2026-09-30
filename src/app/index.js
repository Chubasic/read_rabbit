const database = require('database');

exports.start = async ()=>{
    try {
        await database.connect();
        console.log("Connected to DB");
    }catch (e) {
        console.log(`Error occurred ${e}`);
    }
};

const {MongoClient, ObjectId} = require("mongodb");
require("dotenv").config();

const dbConnection = new MongoClient(process.env.dbConnectionUrl);
const dbName = process.env.dbName;

const main = async ()=>{
    await dbConnection.connect();
    console.log("Connected to DBConnection Successfully");

    const db = dbConnection.db(dbName);

    // const usersCollection = db.collection("users");
    // usersCollection.insertOne({
    //     name: "Ali G",
    //     username: "aligg",
    //     email: "aliGG@test.ir",
    //     crime: 0,
    //     role: "ADMIN"
    // })


    // * insertOne

    // const booksCollection = db.collection("books");
    // booksCollection.insertOne({
    //     title: "Golestan",
    //     author: "sadi",
    //     price: 240000,
    //     free: 1
    // })

    
    // * insertMany

    // const rentsCollection = db.collection("rents");
    // rentsCollection.insertMany([
    //     {
    //         userID: 1,
    //         bookID: 4
    //     },
    //     {
    //         userID: 2,
    //         bookID: 1
    //     }
    // ])


    // * FindOne | FindMany

    // const usersCollection = db.collection("users");
    // const noCrimeUsers = await usersCollection.findOne({ username: "aligg" });
    // const mainUser = await usersCollection.findOne({})
    // const mainUser = await usersCollection.findOne({
    //     name: "Erfan G",crime: 12000
    // });
    // console.log(mainUser);


    // * DeleteOne | DeleteMany | FindOneAndDelete

    // const rentsCollection = db.collection("rents");
    // const deleteResult = await rentsCollection.deleteOne({_id: new ObjectId('66a2c4d7eaa826ee9ac55a06'),});

    // const deleteResult = await rentsCollection.findOneAndDelete({
    //     _id: new ObjectId("66a2c4d7eaa826ee9ac55a07")
    // })

    // const deleteResult = await rentsCollection.deleteMany({
    //     userID: 1
    // })

    // * UpdateOne | UpdateMany | FindOneAndUpdate

    // const rentsCollection = db.collection("rents");
    // const result = await rentsCollection.updateOne({userID: 1},{
    //     $set: {
    //         bookID: 10
    //     }
    // })

    // const result = await rentsCollection.updateMany({bookID:1},{
    //     $set: {
    //         bookID: 50,
    //         userID: 5
    //     }
    // })
    // const result = await rentsCollection.findOneAndUpdate({_id: new ObjectId("66a34dfa6486cd35818c2ab5")},{
    //     $set: {
    //         bookID: 90
    //     }
    // })


    // * ReplaceOne | FindOneAndReplace

    // const rentsCollection = db.collection("users");
    // // const result = await rentsCollection.replaceOne({username: "achovfx"},{
    // //     score: 20,
    // //     name: "Erfan Gandomrizi"
    // // })
    // const result = await rentsCollection.findOneAndReplace({username: "achovfx"},{
    //     score: 20,
    //     name: "Erfan Gandomrizi"
    // })


    // const usersCollection = db.collection("users");
    // const result = await usersCollection.insertOne({
    //     name: "Erfan Gandomrizi",
    //     username: "Achovfx",
    //     age: 17,
    //     email: "achovfx@gmail.com",
    //     tags: ["frontend",'backend', 'seo'],
    //     address:{
    //         country: "Iran",
    //         province: "Bushehr",
    //         city: "Borazjan"
    //     }
    // })

    // const usersList = await usersCollection.find({}).toArray();

    // * Best Oprators for Search and Find
    // const usersCollection = db.collection("users");
    // const result = await usersCollection.find({
        // role: { $ne: "USER" }
        // role: { $eq: "USER" }
        // crime: {$lt: 13000}  Crime < 13_000
        // crime: {$lte: 12000} Crime <= 12_000
        // crime: {$gt: 12000} Crime > 12_000
        // crime: {$gte: 12000} Crime >= 12_000
        // crime: {$in: [12,22,90]} Crime Include (12 OR 22 OR 90)
        // crime: {$nin: [12,22]}  Crime Not In (12 AND 22)
        // $or: [{crime: {$in: [22,90]}},{ age: 18}]

    // }).toArray();

    // sassssssssssss
    const usersCollection = await db.collection("users");
    const result = await usersCollection.updateMany

    console.log(result);


    return "Done";
};

main();
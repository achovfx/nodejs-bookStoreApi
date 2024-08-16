require("dotenv").config();
const http = require("http");
const fs = require("fs");
const url = require("url");
const db = require("./db.json");

const bookController = require("./controllers/bookController");

const server = http.createServer((req,res)=>{
    if (req.method === "GET" && req.url === "/api/users"){
        fs.readFile("db.json", (err,db)=>{
            if (err){
                throw err;
            }
            const data = JSON.parse(db);

            res.writeHead(200, {'Content-Type': "application/json"});
            res.write(JSON.stringify(data.users));
            res.end();
        })
    }else if (req.method === "GET" && req.url === "/api/books"){
        bookController.getAll(req,res);
    }else if(req.method === "DELETE" && req.url.startsWith("/api/books")){
        bookController.removeOne(req,res);
    }else if(req.method === "PUT" && req.url.startsWith("/api/books/back")){
        bookController.backOne(req,res);
    }else if (req.method === "POST" && req.url === "/api/books"){
        bookController.newBook(req,res);
    }else if (req.method === "PUT" && req.url.startsWith("/api/books")){
        bookController.updateBook(req,res);
    }else if(req.method === "POST" && req.url === "/api/users"){
        let user = "";
        req.on('data',(data)=>{
            user += data.toString();
        })

        req.on("end", ()=>{
            const { name, username, email } = JSON.parse(user);

            const isUserExist = db.users.find(user => user.email === email || user.username === username)

            if (name === '' || username === '' || email === '') {
                res.writeHead(201, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: `User data is not valid.`, code: 422}));
                res.end();
            }else if (isUserExist){
                res.writeHead(409, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: `This User already is exist.`, code: 409}));
                res.end();
            }else{
                const newUser = {
                    id: db.users.length + 1,
                    name,
                    username,
                    email,
                    crime: 0,
                    role: "USER",
                };
                db.users.push(newUser);

                fs.writeFile('./db.json', JSON.stringify(db),(err)=>{
                    if (err){
                        throw err;
                    }
                    res.writeHead(201, {"Content-Type": "application/json"});
                    res.write(JSON.stringify({message: `New User Registered Successfully`, code: 201}));
                    res.end();
                })
            }

        })
    }else if(req.method === "PUT" && req.url.startsWith("/api/users/upgrade")){
        const parsedUrl = url.parse(req.url, true)
        const userID = parsedUrl.query.id;

            db.users.forEach((user) =>{
                if (user.id === Number(userID)){
                    user.role = "ADMIN";
                }
            });
            fs.writeFile("./db.json", JSON.stringify(db),(err)=>{
                if (err){
                    throw err;
                }

                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: `Uesr Upgraded Successfully`, code: 200}));
                res.end();
        });
    }else if(req.method === "PUT" && req.url.startsWith("/api/users")){
        const parsedUrl = url.parse(req.url, true)
        const userID = parsedUrl.query.id;
        let reqBody = "";

        req.on('data',(data)=>{
            reqBody += data.toString();
        });

        req.on("end",()=>{
            const { crime } = JSON.parse(reqBody);

            db.users.forEach((user) =>{
                if (user.id === Number(userID)){
                    user.crime = crime;
                }
            });
            fs.writeFile("./db.json", JSON.stringify(db),(err)=>{
                if (err){
                    throw err;
                }
                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: `Crime Set Successfully`, code: 200}));
                res.end();
            });
        });

    }else if(req.method === "POST" && req.url === "/api/users/login" ){
        let reqBody = "";

        req.on('data',(data)=>{
            reqBody += data.toString();
        });

        req.on("end",()=>{
            const { username , email } = JSON.parse(reqBody);

            let userAccount = db.users.find(user => user.username === username);

            if (userAccount){
                if (userAccount.email === email){
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.write(JSON.stringify({userAccount}));
                    res.end();
                } else {
                    res.writeHead(400, {"Content-Type": "application/json"});
                    res.write(JSON.stringify({message: `Password is not correct.`, code: 400}));
                    res.end();
                }
            }else{
                res.writeHead(401, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: `User Not Found.`, code: 401}));
                res.end();
            }
        });

    }else if(req.method === "POST" && req.url === "/api/books/rent"){
        let reqBody = "";

        req.on('data',(data)=>{
            reqBody += data.toString();
        });

        req.on("end",()=>{
            let {userID, bookID} = JSON.parse(reqBody);

            const isFreeBook = db.books.some(book => book.id === Number(bookID) && book.free === 1)


            if (isFreeBook){

                db.books.forEach(book=>{
                    if(book.id === +bookID){
                        book.free = 0;
                    }
                })

                const newRent = {
                    id: db.rents.length + 1,
                    userID,
                    bookID,
                };

                db.rents.push(newRent);

                fs.writeFile("./db.json", JSON.stringify(db),(err)=>{
                    if (err){
                        throw err;
                    }
                    res.writeHead(201, {"Content-Type": "application/json"});
                    res.write(JSON.stringify({message: `Book Reserved Successfully.`, code: 201}));
                    res.end();
                })
            }else{
                res.writeHead(401, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message: `This book is not Free.`, code: 401}));
                res.end();
            }
        })
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log("Server Running on Port", PORT);
})
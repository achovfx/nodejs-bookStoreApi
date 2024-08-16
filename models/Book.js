const fs = require("fs");
const db = require("./../db.json");

const find = () => {
    return new Promise((resolve, reject)=>{
        resolve(db.books);
    });
}

const remove = (bookID) => {
    return new Promise((resolve,reject)=>{
        let hasBook = db.books.find(book => book.id == bookID)

        if (hasBook){
            const newBooks = db.books.filter(book => book.id != bookID);

            fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify({...db,books: newBooks}), (err)=>{
                if (err){
                    reject(err);
                }

                resolve({message: "Book Deleted Successfully.",code: 200})
            })
        }else{
            resolve({message: "Book Not Found",code: 404})
        }
    })
}

const back = (bookID)=>{
    return new Promise((resolve,reject)=>{
        db.books.forEach(book=>{
            if (book.id === +bookID){
                book.free = 1;
            }
        })

        fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db),(err)=>{
            if (err){
                reject(err);
            }
            resolve({message:"Book Backed Successfully", code: 200})
        })
    })
}

const newBook = (newBook)=>{
    return new Promise((resolve,reject)=>{
        db.books.push(newBook);
        fs.writeFile(`${process.cwd()}/db.json`, JSON.stringify(db),(err)=>{
            if (err){
                reject(err);
            }
            resolve({message: "Book Created Successfully.", code: 201}); 
        })
    })
}

const updateBook = (reqBody, bookID)=>{
    return new Promise((resolve,reject)=>{
        db.books.forEach(book=>{
            if (book.id === +bookID){
                book.title = reqBody.title;
                book.author = reqBody.author;
                book.price = reqBody.price;
                book.free = reqBody.free;
            };
        })

        fs.writeFile("db.json", JSON.stringify(db),(err)=>{
            if(err){
                reject(err);
            }
            resolve({message:`Book with ID:${bookID} Updated.`, code: 200});
        })
    })
}

module.exports = {
    find,
    remove,
    back,
    newBook,
    updateBook,
}
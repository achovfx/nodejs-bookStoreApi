const url = require("url");
const BookModel = require("./../models/Book");

const getAll = async (req,res) => {
    const books = await BookModel.find();

    res.writeHead(200, {'Content-Type': "application/json"});
    res.write(JSON.stringify(books));
    res.end();
}

const removeOne = async (req,res) =>{
    const parsedUrl = url.parse(req.url, true)
    const bookID = parsedUrl.query.id;

    const removedBook = await BookModel.remove(bookID);
    res.writeHead(removedBook.code, {"Content-Type": "application/json"});
    res.write(JSON.stringify(removedBook));
    res.end();
}

const backOne = async (req,res) =>{
    const parsedUrl = url.parse(req.url, true)
    const bookID = parsedUrl.query.id;

    const backBook = await BookModel.back(bookID);

    res.writeHead(backBook.code, {"Content-Type": "application/json"});
    res.write(JSON.stringify(backBook));
    res.end();
}

const newBook = async (req,res) =>{
    let book = "";  
    req.on('data',(data)=>{
        book += data.toString();
    })

    await req.on('end', ()=>{
        const newBook = {id: crypto.randomUUID(), ...JSON.parse(book),free: 1};
        
        const createBook = BookModel.newBook(newBook);

        res.writeHead(createBook.code, {"Content-Type": "application/json"});
        res.write(JSON.stringify(createBook));
        res.end();
    })
}

const updateBook = async (req,res)=>{
    const parsedUrl = url.parse(req.url, true)
    const bookID = parsedUrl.query.id;

    let bookNewInfos = "";

    req.on('data',(data)=>{
        bookNewInfos += data.toString();
    })

    await req.on("end",()=>{
        const reqBody = JSON.parse(bookNewInfos);
        
        const editBook = BookModel.updateBook(reqBody,bookID);

        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({message: `Book with ID:${bookID} Updated.`, code: 200}));
        res.end();
    
    })
}

module.exports = {
    getAll,
    removeOne,
    backOne,
    newBook,
    updateBook,
}
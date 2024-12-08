const express = require('express');
const cors = require('cors'); // Import CORS
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

let booksCollection;

// MongoDB setup
const uri = "mongodb+srv://raymondinava:Vcv71hJudXn5@CapStoneCluster.xlvmu.mongodb.net/?retryWrites=true&w=majority&appName=CapStoneCluster";
const client = new MongoClient(uri); //Defined client
// Connect to MongoDB and initialize data
async function main() {
    try {
        await client.connect();
        const database = client.db('bookLibrary');
        booksCollection = database.collection('bookCollection');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
main();
// Reference collection 
let bookCollection;

// GET /books?avail=true|false - Return checked in/out
app.get('/books', async (req, res) => {
    try {
        const { avail } = req.query;
        let query = {};
        if (avail === 'true') query = { avail: true };
        else if (avail === 'false') query = { avail: false };

        const books = await booksCollection.find(query).toArray();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Error fetching books");
    }
});

// get for available books
app.get('/books/available', async (req, res) => {
    const books = await booksCollection.find({ avail: true }).toArray();
    res.json(books);
});

// get for unavailable books
app.get('/books/unavailable', async (req, res) => {
    const books = await booksCollection.find({ avail: false }).toArray();
    res.json(books);
});

// PUT /books/#id - Update a book by matching ID to check out
app.put('/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(bookId)) {
            return res.status(400).send('Invalid book ID'); // Bad request
        }

        const updates = req.body;

        // Validate request body
        if (!updates.hasOwnProperty('avail') || typeof updates.avail !== 'boolean') {
            return res.status(400).send('Invalid request body. "avail" must be a boolean.');
        }

        // Perform the update
        const result = await booksCollection.updateOne(
            { _id: new ObjectId(bookId) }, // Match book by ID
            { $set: updates } // Apply updates
        );

        if (result.matchedCount === 0) {
            return res.status(404).send('Book not found'); // 404: No book matches the ID
        }

        res.status(200).send('Book updated successfully'); // 200: Update successful
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Internal Server Error'); // 500: Catch-all error
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
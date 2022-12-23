const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('courses server!')
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@messengercluster.z2rf1zn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("programmingSchool");
        const coursesCollection = database.collection("courses");

        app.get('/courses', async (req, res) => {
            const query = {};
            const cursor = coursesCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
            console.log(result);
        })

        app.get('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await coursesCollection.findOne(query);
            res.send(result)
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(err => console.error(err))



// app.get('/courses', (req, res) => {
//     res.send(courses);
// })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
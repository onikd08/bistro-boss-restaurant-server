import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const port = process.env.PORT || 8000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@phero.kuclg9t.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("bistroDB");
    const menuCollection = database.collection("menu");
    const reviewsCollection = database.collection("reviews");

    // getAPI for all menu
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find({}).toArray();
      res.send(result);
    });

    // getAPI for all reviews
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find({}).toArray();
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server is running in port: ", port);
});

import express, { Request, Response } from "express";
import { MongoClient, Collection, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

const MONGO_URL = "mongodb://localhost:27017/devops-students";
const DB_NAME = "mydatabase";

interface User {
  _id?: ObjectId;
  name: string;
  email: string;
}

let usersCollection: Collection<User>;

// Connect to MongoDB and start the server
(async () => {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);
  usersCollection = db.collection<User>("users");

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();

app.use(bodyParser.json());
app.use(cors());

// GET all users
app.get("/users", async (req: Request, res: Response) => {
  const users = await usersCollection.find().toArray();
  res.json(users);
});

// GET a single user by ID
app.get("/users/:id", async (req: Request, res: Response) => {
  const id = new ObjectId(req.params.id);
  const user = await usersCollection.findOne({ _id: id });
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.json(user);
});

// CREATE a new user
app.post("/users", async (req: Request, res: Response) => {
  const user: User = req.body;
  const result = await usersCollection.insertOne(user);
  res.json(result);
});

// UPDATE a user by ID
app.put("/users/:id", async (req: Request, res: Response) => {
  const id = new ObjectId(req.params.id);
  const user: User = req.body;
  const result = await usersCollection.replaceOne({ _id: id }, user);
  if (result.modifiedCount === 0) {
    res.sendStatus(404);
    return;
  }
  res.json(user);
});

// DELETE a user by ID
app.delete("/users/:id", async (req: Request, res: Response) => {
  const id = new ObjectId(req.params.id);
  const result = await usersCollection.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
});

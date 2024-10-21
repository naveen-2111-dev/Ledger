import { MongoClient } from "mongodb";
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);
let collection;

export default async function ConnectDb() {
  try {
    await client.connect();
    const DB = client.db("Receptionist");
    collection = DB.collection("Ledger");
  } catch (err) {
    throw new Error("failed to connect",err);
  }

  return collection;
}
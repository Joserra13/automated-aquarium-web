import { MongoClient } from 'mongodb';

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI || "");
  
  try {
    await client.connect();
    const db = client.db("AutomatedAquarium");
    const collection = db.collection('FishFeeder');

    const mongoData = (await collection.find().sort({ timestamp: -1 }).limit(20).toArray()).reverse();

    // Log the data (optional)
    // mongoData.forEach(entry => {
    //   console.log(`${entry.timestamp} has ${entry.waterTemperature}`);
    // });
    
    return Response.json(mongoData);
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}`);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await client.close();
  }
}
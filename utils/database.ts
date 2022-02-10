import mongoose from 'mongoose';

interface Connection {
  isConnected?: boolean | number;
}

const connection: Connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('Already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use prev connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

function convertDocToObj(doc: any) {
  const newDoc = {
    ...doc,
    _id: doc._id.toString(),
    updatedAt: doc.updatedAt.toString(),
    createdAt: doc.createdAt.toString(),
  };

  return newDoc;
}
const db = { connect, disconnect, convertDocToObj };

export default db;

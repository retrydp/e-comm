// import { MongoClient, Db, MongoClientOptions } from 'mongodb';

// const { MONGODB_URI, MONGODB_DB } = process.env;

// type MongoConnection = {
//   client: MongoClient;
//   db: Db;
// };

// declare global {
//   namespace NodeJS {
//     interface Global {
//       mongo: {
//         conn: MongoConnection | null;
//         promise: Promise<MongoConnection> | null;
//       };
//     }
//   }
// }

// let cached = global.mongo;

// if (!cached) {
//   cached = global.mongo = { conn: null, promise: null };
// }

// async function connectToDatabase() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };

//     cached.promise = MongoClient.connect(
//       MONGODB_URI as string,
//       opts as MongoClientOptions
//     ).then((client) => {
//       return {
//         client,
//         db: client.db(MONGODB_DB),
//       };
//     });
//   }
//   cached.conn = await cached.promise;

//   return cached.conn;
// }

// export { connectToDatabase };

import mongoose, { ConnectOptions } from 'mongoose';

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

  const db = await mongoose.connect(
    process.env.MONGODB_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  );
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

const db = { connect, disconnect };

export default db;

import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { array } from 'yup/lib/locale';

const { MONGODB_URI, MONGODB_DB } = process.env;

type MongoConnection = {
  client: MongoClient;
  db: Db;
};

declare global {
  namespace NodeJS {
    interface Global {
      mongo: {
        conn: MongoConnection | null;
        promise: Promise<MongoConnection> | null;
      };
    }
  }
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(
      MONGODB_URI as string,
      opts as MongoClientOptions
    ).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;

  return cached.conn;
}

export { connectToDatabase };

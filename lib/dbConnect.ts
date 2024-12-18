import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI

let cached = global.mongoose || { conn: null, promise: null }
global.mongoose = cached // Assign to global

const dbConnect = async () => {
  if (cached.conn) return cached.conn

    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing')

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'gotienhung',
        bufferCommands: false
    }).then((moongose) => moongose.connection)

    cached.conn = await cached.promise

    return cached.conn
};

export default dbConnect;

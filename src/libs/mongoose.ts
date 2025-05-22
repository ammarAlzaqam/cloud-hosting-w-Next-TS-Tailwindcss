import mongoose, { Connection } from "mongoose";

interface DBConnect {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// تعريف عالمي
declare global {
  var mongoose: DBConnect | undefined;
}

// نحط الكاش هنا ونضمن إنه مش undefined
const globalWithMongoose = global as typeof globalThis & {
  mongoose?: DBConnect;
};

// نعمل التحقق هنا ونضمن إن cached مش undefined
const cached: DBConnect = globalWithMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

globalWithMongoose.mongoose = cached;

export default async function connectDB(): Promise<Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URL as string)
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

import mongoose from "mongoose";

export async function initializeDb() {
  try {
    mongoose.Promise = global.Promise;
    const options = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    };
    await mongoose.connect(process.env.MONGO_DB_URL, options);
    console.log('Db connected succesfuly.')
  } catch (error) {
    console.error(error.message);
  }
}

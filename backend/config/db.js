import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB Atlas cluster.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Print green confirmation log using ANSI escape codes
    console.log(`\x1b[32m🛸 Database Connected: Aether Atlas Core Active (Host: ${conn.connection.host})\x1b[0m`);
  } catch (error) {
    console.error(`\x1b[31m💥 Database Connection Drop Exception: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

export default connectDB;

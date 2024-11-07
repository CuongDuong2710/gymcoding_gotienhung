import mongoose from 'mongoose';

declare global {
    var mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
  }
}

// Ensure this file is treated as a module by exporting something
export {};

import mongoose from 'mongoose'

/**
 * Connects mongoose to remote MongoDB.
 */
export function connectMongoose () {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/test?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }
}

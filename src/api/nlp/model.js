import mongoose, { Schema } from 'mongoose'

const nlpSchema = new Schema({}, { timestamps: true })

nlpSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Nlp', nlpSchema)

export const schema = model.schema
export default model

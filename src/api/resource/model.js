import mongoose, { Schema } from 'mongoose'

const resourceSchema = new Schema({}, { timestamps: true })

resourceSchema.methods = {
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

const model = mongoose.model('Resource', resourceSchema)

export const schema = model.schema
export default model

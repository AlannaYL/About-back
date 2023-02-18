import { Schema, model } from 'mongoose'

const schema = new Schema({
  content: {
    type: String,
    required: [true, '缺少內容']
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: [true, '缺少內容']
  }
}, { versionKey: false })

export default model('abouts', schema)

import { Schema, model } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    required: [true, '缺少名稱']
  },
  name: {
    type: String,
    required: [true, '缺少主辦']
  },
  from: {
    type: Date,
    required: [true, '缺少起始日期']
  },
  to: {
    type: Date,
    required: [true, '缺少起結束日期']
  },
  place: {
    type: String,
    required: [true, '缺少地點']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  images: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    required: [true, '缺少價錢']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少狀態']
  },
  map: {
    type: String
    // google 地圖
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['展覽', '藝文', '活動'],
      message: '分類錯誤'
    }
  }
}, { versionKey: false })

export default model('exhibitions', schema)

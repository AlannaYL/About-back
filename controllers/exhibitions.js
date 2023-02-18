import exhibitions from '../models/exhibitions.js'

export const createExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.create({
      title: req.body.title,
      name: req.body.name,
      from: req.body.from,
      to: req.body.to,
      place: req.body.place,
      description: req.body.description,
      image: req.files?.image?.[0]?.path || '',
      images: req.files?.images?.map(file => file.path) || [],
      price: req.body.price,
      sell: req.body.sell,
      map: req.body.map,
      category: req.body.category
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getSellExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getExhibition = async (req, res) => {
  try {
    const result = await exhibitions.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const editExhibition = async (req, res) => {
  try {
    const exhibition = await exhibitions.findById(req.params.id)
    const images = exhibition.images.filter(image => {
      if (!req.body.delImages) {
        return true
      }
      return !req.body.delImages.includes(image)
    }).concat(req.files?.images?.map(file => file.path)).filter(image => image !== null && image !== undefined)

    exhibition.title = req.body.title
    exhibition.name = req.body.name
    exhibition.from = req.body.from
    exhibition.to = req.body.to
    exhibition.place = req.body.place
    exhibition.description = req.body.description
    exhibition.image = req.files?.image?.[0]?.path || exhibition.image
    exhibition.images = images
    exhibition.price = req.body.price
    exhibition.sell = req.body.sell
    exhibition.tag = req.body.tag
    exhibition.map = req.body.map
    exhibition.category = req.body.category
    await exhibition.save()
    res.status(200).json({ success: true, message: '', result: exhibition })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      console.log(error)
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

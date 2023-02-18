import abouts from '../models/abouts.js'

export const getAbouts = async (req, res) => {
  try {
    const result = await abouts.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editAbouts = async (req, res) => {
  try {
    const about = await abouts.findOne()
    const images = about.images.filter(image => {
      if (!req.body.delImages) {
        return true
      }
      return !req.body.delImages.includes(image)
    }).concat(req.files?.images?.map(file => file.path)).filter(image => image !== null && image !== undefined)
    about.content = req.body.content
    about.images = images
    about.description = req.body.description
    await about.save()
    res.status(200).json({ success: true, message: '', result: about })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      console.log(error)
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

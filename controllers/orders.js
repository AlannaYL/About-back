import orders from '../models/orders.js'
import users from '../models/users.js'

export const createOrder = async (req, res) => {
  try {
    if (req.user.cart.length === 0) {
      res.status(400).json({ success: false, message: '購物車為空' })
      return
    }
    let result = await users.findById(req.user._id, 'cart').populate('cart.p_id')
    const canCheckout = result.cart.every(cart => cart.p_id.sell)
    if (!canCheckout) {
      res.status(400).json({ success: false, message: '有下架商品' })
      return
    }
    result = await orders.create({ u_id: req.user._id, products: req.user.cart })
    req.user.cart = []
    await req.user.save()
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      console.log(error)
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const result = await orders.find({ u_id: req.user._id }).populate('products.p_id')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const result = await orders.find().populate('products.p_id').populate('u_id', 'account')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

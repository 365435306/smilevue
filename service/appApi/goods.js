const Koa = require('Koa')
const app = new Koa()
const Router = require('Koa-router')
const mongoose = require('mongoose')
const fs = require('fs')

let router = new Router()

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    if (err) console.log(err)
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log(`存入数据成功${saveCount}条`)
      })
        .catch(err => {
          console.log(err)
        })
    })
  })
  ctx.body = '开始导入数据'
})

router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    if (err) console.log(err)
    data = JSON.parse(data)
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        console.log(`存入数据成功`)
      })
        .catch(err => {
          console.log(err)
        })
    })
  })
  ctx.body = '开始导入数据'
})

router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    if (err) console.log(err)
    data = JSON.parse(data)
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        console.log(`存入数据成功`)
      })
        .catch(err => {
          console.log(err)
        })
    })
  })
  ctx.body = '开始导入数据'
})

router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ ID: goodsId }).exec()
    ctx.body = { code: 200, message: result }
  }catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

module.exports = router

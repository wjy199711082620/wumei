// pages/rent/childCpns/commodity/commodity.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commoditylist: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toRuntDetail(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/subShopping/pages/product/product?commodityId=' + id,
      })
    }
  }
})
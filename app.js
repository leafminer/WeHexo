//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // 检查用户授权状态
        if (res.authSetting['scope.userInfo']) {
          // 已授权,获取用户信息
          wx.getUserProfile({
            desc: '用于完善用户资料',
            success: res => {
              // 更新全局用户数据
              this.globalData.userInfo = res.userInfo
              
              // 初始化博客API配置
              this.globalData.blogConfig = {
                baseUrl: 'https://blog.leafminer.cn', // 从_config.yml读取的博客地址
                apiPath: '/api/posts',  // 文章API路径
                pageSize: 10 // 每页文章数
              }

              // 处理异步加载回调
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: err => {
              console.error('获取用户信息失败:', err)
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  
  towxml: require('/towxml/index')
})
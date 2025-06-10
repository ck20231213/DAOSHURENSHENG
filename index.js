Component({
  data: {
    selected: 0,
    color: "#b3ccff",
    selectedColor: "#ffffff",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "🏠 首页",
        iconPath: "",
        selectedIconPath: ""
      },
      {
        pagePath: "/pages/wishes/wishes", 
        text: "💫 愿望",
        iconPath: "",
        selectedIconPath: ""
      },
      {
        pagePath: "/pages/settings/settings",
        text: "⚙️ 设置",
        iconPath: "",
        selectedIconPath: ""
      }
    ]
  },

  attached() {
    this.updateSelected()
  },

  ready() {
    // 组件布局完成后再次更新状态
    this.updateSelected()
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const index = data.index
      
      this.setData({
        selected: index
      })
      
      wx.vibrateShort({
        type: 'light'
      })
      
      wx.switchTab({
        url,
        fail: (err) => {
          console.error('切换标签页失败', err)
          this.updateSelected()
        }
      })
    },

    updateSelected() {
      const pages = getCurrentPages()
      if (pages.length === 0) return
      
      const currentPage = pages[pages.length - 1]
      const currentPath = `/${currentPage.route}`
      
      const index = this.data.list.findIndex(item => item.pagePath === currentPath)
      if (index !== -1) {
        this.setData({
          selected: index
        })
      }
    }
  }
}) 
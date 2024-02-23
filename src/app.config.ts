export default defineAppConfig({
  pages: [
    "pages/personal/index",
    "pages/index/index",
    "pages/historyOrder/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: false,
    color: "#000000",
    selectedColor: "#000000",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/personal/index",
        text: "个人中心",
        iconPath: "pages/imgs/tabbar/personal.png",
        selectedIconPath: "pages/imgs/tabbar/personal_active.png",
      },
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "pages/imgs/tabbar/home.png",
        selectedIconPath: "pages/imgs/tabbar/home_active.png",
      },

      {
        pagePath: "pages/historyOrder/index",
        text: "历史订单",
        iconPath: "pages/imgs/tabbar/shop_car.png",
        selectedIconPath: "pages/imgs/tabbar/shop_car_active.png",
      },
    ],
  },
});

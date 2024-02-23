import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useState, useMemo } from "react";
import "./index.less";
import classNames from "classnames";
import CateGoryList from "./components/CategoryList";
import CartList from "../cartList";

interface CateGoryItem {
  label: string;
  value: string;
}

export default function Index() {
  useLoad(() => {
    console.log("Page loaded！！！.");
  });
  const [active, setActive] = useState<string>("home_cooking");

  const [carList, setCarList] = useState({});
  const [list, setList] = useState<CateGoryItem[]>([
    {
      label: "家常菜",
      value: "home_cooking",
    },
    {
      label: "匠心推荐",
      value: "recommend",
    },
    {
      label: "健康时蔬",
      value: "healthy_vegetables",
    },
    {
      label: "清汤寡水",
      value: "soup",
    },
    {
      label: "主食",
      value: "stapleFood",
    },
  ]);

  return (
    <View className="index" className="home-wrapper">
      <View className="left-categories">
        {list.map((item, index) => (
          <View
            className={classNames("category-item", {
              "category-item__active": active === item.value,
            })}
            key={item.value}
            onClick={() => {
              setActive(item.value);
            }}
          >
            {item.label}
          </View>
        ))}
      </View>
      <View className="right-content">
        <Swiper
          className="swiper-pics"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View className="demo-text-1">
              <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-2">
              <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/f43e16ef3a6e4c81960693efa7ce94b2_1920w_2560h.jpg?imageView2/1/w/215/h/136/interlace/1/q/75"
              />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-3">
              <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/07dd15a62f3d47f7bffa161c18c4bd28_3024w_4032h.jpg?imageView2/2/w/660/interlace/1/q/75"
              />
            </View>
          </SwiperItem>
        </Swiper>

        <CateGoryList
          active={active}
          carList={carList}
          setCarList={setCarList}
        />

        <CartList carList={carList} setCarList={setCarList} />
      </View>
    </View>
  );
}

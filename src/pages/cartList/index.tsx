import {
  View,
  Text,
  Swiper,
  SwiperItem,
  Image,
  Radio,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useState, useMemo } from "react";
import classNames from "classnames";
import InputNumber from "../components-ui/InputNumber";
import {
  AtIcon,
  AtBadge,
  AtButton,
  AtFloatLayout,
  AtMessage,
  AtCheckbox,
} from "taro-ui";

import "./index.less";

const CartList = (props: any) => {
  const { carList, setCarList } = props;
  const [carDetailOpened, setCarDetailOpened] = useState<boolean>(false);
  const carInfo = useMemo(() => {
    let total = 0,
      totalPrice = 0;
    for (let key in carList) {
      total = total + carList[key].num;
      totalPrice = totalPrice + carList[key].num * carList[key].price;
    }

    console.log({ total, totalPrice });
    return { total, totalPrice };
  }, [carList]);
  const getCondition = (condition: string) => {
    if (!condition) return "默认规格";
    let res = "";
    const c = JSON.parse(condition);
    for (const key in c) {
      res += ` ${c[key]}`;
    }

    return res;
  };

  const getOrderDetail = () => {
    const nodes = [];
    for (let key in carList) {
      console.log("-----", carList);
      nodes.push(
        <View key={carList[key].name} className="order-detail-list__item">
          <Radio
            className="order-detail-list__item_left"
            style={{
              transform: "scale(0.7)",
            }}
            color="#7b1c1e"
          />
          <View className="order-detail-list__item_center">
            <View className="title"> {carList[key].label}</View>
            <View className="conditons">
              {" "}
              {getCondition(carList[key].condition)}
            </View>
          </View>
          <View className="order-detail-list__item_right">
            <InputNumber
              value={carList[key].num}
              onChange={(val) => {
                console.log(val);
              }}
            />
          </View>
        </View>
      );
    }
    console.log(nodes);
    return (
      <>
        <View className="clear-top">
          <View>
            <Radio
              className=""
              id="all"
              style={{
                transform: "scale(0.7)",
              }}
              color="#7b1c1e"
            />
            <label for="all">全选</label>
          </View>
          <View className="clear-all">清空购物车</View>
        </View>
        {nodes}
      </>
    );
  };

  const settlement = () => {
    console.log("----settlement");
    setCarList({});
    Taro.atMessage({
      message: "下单成功",
      type: "success",
    });

    if (carDetailOpened) {
      setCarDetailOpened(false);
    }
  };

  return (
    <View className="cart-list-wrapper">
      <View
        className={classNames("home-footer", {
          shopcar__active: carInfo.total,
        })}
        onClick={() => {
          setCarDetailOpened(!carDetailOpened);
        }}
      >
        <View className="home-footer__shopcar">
          <AtBadge value={carInfo.total}>
            <AtIcon value="shopping-cart" size="30"></AtIcon>
          </AtBadge>
        </View>
        <View className="home-footer_price">¥ {carInfo.totalPrice}</View>

        <AtButton
          className="home-footer_btn"
          onClick={(e) => {
            console.log("---e", e);
            e.stopPropagation();
            settlement();
          }}
        >
          结算
        </AtButton>
      </View>
      <AtFloatLayout
        isOpened={carDetailOpened}
        onClose={() => {
          setCarDetailOpened(false);
        }}
        className="car-detail"
      >
        {getOrderDetail()}
      </AtFloatLayout>{" "}
      <AtMessage />
    </View>
  );
};

export default CartList;

import {
  View,
  Text,
  MovableArea,
  MovableView,
  Image,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useEffect, useState, useRef } from "react";
import {
  AtButton,
  AtList,
  AtListItem,
  AtSwipeAction,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  Button,
  AtInputNumber,
  AtAvatar,
} from "taro-ui";
import "./index.less";
import CartList from "../cartList";

export default function Index() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const activeCode = useRef<string>("");
  const [carList, setCarList] = useState({});
  const [orderList, setOrderList] = useState([
    {
      name: "1",
      price: 3,
      num: 2,
      items: [
        {
          id: 1,
          name: "鱼香肉丝",
          img: "",
        },
      ],
      totalPrice: 0.02,
      code: "111",
    },
    {
      name: "1",
      price: 1,
      num: 1,
      code: "222",
      url: "https://img2.baidu.com/it/u=743975061,2606122970&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=480",
    },
    {
      name: "1",
      price: 1,
      num: 1,
      code: "333",
      url: "https://img1.pconline.com.cn/pconline/0906/26/1691390_img/13_thumb.jpg",
    },
    {
      name: "1",
      price: 1,
      num: 1,
      code: "444",
      url: "https://www.mms591.com/www.mms591.com-photo/2013081823/1-130QR34544.jpg",
    },
    {
      name: "1",
      price: 1,
      num: 1,
      code: "555",
      url: "https://img2.baidu.com/it/u=3172977964,652734699&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=854",
    },
  ]);
  useLoad(() => {
    console.log("Page personal loaded！！！.");
  });
  useEffect(() => {
    console.log("shopcart  loaded！！！.");
  }, []);

  const operateCart = (code: string, val) => {
    const list = JSON.parse(JSON.stringify(cartList));
    const data = list.find((item) => item.code === code);
    const index = list.findIndex((item) => item.code === code);
    // if (type === "reduce" && data?.num === 1) {
    //   setIsOpened(true);
    //   activeCode.current = code;
    //   return;
    // }

    // const Num = type === "add" ? 1 : -1;
    // let num = data?.num || 0;

    // num = num + Num;
    if (val) {
      if (data) {
        data.num = val;
      }
      list.splice(index, 1, data);
    } else {
      activeCode.current = code;
      setIsOpened(true);
      // list.splice(index, 1);
    }

    console.log(list);
    setCartList(list);
  };

  const confirmDelete = () => {
    if (!activeCode.current) return;
    const list = cartList.filter((item) => item.code !== activeCode.current);

    setCartList(list);
    close();
  };

  const close = () => {
    activeCode.current = "";
    setIsOpened(false);
  };

  return (
    <View className="order-list-wrapper">
      {orderList.map((item, index) => (
        <View
          className="order-item"
          key={item.code}
          onClick={() => {
            console.log("click");
          }}
        >
          <View className="order_detail_title">code{index}</View>
          <View className="order_detail_list">
            <View className="order_detail_list__item">
              <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              />
            </View>
            <View className="order_detail_list__item">
              <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              />
            </View>
            <View className="order_detail_list__item">
              <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              />
            </View>
            <View className="order_detail_list__item">
              <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              />
            </View>
            <View className="order_detail_list__item">
              <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              />
            </View>
            <View className="order_detail_list__item">
              <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              />
            </View>
            <View className="order_detail_list__item">
              {/* <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              /> */}
            </View>
            <View className="order_detail_list__item">
              {/* <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              /> */}
            </View>
            <View className="order_detail_list__item">
              {/* <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              /> */}
            </View>
            <View className="order_detail_list__item">
              {/* <Image
                mode="aspectFill"
                src="https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75"
              /> */}
            </View>
          </View>
          <View className="order_detail_footer">
            <View
              className="order_detail_footer_btn"
              onClick={() => {
                setCarList({
                  1: {
                    condition: undefined,
                    id: 1,
                    label: "青椒肉丝",
                    num: 1,
                    price: 0.01,
                  },
                });
              }}
            >
              再来一单
            </View>
          </View>
        </View>
      ))}

      <AtModal
        isOpened={isOpened}
        title="提示"
        cancelText="取消"
        confirmText="确认"
        onCancel={close}
        onConfirm={confirmDelete}
        content="是否确认删除该商品"
      />

      <CartList carList={carList} setCarList={setCarList} />
    </View>
  );
}

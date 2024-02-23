import {
  View,
  Text,
  Swiper,
  SwiperItem,
  Image,
  Button,
} from "@tarojs/components";
import { useState, useEffect, useMemo, useRef } from "react";
import ProductDetail, { ProductDetailForward } from "../../productDetail";
import blank from "../../../images/blank.png";
import { AtButton, AtIcon } from "taro-ui";
import { cloneDeep } from "lodash";
import InputNumber from "@/pages/components-ui/InputNumber";
interface CateGoryListItem {
  label: string;
  desc?: string;
  price: number;
  img?: string;
  hasCondition: boolean;
  soldNum: number;
  id: number;
}

interface CateGoryListData {
  [key: string]: CateGoryListItem[];
}

interface CateGoryListProps {
  active: string;
  carList: any;
  setCarList: React.Dispatch<React.SetStateAction<any>>;
}

const CateGoryList = (props: CateGoryListProps) => {
  const { active, carList, setCarList } = props;
  const detailRef = useRef<ProductDetailForward>();
  const categoryList: CateGoryListData = useMemo(
    () => ({
      home_cooking: [
        {
          label: "青椒肉丝",
          desc: "清理一夏",
          price: 0.01,
          hasCondition: false,
          soldNum: 1,
          img: "https://i2.chuimg.com/8fda721de5f64f9abf0ee8fb37e4ae4a_960w_1280h.jpg?imageView2/2/w/660/interlace/1/q/75",
          id: 1,
        },
        {
          label: "鱼香肉丝",
          desc: "清理一夏",
          price: 0.01,
          hasCondition: false,
          soldNum: 1,
          img: "https://i2.chuimg.com/503615c4419940f7b212a4c03f214caa_1280w_733h.jpg?imageView2/1/w/215/h/136/interlace/1/q/75",
          id: 2,
        },
      ],
      recommend: [
        {
          label: "泰椒土豆丝",
          desc: "活力四射",
          price: 0.01,
          hasCondition: false,
          soldNum: 1,
          img: "https://i2.chuimg.com/a68761b4d8434bcbba35c1595287767d_1920w_2560h.jpg?imageView2/2/w/660/interlace/1/q/75",
          id: 3,
        },
      ],
      healthy_vegetables: [
        {
          label: "蒜蓉娃娃菜",
          desc: "活力四射",
          price: 0.01,
          hasCondition: false,
          soldNum: 1,
          img: "https://i2.chuimg.com/f43e16ef3a6e4c81960693efa7ce94b2_1920w_2560h.jpg?imageView2/1/w/215/h/136/interlace/1/q/75",
          id: 5,
        },
      ],
      soup: [
        {
          label: "上汤娃娃菜",
          desc: "",
          price: 0.01,
          hasCondition: false,
          soldNum: 1,
          img: "https://i2.chuimg.com/69194d1eea274325b2579a6e0af8d413_512w_341h.jpg?imageView2/2/w/660/interlace/1/q/75",
          id: 6,
        },
      ],
      stapleFood: [
        {
          label: "至尊米饭",
          desc: "吃饱不饿",
          price: 0.01,
          hasCondition: false,
          soldNum: 0,
          img: "https://i2.chuimg.com/07dd15a62f3d47f7bffa161c18c4bd28_3024w_4032h.jpg?imageView2/2/w/660/interlace/1/q/75",
          id: 7,
        },
      ],
    }),
    []
  );

  const list = useMemo(() => {
    if (categoryList[active]) {
      return categoryList[active];
    } else {
      return [];
    }
  }, [active]);

  const showDetail = (id: numner) => {
    detailRef.current?.open(id);
  };

  const add2Cart = (id: number, condition?: string) => {
    console.log(list);
    const data = list.find((item) => item.id === id);
    if (!data) return;
    let key = data.id;
    if (condition) {
      key = `${data.id}__${condition}`;
    }

    const obj = cloneDeep(carList) || {};
    if (!obj.hasOwnProperty(key)) {
      obj[key] = {
        id: data.id,
        num: 1,
        label: data.label,
        price: data.price,
        condition,
      };
    } else {
      const number = obj[key].num;
      obj[key] = {
        ...obj[key],
        condition,
        num: number + 1,
      };
    }

    console.log(obj);

    setCarList(obj);
  };

  return (
    <View className="category-list">
      {list.length ? (
        list.map((item) => (
          <View key={item.id} className="category-list__item">
            <View className="item_left">
              <Image
                className="category-list__item_img"
                src={item.img || blank}
                mode="aspectFill"
              />
              <View className="left__content">
                <Text className="item_name">{item.label}</Text>
                <Text className="item_category">
                  {item.desc || "好恰的一批..."}
                </Text>
                <Text className="item_sold-num">已售{item.soldNum || 0}</Text>
                <Text className="item_price">
                  <Text className="item_price_logo">¥</Text>
                  {item.price}
                </Text>
              </View>
            </View>
            <View className="item_right">
              {!item.hasCondition ? (
                <>
                  {/* {!!carList.hasOwnProperty(item.id) ? (
                    <InputNumber value={carList[item.id].value} />
                  ) : ( */}
                  <AtIcon
                    value="add-circle"
                    size="18"
                    color="#7b1c1e"
                    onClick={() => {
                      add2Cart(item.id);
                    }}
                  />
                  {/* )} */}
                </>
              ) : (
                <AtButton
                  className="choose-btn"
                  size="small"
                  onClick={() => {
                    showDetail(item.id);
                  }}
                >
                  选规格
                </AtButton>
              )}
            </View>
          </View>
        ))
      ) : (
        <View className="category-empty">
          <Image className="empty" src={blank} />
          <Text>潜心研制中...</Text>
        </View>
      )}

      <ProductDetail ref={detailRef} add2Cart={add2Cart} />
    </View>
  );
};

export default CateGoryList;

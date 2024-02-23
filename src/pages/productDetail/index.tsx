import { View, Text, Image } from "@tarojs/components";
import { AtCurtain, AtAvatar, AtTag, AtButton, AtIcon } from "taro-ui";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import classnames from "classnames";
import { cloneDeep } from "lodash";
import "./index.less";
import InputNumber from "../components-ui/InputNumber";

export interface ProductDetailForward {
  open: (id: number) => void;
}

interface ProductDetailProps {
  add2Cart: (id: string | number) => void;
}
const ProductDetail = forwardRef((props, ref) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number>(null);
  const [activeChoosed, setActiveChoosed] = useState<Record<string, string>>();
  const [detail, setDetail] = useState<any>({
    id: 1,
    name: "辣椒炒肉",
    url: "",
    conditions: [
      {
        name: "口味",
        condition: [
          {
            label: "微辣",
            value: "1",
            isRecommend: true,
          },
          {
            label: "中辣",
            value: "2",
          },
          {
            label: "重辣",
            value: "3",
          },
        ],
      },
    ],
  });

  useImperativeHandle(ref, () => ({
    open,
  }));

  useEffect(() => {
    if (activeId) {
      getDetail();
    }
  }, [activeId]);

  const open = (id: number) => {
    setIsOpened(true);
    setActiveId(id);
  };

  const getDetail = () => {
    setDetail({
      id: 1,
      name: "辣椒炒肉",
      url: "",
      conditions: [
        {
          name: "口味",
          value: "taste",
          condition: [
            {
              label: "微辣",
              value: "1",
              isRecommend: true,
            },
            {
              label: "中辣",
              value: "2",
            },
            {
              label: "重辣",
              value: "3",
            },
          ],
        },
      ],
    });
  };

  const reset = () => {
    setIsOpened(false);
    console.log(".reset");
  };

  const setActiveCondition = (name: string, value: string) => {
    const active = cloneDeep(activeChoosed) || {};
    active[name] = value;
    console.log("--------", active);
    setActiveChoosed(active);
  };

  const getConditionDetail = () => {
    let res = "";
    if (!activeChoosed) return "--";
    for (let key in activeChoosed) {
      res += ` ${activeChoosed[key]}`;
    }
    return res;
  };

  return (
    <AtCurtain
      isOpened={isOpened}
      onClose={reset}
      className="product-detail"
      closeBtnPosition="top-right"
    >
      <View className="product-detail__top">
        <View className="product-title">
          <View>
            <View className="product-title__image">
              <Image
                src="https://n.sinaimg.cn/sinakd20210105ac/510/w1280h830/20210105/b299-kherpxx8702081.jpg"
                mode="aspectFill"
              />
            </View>
            <Text className="product-title__name">{detail?.name}</Text>
          </View>

          <AtIcon
            value="close-circle"
            size="20"
            color="#ccc"
            className="close-icon"
            onClick={reset}
          ></AtIcon>
        </View>
        <View className="product-content">
          {detail?.conditions.map((condition) => (
            <View>
              <View className="product-content__name">{condition.name}</View>

              <View>
                {condition?.condition.map((c) => (
                  <AtTag
                    type="primary"
                    key={c.value}
                    className={classnames("product-content__choose_item", {
                      "is-active": activeChoosed
                        ? activeChoosed[condition.value] === c.value
                        : false,
                    })}
                    onClick={() => {
                      setActiveCondition(condition.value, c.value);
                    }}
                  >
                    {c.label}
                  </AtTag>
                ))}
              </View>
            </View>
          ))}
        </View>
        <Text></Text>
      </View>

      <View className="product-footer">
        <View className="product-footer_top">
          <View className="product-footer_top_left">
            <Text className="price">¥ 20</Text>
            <Text className="conditions">{getConditionDetail()}</Text>
          </View>

          <InputNumber />
        </View>
        <AtButton
          size="small"
          circle
          className="add-btn"
          onClick={() => {
            console.log("----ac", activeChoosed);
            props?.add2Cart(activeId, JSON.stringify(activeChoosed));
            reset();
          }}
        >
          加入购物袋
        </AtButton>
      </View>
    </AtCurtain>
  );
});

export default ProductDetail;

import { View, Text, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { useState, useEffect } from "react";
import "./index.less";

interface InputProps {
  value?: number;
  onChange: (val, e) => void;
  min?: number;
  max?: number;
}
const InputNumber = (props: InputProps) => {
  const { value, onChange, min = 0, max = 100 } = props;

  const [val, setVal] = useState<number>(0);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const changeVal = (type: "reduce" | "plus") => {
    if (type === "reduce") {
      if (val === min) return;
      const v = val - 1;
      setVal(v);
      onChange && onChange(v);
    } else {
      if (val === max) return;
      const v = val + 1;
      setVal(v);
      onChange && onChange(v);
    }
  };
  return (
    <View className="input-number">
      <AtIcon
        value="subtract"
        className="icon-subtract"
        size="15"
        color="#ccc"
        onClick={() => {
          changeVal("reduce");
        }}
      ></AtIcon>
      <Text>{val}</Text>
      <AtIcon
        value="add"
        className="icon-add"
        size="15"
        color="#7b1c1e"
        onClick={() => {
          changeVal("plus");
        }}
      ></AtIcon>
    </View>
  );
};

export default InputNumber;

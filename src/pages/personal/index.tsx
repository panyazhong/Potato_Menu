import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.less";
import { AtButton, AtMessage, AtAvatar, AtList, AtListItem } from "taro-ui";
import { useState } from "react";

export default function Index() {
  useLoad(() => {
    console.log("Page personal loaded！！！.");
  });

  const [userInfo, setUserInfo] = useState<any>();

  const getInfo = async () => {
    const res = await Taro.getUserProfile({
      desc: "TEST",
    });

    console.log("_--res", res);
    setUserInfo(res.userInfo);
    Taro.atMessage({
      message: res.userInfo.nickName,
    });
  };
  return (
    <View className="personal-wrapper">
      <View className="avatar-wrapper">
        <AtAvatar circle className="avatar" image={userInfo?.avatarUrl} />
      </View>

      <AtButton onClick={getInfo}>aaa</AtButton>

      <AtList>
        <AtListItem
          title="标题文字"
          arrow="right"
          thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
        />
        <AtListItem
          title="标题文字"
          arrow="right"
          thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
        />
        <AtListItem
          title="标题文字"
          arrow="right"
          thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
        />
      </AtList>
      <AtMessage />
    </View>
  );
}

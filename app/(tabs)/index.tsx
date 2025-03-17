import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";

import { videos, videos2, videos3 } from "../../assets/data";

const { height, width } = Dimensions.get("window");

interface VideoWrapper {
  data: ListRenderItemInfo<string>;
}
const VideoWrapper = ({ data }: VideoWrapper) => {
  const { index, item } = data;
  return (
    <View
      style={{
        width,
        height: height,
        backgroundColor: index % 2 === 0 ? "red" : "blue",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 60, fontWeight: "bold" }}>
        {index}
      </Text>
    </View>
  );
};

export default function HomeScreen() {
  const [allVideos, setAllVideos] = useState(videos);

  const numOfRefreshes = useRef(0);

  const fetchMoreData = () => {
    if (numOfRefreshes.current === 0) {
      setAllVideos([...allVideos, ...videos2]);
    } else if (numOfRefreshes.current === 1) {
      setAllVideos([...allVideos, ...videos3]);
    }
    numOfRefreshes.current += 1;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "yellow" }}>
      <FlatList
        data={allVideos}
        initialNumToRender={1}
        snapToInterval={height}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
        onEndReachedThreshold={0.3}
        onEndReached={fetchMoreData}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => <VideoWrapper data={data} />}
      />
    </View>
  );
}

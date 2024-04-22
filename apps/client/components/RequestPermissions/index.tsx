import { RequestSinglePermission } from "./RequestSinglePermission";
import { FlatList, View, useWindowDimensions } from "react-native";
import { styles } from "./styles";
import { useRef, useState } from "react";
import { Redirect } from "expo-router";
import { Routes } from "Shared/routes";
import { PermissionResponse } from "expo-media-library";

export default function RequestPermissions({
  permissions,
}: RequestPermissionsProps) {
  const [currentItem, setCurrentItem] = useState(0);
  const { width } = useWindowDimensions();
  const granted = permissions.reduce(
    (granted, permission) => permission.status && granted,
    false
  );
  const flatListRef = useRef(null);

  const deniedPermissions = permissions.filter(
    (permission) => permission && !permission?.status?.granted
  );

  if (granted) {
    return <Redirect href={Routes.Library} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={deniedPermissions}
        keyExtractor={(item) => item.name}
        horizontal
        pagingEnabled
        bounces={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => <RequestSinglePermission item={item} />}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems }) => {
          setCurrentItem(viewableItems[0].index);
        }}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        scrollEnabled={false}
        scrollEventThrottle={32}
        ref={flatListRef}
      />
      <View style={{ flexDirection: "row", height: 64 }}>
        {deniedPermissions.map((_, index) => (
          <View
            style={[styles.dot, currentItem === index && styles.active]}
            key={index.toString()}
          ></View>
        ))}
      </View>
    </View>
  );
}

type RequestPermissionsProps = {
  permissions: {
    name: string;
    status: PermissionResponse;
    request: () => Promise<PermissionResponse>;
  }[];
};

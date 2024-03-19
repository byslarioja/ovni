import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useEffect, useState } from "react";
import { ThumbnailLoader } from "./ThumbnailLoader";
import { ModalInfo } from "Components/Modal";
import { Button } from "Components/Button";
import { VideoInfo } from "./VideoInfo";

const { width } = Dimensions.get("screen");
const thumbnailWidth = width / 3 - 20;

export function Thumbnail({ asset }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(asset.uri);
        setImage(uri);
        setIsLoading(false);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  if (isLoading) {
    return <ThumbnailLoader thumbnailWidth={thumbnailWidth} />;
  }

  return (
    <>
      <ModalInfo
        isVisible={modalVisible}
        handleVisibility={setModalVisible}
        customStyles={{ alignItems: "center" }}
      >
        <VideoInfo asset={asset} />

        <View style={{ width: "75%", marginTop: 20 }}>
          <Button onPress={() => setModalVisible(false)} text="Cerrar" />
        </View>
      </ModalInfo>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          style={{
            width: thumbnailWidth,
            height: thumbnailWidth * 0.75,
            borderRadius: 5,
          }}
          source={{
            uri: image,
          }}
        />
      </TouchableOpacity>
    </>
  );
}

import * as Crypto from "expo-crypto";
import { ApiErrorResponse, ApiVideoSavedResponse, VideoPayload } from "./types";
import axios from "axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { translate } from "Shared/utils/translate";
import { translation } from "../translation";

const BASE_URI = `${process.env.EXPO_PUBLIC_API_URL}`;
const lang = translate(translation);

export async function uploadVideoInfo(
  payload: VideoPayload
): Promise<ApiVideoSavedResponse> {
  const response = await axios.post(
    `${BASE_URI}/videos`,
    { ...payload },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
    }
  );

  return response.data;
}

export const createHash = async (stringToHash: string) => {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    stringToHash
  );

  return hash;
};

export const onError = ({ response }: ApiErrorResponse) => {
  //TODO: maybe post this into a logging service?
  console.error({ issues: response.data.issues });

  router.navigate("/");

  Toast.show({
    type: "error",
    text1: lang.t("MESSAGES.API_ERROR.TITLE"),
    text2: lang.t("MESSAGES.API_ERROR.DESCRIPTION"),
  });
};

export const onSuccess = () => {
  Toast.show({
    type: "success",
    text1: lang.t("MESSAGES.SAVED"),
  });
};

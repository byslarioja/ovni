import { Button } from "Components/Button";
import { UserIcon, PasswordIcon } from "Components/Icon";
import { Title } from "Components/Typography";
import { CustomTextInput } from "Components/form";
import { Controller, useForm } from "react-hook-form";
import { Image, View } from "react-native";
import { LoaderButton } from "Components/Button/LoaderButton";
import Theme from "Shared/theme";
import { translate } from "Shared/utils/translate";
import { translation } from "./translation";
import { useSession } from "Shared/contexts/session.context";

const lang = translate(translation);

type FormData = {
  email: string;
  password: string;
};

const INPUT_RULES = {
  required: lang.t("ERROR.REQUIRED"),
};

export default function Login() {
  const { signIn, isSigningIn } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    signIn(data);
  };

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: Theme.color.neutral.background,
        padding: 20,
        height: "100%",
      }}
    >
      <Image
        style={{ width: 200, resizeMode: "contain" }}
        source={require("../../../assets/logo.webp")}
      />
      <Title>Iniciar sesión</Title>
      <View style={{ paddingVertical: 20, gap: 15 }}>
        <Controller
          control={control}
          rules={INPUT_RULES}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={lang.t("INPUT.EMAIL.PLACEHOLDER")}
              label={lang.t("INPUT.EMAIL.LABEL")}
              rightIcon={<UserIcon />}
              error={errors?.email?.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={INPUT_RULES}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={lang.t("INPUT.PASSWORD.PLACEHOLDER")}
              label={lang.t("INPUT.PASSWORD.LABEL")}
              rightIcon={<PasswordIcon />}
              error={errors?.password?.message}
              isPassword
            />
          )}
          name="password"
        />

        {isSigningIn ? (
          <LoaderButton />
        ) : (
          <Button
            onPress={handleSubmit(onSubmit)}
            text={lang.t("BUTTON.LOGIN")}
          />
        )}
      </View>
    </View>
  );
}

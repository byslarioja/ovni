import { Button } from "Components/Button";
import { UserIcon, PasswordIcon } from "Components/Icon";
import { Title } from "Components/Typography";
import { CustomTextInput } from "Components/form";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Image, View } from "react-native";
import useAuth from "../useAuth";
import { LoaderButton } from "Components/Button/LoaderButton";
import { Redirect } from "expo-router";

type FormData = {
  email: string;
  password: string;
};

const INPUT_RULES = {
  required: "Este campo es requerido",
};

export default function Login() {
  const { isLoading, isLogged, login } = useAuth();
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
    login(data);
  };

  if (isLoading) {
    return (
      <View style={{ height: "100%", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (isLogged) {
    return <Redirect href={"/camera"} />;
  }

  return (
    <>
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
              placeholder="Ingrese correo electrónico"
              label="Correo electrónico"
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
              placeholder="Ingrese su nombre contraseña"
              label="Contraseña"
              rightIcon={<PasswordIcon />}
              error={errors?.password?.message}
              isPassword
            />
          )}
          name="password"
        />

        {isLoading ? (
          <LoaderButton />
        ) : (
          <Button onPress={handleSubmit(onSubmit)} text="Ingresar" />
        )}
      </View>
    </>
  );
}

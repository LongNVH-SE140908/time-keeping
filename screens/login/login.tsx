import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from "react-native";
// UI
import {
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Center,
  Spinner,
  Heading,
  Stack,
  Slide,
  Select,
  Box,
  CheckIcon,
  NativeBaseProvider,
  FormControl,
  Input,
  WarningOutlineIcon,
  Button,
} from "native-base";
// Icon
import { Ionicons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";

// state
import { useSetRecoilState } from "recoil";
import getWeather from "../../api/user/userapi";
import checkLoginUser from "../../api/user/userapi";
import ReqUser from "../../api/types/CallPropsUser";
// state user data

export default function login({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tostVisible, setToastVisible] = useState(false);
  const [service, setService] = React.useState("");
  const [loginLoad, setLoginLoad] = React.useState(false);
  //handle login
  async function onSubmit() {
    var args: ReqUser = {
      userName: "admin1",
      passWord: "hashed_password"
    }
    await checkLoginUser(args).then((response: any) => {
      console.log(response);

      if (response.role == "admin") {
        navigation.navigate('Auth')
      }

    });

    setLoginLoad(true);
    setToastVisible(true);
  }
  return (
    <View style={styles.container}>
      <Center>
        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIG.RO8BPnjwoex8d0yQAObk?pid=ImgGn",
          }}
          alt="Alternate Text"

        />
      </Center>

      <FormControl style={{ flex: 1, justifyContent: "center" }} isRequired>
        <Stack mx="4">
          <FormControl.Label>UserName</FormControl.Label>
          <Input type="text" placeholder="Enter UserName " />
        </Stack>
        <Stack mx="4">
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" placeholder="Enter Password" />
          <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Atleast 6 characters are required.
          </FormControl.ErrorMessage>
        </Stack>
        <Stack mx="4">
          <FormControl.Label>Choose service</FormControl.Label>
          <Select
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            <Select.Item label="Sale Employee" value="se" />
            <Select.Item label="Guard Employee" value="ge" />
            <Select.Item label="Admin" value="ad" />
          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage>
        </Stack>
        <Stack mx={"38%"} paddingTop={"5"}>
          <Button isLoading={loginLoad} isLoadingText="Submitting" onPress={onSubmit}>
            Login
          </Button>
        </Stack>
      </FormControl>

      <View style={styles.boxVersion}>
        <Text style={styles.textVersion}>Version 0.0.1</Text>
      </View>

      {/* tost */}
      <Slide in={tostVisible} style={{ alignItems: "center" }}>
        <Center style={styles.tostBox}>
          <Stack space={3} w="90%" maxW="400">
            <Alert w="100%" status="warning">
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <Center>
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon />
                      <Text >
                        Log in Failed!
                      </Text>
                    </HStack>
                  </Center>
                  <IconButton
                    onPress={() => setToastVisible(false)}
                    style={{ marginRight: 8 }}
                    variant="unstyled"
                    icon={<CloseIcon size="3" color="coolGray.600" />}
                  />
                </HStack>
              </VStack>
            </Alert>
          </Stack>
        </Center>
      </Slide>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 95,
  },
  logo: {
    width: 220,
    height: 60,
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: "#88b484",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  textLogin: {
    fontFamily: "Roboto-medium",
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  boxLogin: {
    flex: 1,
    justifyContent: "center",
  },
  boxVersion: {
    bottom: 100,
  },
  textVersion: {
    fontFamily: "Roboto-medium",
    fontSize: 14,
  },
  modal: {
    backgroundColor: "rgba(0, 0, 0,0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxModal: {
    top: "50%",
  },
  boxNameApp: {
    alignItems: "center",
  },
  txtNameApp: {
    fontFamily: "Roboto-bold",
    fontSize: 25,
  },
  tostBox: {
    position: "absolute",
    bottom: 30,
  },
});

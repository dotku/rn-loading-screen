import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text } from "./components/Themed";
import { ImageBackground, StyleSheet, TextStyle } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const countdown = 5;
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [delayLoadingComplete, setDelayLoadingComplete] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((r) => {
        console.log("r", r);
        return r + 1;
      });
    }, 1000);

    setTimeout(() => {
      setDelayLoadingComplete(true);
      clearInterval(interval);
      console.log("setTimeout", !isLoadingComplete, delayLoadingComplete);
    }, countdown * 1000);

    console.log("isLoadingCompleted useEffect", isLoadingComplete);
  }, []);

  return isLoadingComplete && delayLoadingComplete ? (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{
          uri: "https://www.helcim.com/images/your_ad_here_billboard.jpg",
        }}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#000000aa",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={styles.mainText}>Your AD Here</Text>
          <Text style={styles.text}>paypal.me/dotku</Text>
          <Text style={styles.text}>{`{${countdown - counter}}`}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const commonTextStyle = {
  color: "#fff",
  textAlign: "center",
  fontSize: 30,
};
const styles = StyleSheet.create({
  mainText: {
    ...commonTextStyle,
    fontSize: 160,
  } as TextStyle,
  text: commonTextStyle as TextStyle,
});

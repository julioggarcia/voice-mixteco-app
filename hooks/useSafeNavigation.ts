import { useEffect } from "react";
import { Alert, BackHandler, Platform } from "react-native";
import { useRouter, useNavigation } from "expo-router";

/*
 * hook to prevent accidental navigation awau from a screen when thre is unsaved work
 * Works across iOS, Android, & Web
 * @param isDirty - boolean indication if there is unsaved progress
 * @param title Title of the alert
 * @param message - message of the alert
 */

export const useSafeNavigation = (
  isDirty: boolean,
  title: string = "Discard changes",
  message: string = "Are you sure? You will lose your current progress."
) => {
  const router = useRouter();
  const navigation = useNavigation();

  const onConfirmBack = () => {
    if (isDirty) {
      if (Platform.OS === "web") {
        const confirmed = window.confirm(`${title}\n\n${message}`);
        if (confirmed) router.back();
      } else {
        Alert.alert(title, message, [
          { text: "Cancel", style: "cancel" },
          {
            text: "Discard", 
            style: "destructive",
            onPress: () => router.back(),
          },
        ]);
      }
    } else {
      router.back();
    }
  };

  // handle iOS swipe back gesture
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !isDirty,
    });
  }, [navigation, isDirty]);

  // handle Android hardware back button
  useEffect(() => {
    const backAction = () => {
      if (isDirty) {
        onConfirmBack();
        return true; //prevent default
      } 
      return false; //allow default
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress", 
      backAction
    );

    return () => backHandler.remove();
  }, [isDirty]);

  // handle web browser back/refresh/close
  useEffect(() => {
    if (Platform.OS !== "web") return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  return { onConfirmBack };
};

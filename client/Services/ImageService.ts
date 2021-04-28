import * as FileSystem from "expo-file-system";

export default async function pathToBase64(uri: string) {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });
  return base64;
}

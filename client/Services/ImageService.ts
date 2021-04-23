import * as FileSystem from 'expo-file-system';

export default async function pathToBase64 (uri: string) {
  console.log('uri from imageService', uri);
  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
  console.log(base64);
  return base64;
}


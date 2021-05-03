import * as expoCamera  from 'expo-camera';


expoCamera.Camera.requestPermissionsAsync = jest.fn().mockResolvedValue(
    { status: 'granted' }
)


export default expoCamera;
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export interface ImagePickerResult {
  uri: string;
  width: number;
  height: number;
}

export interface ImagePickerOptions {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
}

export const openCamera = async (
  options: ImagePickerOptions = {
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  }
): Promise<string | null> => {
  try {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Camera permission is required to take photos.');
      return null;
    }
    const result = await ImagePicker.launchCameraAsync(options);

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error opening camera:', error);
    Alert.alert('Error', 'Failed to open camera. Please try again.');
    return null;
  }
};

export const openGallery = async (
  options: ImagePickerOptions = {
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  }
): Promise<string | null> => {
  try {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Gallery permission is required to select photos.');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error opening gallery:', error);
    Alert.alert('Error', 'Failed to open gallery. Please try again.');
    return null;
  }
};
export const selectImageSource = (
  onImageSelected: (uri: string) => void,
  options?: ImagePickerOptions
) => {
  Alert.alert(
    'Select Image Source',
    'Choose how you want to select your image',
    [
      {
        text: 'Camera',
        onPress: async () => {
          const uri = await openCamera(options);
          if (uri) {
            onImageSelected(uri);
          }
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const uri = await openGallery(options);
          if (uri) {
            onImageSelected(uri);
          }
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]
  );
};

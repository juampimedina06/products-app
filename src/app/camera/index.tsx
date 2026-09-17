import { ThemedText } from '@/presentation/theme/components/themed-text';
import { useTheme } from '@/presentation/theme/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default async function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
    const [mediapermission, requestMediaPermission] = MediaLibrary.usePermissions();


    const [selectedImagen, setSelectedImagen] = useState<string>();

    const cameraRef = useRef<CameraView>(null);

    const onRequestPermissions = async () => {
        try {
            const { status: cameraPermissionsStatus } = await requestCameraPermission();
            if (cameraPermissionsStatus !== 'granted') {
                Alert.alert('Permisos denegados', 'Necesitamos permiso para usar camara');
                return;
            }

            const { status: mediaPermissionsStatus } = await requestMediaPermission();
            if (mediaPermissionsStatus !== 'granted') {
                Alert.alert('Permisos denegados', 'Necesitamos permiso para usar la galeria');
                return;
            }

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Algo salio mal con los permisos')
        }
    }

    if (!cameraPermissions) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!cameraPermissions.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Necesitamos permiso para usar camara y la galeria</Text>

                <TouchableOpacity onPress={onRequestPermissions} >
                    <ThemedText type='subtitle'>
                        Solicitar permiso
                    </ThemedText>
                </TouchableOpacity>


            </View>
        );
    }

    const onShutterButtonPress = async () => {
        if (!cameraRef.current) return;

        const picture = await cameraRef.current.takePictureAsync({
            quality: 0.7 //calidad con la que se toma la foto
        })

        console.log(picture);
        if (!picture.uri) return;

        setSelectedImagen(picture.uri);

        //TODO: guardar imagen
    }


    const onReturnCancel = () => {
        //TODO: limpiar estadoo
        router.dismiss();
    }

    const onPictureAccepted = () => {
        //TODO: Implementar funcion

    }

    const onRetakePicture = () => {
        setSelectedImagen(undefined);
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    if (selectedImagen) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: selectedImagen }} style={styles.camera} />

                <ConfirmImagenButton onPress={onPictureAccepted} />

                <RetakeImagenButton onPress={onRetakePicture} />

                <ReturnCancelButton onPress={onReturnCancel} />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
            <ShutterButton onPress={onShutterButtonPress} />

            <FlipCameraButton onPress={toggleCameraFacing} />

            {/* TODO: abrir galeria*/}
            <GalleryButton onPress={() => { }} />

            <ReturnCancelButton onPress={onReturnCancel} />
        </View>
    );
}

//CUSTOM COMPONENTS
const ShutterButton = ({ onPress = () => { } }) => {

    const dimension = useWindowDimensions();
    const primaryColor = useTheme().primary;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 30,
                    left: dimension.width / 2 - 32,
                    backgroundColor: primaryColor,
                }
            ]}>
            <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
    )
}


const FlipCameraButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.flipCameraButton}
        >
            <Ionicons name="camera-reverse-outline" size={24} color="white" />
        </TouchableOpacity>
    )
}

const GalleryButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.galleryButton}
        >
            <Ionicons name="image-outline" size={24} color="white" />
        </TouchableOpacity>
    )
}

const ReturnCancelButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.returnCancelButton}
        >
            <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
    )
}



const ConfirmImagenButton = ({ onPress = () => { } }) => {

    const dimension = useWindowDimensions();
    const primaryColor = useTheme().primary;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 30,
                    left: dimension.width / 2 - 32,
                    backgroundColor: primaryColor,
                }
            ]}>
            <Ionicons name="checkmark-outline" size={30} color={primaryColor} />
        </TouchableOpacity>
    )
}

const RetakeImagenButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.flipCameraButton}
        >
            <Ionicons name="close-outline" size={24} color="white" />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    shutterButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'white',
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    flipCameraButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 40,
        right: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    galleryButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 40,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    returnCancelButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        top: 40,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
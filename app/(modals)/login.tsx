import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser'
import { defaultStyles } from '../../constants/Styles';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook'
}

const Page = () => {
    useWarmUpBrowser();

    const router = useRouter();

    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: Strategy.Google });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple });
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: Strategy.Facebook });

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy]

        try {
            const { createdSessionId, setActive } = await selectedAuth();
            console.log({ createdSessionId });

            if (createdSessionId) {
                setActive!({ session: createdSessionId })
                router.back();
            }
        } catch (error) {
            console.error('OAuth error', error);
        }
    }

    return (
        <View style={[defaultStyles.container, styles.container]}>
            <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, { marginBottom: 20 }]} />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.separatorView}>
                <View style={{ flex: 1, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth }}></View>
                <Text style={styles.separator}>or</Text>
                <View style={{ flex: 1, borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth }}></View>
            </View>

            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons style={defaultStyles.btnIcon} size={24} name='call-outline' />
                    <Text style={styles.btnOutlineText}>Continue with Phone</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSelectAuth(Strategy.Apple)} style={styles.btnOutline}>
                    <Ionicons style={defaultStyles.btnIcon} size={24} name='md-logo-apple' />
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSelectAuth(Strategy.Google)} style={styles.btnOutline}>
                    <Ionicons style={defaultStyles.btnIcon} size={24} name='md-logo-google' />
                    <Text style={styles.btnOutlineText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSelectAuth(Strategy.Facebook)} style={styles.btnOutline}>
                    <Ionicons style={defaultStyles.btnIcon} size={24} name='md-logo-facebook' />
                    <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 26
    },
    separatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30
    },
    separator: {
        fontFamily: 'mon-sb',
        color: Colors.grey
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb'
    }
})

export default Page
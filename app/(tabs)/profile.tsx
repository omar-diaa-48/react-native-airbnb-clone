import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router';

const Profile = () => {
    const { signOut, isSignedIn } = useAuth();

    return (
        <View>
            <Text>Profile</Text>

            {isSignedIn ? (
                <Button title='Log out' onPress={() => signOut()} />
            ) : (
                <Link href={'/(modals)/login'} />
            )}
        </View>
    )
}

export default Profile
import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {
    return (
        <View>
            <Link href={'/(modals)/booking'} >Bookings</Link>
            <Link href={'/listing/booking'} >Listing details</Link>
        </View>
    )
}

export default Page
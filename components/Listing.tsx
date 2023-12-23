import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

interface Props {
    listings: any[]
    category: string
}

const Listing: React.FC<Props> = ({ category, listings }) => {
    useEffect(() => {
        console.log('RELOAD_LISTINGS', category, listings.length);
    }, [category])

    return (
        <View>
            <Text>{category}</Text>
        </View>
    )
}

export default Listing
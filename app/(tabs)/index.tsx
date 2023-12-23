import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '../../components/ExploreHeader'
import Listing from '../../components/Listing'
import listings from '../../assets/data/airbnb-listings.json'

const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tiny homes');

    const listingsMemoized = useMemo(() => listings as any[], [])

    const onCategoryChanged = (category: string) => {
        setSelectedCategory(category)
    }

    return (
        <View style={{ flex: 1, marginTop: 140 }}>
            <Stack.Screen options={{
                header: () => (
                    <ExploreHeader onCategoryChanged={onCategoryChanged} />
                )
            }} />

            <Listing category={selectedCategory} listings={listingsMemoized} />
        </View>
    )
}

export default Page
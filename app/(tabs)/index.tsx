import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '../../components/ExploreHeader'
import Listing from '../../components/Listing'
import listingsGeo from '../../assets/data/airbnb-listings.geo.json'
import AirbnbListingFeature from '../../models/listing-feature.interface'

const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tiny homes');

    const listingsGeoMemoized = useMemo(() => listingsGeo as { features: AirbnbListingFeature[] }, [])

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

            <Listing category={selectedCategory} listings={listingsGeoMemoized} />
        </View>
    )
}

export default Page
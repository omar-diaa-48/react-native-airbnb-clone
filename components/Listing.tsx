import { View, Text, FlatList, ListRenderItem, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '../constants/Styles'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AirbnbListing from '../models/listing.interface'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

interface Props {
    listings: AirbnbListing[]
    category: string
}

const Listing: React.FC<Props> = ({ category, listings }) => {
    const [isLoading, setIsLoading] = useState(false);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false)
        }, 200);
    }, [category])

    const renderRow: ListRenderItem<AirbnbListing> = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild >
            <TouchableOpacity>
                <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                    <Image source={{ uri: item.medium_url }} style={styles.image} />

                    <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
                        <Ionicons name='heart-outline' size={24} color='#000' />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <Ionicons name='star' size={16} />
                            <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating / 20}</Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Text>{item.price}</Text>
                        <Text>night</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    )

    return (
        <View style={defaultStyles.container}>
            <FlatList ref={listRef} data={isLoading ? [] : listings} renderItem={renderRow} />
        </View>
    )
}

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 16
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10
    }
})

export default Listing
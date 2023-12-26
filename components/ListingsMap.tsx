import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native'
import React from 'react'
import { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '../constants/Styles';
import AirbnbListingFeature from '../models/listing-feature.interface';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';

interface Props {
    listings: {
        features: AirbnbListingFeature[]
    };
}

const ListingsMap: React.FC<Props> = ({ listings }) => {
    const router = useRouter();

    const onMarkerSelected = (feature: AirbnbListingFeature) => {
        router.push(`/listing/${feature.properties.id}`)
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster
        const points = properties.point_count;

        return (
            <Marker
                key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{
                    latitude: +geometry.coordinates[0],
                    longitude: +geometry.coordinates[1],
                }}
            >
                <View style={styles.marker}>
                    <Text style={{
                        color: '#000',
                        alignItems: 'center',
                        fontFamily: 'mon-sb'
                    }}>
                        {points}
                    </Text>
                </View>
            </Marker>
        )
    }

    return (
        <View style={defaultStyles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                showsUserLocation
                showsMyLocationButton
                onMapReady={() => {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    )
                }}
                clusterColor='#fff'
                clusterTextColor='#000'
                clusterFontFamily='mon-sb'
                renderCluster={renderCluster}
            >
                {listings.features.map((feature: AirbnbListingFeature) => (
                    <Marker
                        key={feature.properties.id}
                        coordinate={{
                            latitude: +feature.properties.latitude,
                            longitude: +feature.properties.longitude,
                        }}
                        onPress={() => onMarkerSelected(feature)}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>
                                {feature.properties.price}
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    marker: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10
        }
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb'
    }
})

export default ListingsMap
import {useState} from 'react';
import {StyleSheet, ScrollView, Button, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function Temporada({ route, navigation }){
    const {temporada} = route.params
    navigation.setOptions({ title: `Resultados de ${temporada}`})
    return (
        <ScrollView>
            <Text style={styles.card}
                onPress={() => {navigation.navigate('CampPilotos', {temporada: temporada})}}
            >
                CAMPEONATO DE PILOTOS{'\n'}
                <Ionicons name="md-people" size={50} color="#2b2755" />
            </Text>
            <Text style={styles.card}
                onPress={() => {navigation.navigate('CampConstrutores', {temporada: temporada})}}
            >
                CAMPEONATO DE EQUIPES{'\n'}
                <Ionicons name="md-build" size={50} color="#2b2755" />
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 20
    },
    card:{
        height: 120,
        backgroundColor: '#1c82bb',
        textAlign: 'center',
        paddingTop: 30,
        color: '#2b2755',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        fontSize: 20
    }
  });

export default Temporada

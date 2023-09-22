import {StyleSheet, ScrollView, Button, Text} from 'react-native';

function Index({ navigation }){
    navigation.setOptions({ title: 'Selecionar Temporada'})
    const btnsTemporadas = []
    for(var i = 2023; i >= 1980; i--){
        const anoTemporada = i
        btnsTemporadas.push(
            <Text style={styles.btnTemporada} onPress={() => {
                navigation.navigate('Temporada', { temporada: anoTemporada });
            }} key={i}>{i}</Text>
        )
    }
    return (
        <ScrollView>
            {btnsTemporadas}    
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnTemporada: {
        height: 40,
        fontSize: 30,
        backgroundColor: '#1c82bb',
        textAlign: 'center',
        paddingTop: 2,
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10
    }
  });

export default Index

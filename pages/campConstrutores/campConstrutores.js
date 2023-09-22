import {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Button, Text, FlatList } from 'react-native';
import axios from 'axios';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SelectDropdown from 'react-native-select-dropdown'

function CampPilotos({ route, navigation }){
    const {temporada} = route.params
    const [resultados,setResultados] = useState({})
    const [tableHead, setTableHead] = useState([
        '#', 'Equipe', 'Pontos', 'Vitórias'
    ])

    const [calendario, setCalendario] = useState([])

    const [tableData, setTableData] = useState([])

    const [etapaSelecionada, setEtapaSelecionada] = useState(0)

    useEffect(() => {
        let urlBusca = `http://ergast.com/api/f1/${temporada}/constructorStandings.json`
        if(etapaSelecionada > 0){
            urlBusca = `http://ergast.com/api/f1/${temporada}/${etapaSelecionada}/constructorStandings.json`
        }
        axios.get(urlBusca).then(response => {
            const constructorStandings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            setResultados(constructorStandings);
            
            const testeElements = constructorStandings.map((constructorStanding, index) => (
                [
                    constructorStanding.position,
                    constructorStanding.Constructor.name, 
                    constructorStanding.points,
                    constructorStanding.wins
                ]
            ));
            console.log(testeElements)
            setTableData(testeElements);
        }).catch(error => {
          console.log(error);
        });
        navigation.setOptions({ title: `Construtores ${temporada}` })
    }, [etapaSelecionada]);
    
    useEffect(() => {
        axios.get(`http://ergast.com/api/f1/${temporada}.json`).then(response => {
          const races = response.data.MRData.RaceTable.Races;
          testeElements = races.map((race, index) => (
            [
                race.raceName
            ]
        ));
        console.log(testeElements)
        setCalendario(testeElements)
        }).catch(error => {
          console.log(error);
        });
    }, [])

    return (
        <ScrollView>
            <SelectDropdown
                data={calendario}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setEtapaSelecionada(index+1)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={tableData} textStyle={styles.text}/>
            </Table>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 20
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });

export default CampPilotos

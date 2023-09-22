import {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Button, Text, FlatList } from 'react-native';
import axios from 'axios';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SelectDropdown from 'react-native-select-dropdown'

function CampPilotos({ route, navigation }){
    const {temporada} = route.params
    const [resultados,setResultados] = useState({})
    const [tableHead, setTableHead] = useState([
        '#', 'Nome', 'Pontos', 'Equipe'
    ])

    const [tableData, setTableData] = useState([])

    const [calendario, setCalendario] = useState([])

    const [etapaSelecionada, setEtapaSelecionada] = useState(0)

    useEffect(() => {
        let urlBusca = `http://ergast.com/api/f1/${temporada}/driverStandings.json`
        if(etapaSelecionada > 0){
            urlBusca = `http://ergast.com/api/f1/${temporada}/${etapaSelecionada}/driverStandings.json`
        }
        axios.get(urlBusca).then(response => {
          const driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          setResultados(driverStandings);
          
          const testeElements = driverStandings.map((driverStanding, index) => (
            [
                driverStanding.position,
                `${driverStanding.Driver.givenName}\n${driverStanding.Driver.familyName}`, 
                driverStanding.points,
                driverStanding.Constructors[0].name
            ]
            ));
            console.log(testeElements)
            setTableData(testeElements);
        }).catch(error => {
          console.log(error);
        });
        navigation.setOptions({ title: `Campeonato de Pilotos de ${temporada}` })
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
        ( resultados ? 
        <>
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
        </>
        :
            Carregando
        )
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

import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableHighlight, Alert} from 'react-native';


export default class Contacts extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }
    
    componentDidMount() {
        
        fetch('https://randomuser.me/api/?results=15')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    dataSource: data.results
                });
                this.arrayholder = data.results;
            })
            .catch(error => alert('Cannot Find Server'));
    }
    
    
    render() {
        return (
            <View style={styles.contact}>
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={(item) => item.id.value}
                    renderItem={({item}) =>
                        <View style={{justifyContent:'space-between',flexDirection: 'row',alignItems:'center'}}>
                            <View style={styles.contactBox}>
                                <View style={styles._imageStyleView}>
                                    <Image
                                        source={{uri: item.picture.large}}
                                        style={styles._imageStyle}
                                    />
                                </View>
                                <View style={styles.names}>
                                    <Text style={styles.nameText}>{item.name.first} {item.name.last}</Text>
                                    <Text style={styles.numberStyle}>{item.phone}</Text>
                                    <Text style={styles.numberStyle}>{item.cell}</Text>
                                </View>
                            </View>
                            <View>
                                {item.nat === 'DE' &&
                                <View style={styles.checkedView}>
                                    <Image
                                        source={require('../Assets/image/checked.png')}
                                        style={styles.checkedImage}
                                    />
                                </View>
                                }
                            </View>
                        </View>
                        
                    }
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    contact: {
        flex: 5,
    },
    contactBox: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e7'
    },
    _imageStyle: {
        borderRadius: 50,
        width: 50,
        height: 50
    },
    _imageStyleView: {
        backgroundColor: '#516afe',
        padding: 3,
        borderRadius: 50,
        marginHorizontal: 15
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    numberStyle: {
        fontSize: 11,
    },
    checkedView: {
        backgroundColor: '#516afe',
        padding: 4,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    checkedImage: {
        width: 12,
        height: 12
    }
    
});
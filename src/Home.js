import React from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';
import TableData from './TableData';
const axios = require('react-native-axios');

class Home extends React.Component {
    initState = {
        tableData: []
    }
    constructor(props) {
        super(props);
        this.state = this.initState;
    }
    onGetClick = () => {
        let mSelf = this;
        let config = {
            method: 'get',
            url: 'https://dashretun-core-dev.herokuapp.com/dashreturn/orderops/all/roamer/4e7046f2-d7a1-40dc-abda-168e7208f9f5',
            headers: {
                client: 'ROAMERAPP',
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5MTYtOTkzLTAwMDIiLCJleHAiOjE2MDQ2ODI1NDksImlhdCI6MTYwNDY2NDU0OX0.nT9oPqBfwDIoyIiuGy-_MVVTmTTCB7i5cZX1frtVn9EGP6VojTYFcm8cJ3822gk5Jpa9VENmj6qZh2F4-KnhNw`,
            }
        };
        axios(config)
            .then(function (res) {
                (res.data.responseObject).sort((a,b) => new Date(a) < new Date(b) ? 1 : -1);
                mSelf.setState({ tableData: res.data.responseObject }, alert(JSON.stringify(res.data.responseObject.length)))
                /* alert(JSON.stringify(res.data)) */
            })
            .catch(function (error) {
                alert("ERROR" + error)
            });
    }
  
    componentDidUpdate() {
        return
    }
    render() {


        return (
            <View>
                <TextInput placeholder="Enter the token please" />
                <Button title="GET" onPress={() => { this.onGetClick() }} />
                {
                    this.state.tableData.length !== 0 ?
                        <TableData data = {this.state.tableData}/> : <View />
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({

    graeRow: {
        backgroundColor: '#e7e7e7',
    },
    whiteRow: {
        backgroundColor: '#ccc'
    },
    pageTopSectionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderWidth: 0.3
    },
});
export default Home;
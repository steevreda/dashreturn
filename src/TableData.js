import React from 'react';
import { DataTable } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';

class TableData extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    convertDate = (d) => {
        var p = d.split("/");
        return +(p[2] + p[1] + p[0]);
    }

    sortByDate = () => {
        var tbody = document.querySelector("#results tbody");
        // get trs as array for ease of use
        var rows = [].slice.call(tbody.querySelectorAll("tr"));

        rows.sort(function (a, b) {
            return convertDate(a.cells[0].innerHTML) - convertDate(b.cells[0].innerHTML);
        });

        rows.forEach(function (v) {
            tbody.appendChild(v); // note that .appendChild() *moves* elements
        });
    }
    render() {
        var tableData = [];
        if (this.props.data === undefined || this.props.data === null || this.props.data.length === 0) {
            tableData.push(<Text>No data yet</Text>)
        } else {
            /*  alert(this.props.data.size) */

            for (let i = 0; i < this.props.data.length; i++) {
                tableData.push(
                    <DataTable.Row key={i} style={i % 2 === 0 ? styles.graeRow : styles.whiteRow} >
                        <DataTable.Cell key={Math.random + 1}>{this.props.data[i].orderId}</DataTable.Cell>
                        <DataTable.Cell key={Math.random + 2}>{this.props.data[i].orderStage}</DataTable.Cell>
                        <DataTable.Cell key={Math.random + 3}>{(this.props.data[i].createdTimestamp).substring(0, 10)}</DataTable.Cell>
                    </DataTable.Row>
                )
            }
        }

        return (
            <DataTable>
                <DataTable.Header style={styles.pageTopSectionContainer}>
                    <DataTable.Title style={styles.headerTextStyle}>Order ID</DataTable.Title>
                    <DataTable.Title style={styles.headerTextStyle} >Order Stage</DataTable.Title>
                    <DataTable.Title style={styles.headerTextStyle} >created Time</DataTable.Title>
                </DataTable.Header>
                {tableData}
            </DataTable>
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
export default TableData;
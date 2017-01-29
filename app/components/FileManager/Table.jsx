import React, {PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';
import {getIcon} from '../../utils/icon-generator';

const style = {
  container: {},
  header: {
    position: 'absolute',
    top: '65px',
    left: 0,
    height: '25px',
    right: 0,
    textAlign: 'center'
  },
  tableContainer: {
    position: 'absolute',
    top: '90px',
    left: 0,
    right: 0,
    bottom: '50px',
    overflow: 'auto'
  },
  table: {
    width: '100%',
    textAlign: 'left'
  },
  tableRow: {
    cursor: 'pointer'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: '50px',
    left: 0,
    right: 0,
    background: 'gainsboro'
  },
  checkboxContainer: {
    width: '30px'
  },
  fileTypeIcon: {
    width: '30px'
  }
};
class Table extends React.Component {
  onRowClick(rowF) {
    this.props.onRowClick(rowF);
  }
  render() {
    return (
      <div style={style.container}>
        <div style={style.header}>{this.props.currentPath}</div>
        <div style={style.tableContainer}>
          <table style={style.table}>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Size</th>
                <th style={style.checkboxContainer}><Checkbox style={style.checkbox}/></th>
              </tr>
            </thead>
            <tbody>
              {this.props.fileList.map((row, index) => {
                return (
                  <tr style={style.tableRow} onMouseDown={() => this.onRowClick(row)} key={index}>
                    <td style={style.fileTypeIcon}><img src={getIcon(row)} width='100%'/></td>
                    <td>{row.name}</td>
                    <td>{row.selected}</td>
                    <td>{row.time.toString()}</td>
                    <td>{row.size}</td>
                    <td style={style.checkboxContainer}><Checkbox style={style.checkbox}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={style.footer}></div>
      </div>
    );
  }
}

Table.propTypes = {
  currentPath: PropTypes.string,
  fileList: PropTypes.array,
  onRowClick: PropTypes.func
};

export default Table;

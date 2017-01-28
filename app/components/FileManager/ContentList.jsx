import React, {Component} from 'react';
import style from './ContentList.style';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class ContentList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const vm = this;
    return (
      <div style={style.container}>
        <Table onCellClick= {this.handleCellClick} height={vm.props.uiConfig.height} fixedHeader={vm.props.uiConfig.fixedHeader} fixedFooter={vm.props.uiConfig.fixedFooter} selectable={vm.props.uiConfig.selectable} multiSelectable={vm.props.uiConfig.multiSelectable}>
          <TableHeader displaySelectAll={vm.props.uiConfig.showCheckboxes} adjustForCheckbox={vm.props.uiConfig.showCheckboxes} enableSelectAll={vm.props.uiConfig.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{
                textAlign: 'center'
              }}>
                {vm.props.currentPath}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="File name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Last modified timestamp">Last modified</TableHeaderColumn>
              <TableHeaderColumn tooltip="File size">Size</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={vm.props.uiConfig.showCheckboxes} deselectOnClickaway={vm.props.uiConfig.deselectOnClickaway} showRowHover={vm.props.uiConfig.showRowHover} stripedRows={vm.props.uiConfig.stripedRows}>
            {vm.props.fileList.map((row, index) => (
              <TableRow onMouseUp={(evt)=>console.log(row)} key={index} selected={row.selected}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.time.toString()}</TableRowColumn>
                <TableRowColumn>{row.size}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter adjustForCheckbox={vm.props.uiConfig.showCheckboxes}>
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{
                textAlign: 'center'
              }}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

ContentList.propTypes = {
  fileList : React.PropTypes.array.isRequired,
  currentPath: React.PropTypes.string.isRequired,
  uiConfig: React.PropTypes.object
};

export default ContentList;

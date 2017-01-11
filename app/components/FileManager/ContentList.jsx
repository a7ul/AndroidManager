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
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: true,
      height: '100%'
    };
  }

  render() {
    const vm = this;
    return (
      <div style={style.container}>
        <Table height={this.state.height} fixedHeader={this.state.fixedHeader} fixedFooter={this.state.fixedFooter} selectable={this.state.selectable} multiSelectable={this.state.multiSelectable}>
          <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes} enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{
                textAlign: 'center'
              }}>
                {vm.props.currentPath}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="file name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="last modified timestamp">Last modified</TableHeaderColumn>
              <TableHeaderColumn tooltip="file size">Size</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={this.state.showCheckboxes} deselectOnClickaway={this.state.deselectOnClickaway} showRowHover={this.state.showRowHover} stripedRows={this.state.stripedRows}>
            {vm.props.fileList.map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.time.toString()}</TableRowColumn>
                <TableRowColumn>{row.size}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter adjustForCheckbox={this.state.showCheckboxes}>
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
  currentPath: React.PropTypes.string.isRequired
};

export default ContentList;

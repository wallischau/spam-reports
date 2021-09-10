import React, { Component } from "react";
import API from "./apiAccess";
import { Row, Container } from "./Grid";
import { List } from "./List";

class SpamReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spamItems: [],             
    };
  };


  componentDidMount() {
    this.loadSpamItems();
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
  };
}

  /* Description: fetch items */
  loadSpamItems = () => {
    API.getSpamItems()
      .then(res => {
        console.log('res', res.data);

        return (
          this.setState({
            spamItems: res.data,
          }))
      })
      .catch(err => console.log(err));
  };



  render() {
    const { spamItems } = this.state;
    const rowOfSpamItems = [];

    spamItems.forEach(item => {
      if (item) {


        rowOfSpamItems.push(
          <div key={'div-' + item.id}>
            <Row key={item.id + '-data'}>
              {this.state.spamItems.length ? (
                <List key={item.id + '-list'} data={item}>
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
             </Row>
          </div>
        );
      }
    });
    return (
      <Container fluid >
        <Row key='title-row'>
            <h1>Reports</h1>
        </Row>
        {rowOfSpamItems}
      </Container>
    );
  }
}

export default SpamReport;
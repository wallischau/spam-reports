import React from "react";
import "./List.css";
import { Col, Row } from "../Grid";
import API from "../apiAccess";


//set item to 'BLOCKED' and disable the button
const handleBlockButtonClick = (id, setDisable, setItemStatus) => {
  API.blockSpamItem(id)
  .then(res => {
    setDisable(true);
    setItemStatus('BLOCKED');
  })
  .catch(err => console.log(err));
};

//set item to 'RESOLVED' and remove from view
const handleResolveButtonClick = (id, setItemStatus, setShowItem) => {
  API.resolveSpamItem(id)
  .then(res => {
    setItemStatus('CLOSED');
    setShowItem(false);
  })
  .catch(err => console.log(err));
};

export const List = (props) => {
  const item = props.data;
  const [disable, setDisable] = React.useState(false);
  const [itemStatus, setItemStatus ] = React.useState(item.state);
  const [showItem, setShowItem] = React.useState(true);

  //each row is a spam item with selected details
  const itemShown = [
    <Row key={item.id + 'row-1'}>
      <Col key={item.id+'col-1'} size='sm-3'>id: {item.id}</Col>
      <Col key={item.id+'col-2'} size='sm-3'>Type: {item.type}</Col>
      <Col key={item.id+'col-3'} size='sm-3'><button disabled={disable} onClick={() => handleBlockButtonClick(item.id, setDisable, setItemStatus)}>Block</button></Col>
    </Row>,
    <Row key={item.id + 'row-2'}>
      <Col key={item.id+'col-4'} size='sm-3'>State: {itemStatus}</Col>
      <Col key={item.id+'col-5'} size='sm-3'>Message: {item.message}</Col>
      <Col key={item.id+'col-6'} size='sm-3'><button onClick={() => handleResolveButtonClick(item.id, setItemStatus, setShowItem)}>Resolve</button></Col>
    </Row>,
    <Row key={item.id+'row-3'}>
      <Col key={item.id+'col-7'} size='sm-3'><a>Details</a> </Col>
    </Row>
  ];

  return (
    <div className="list-overflow-container">
      <ul className="list-group">
        {showItem && itemShown}
      </ul>
    </div>
  );
};
import React from 'react';
import { Card, CardBody, CardTitle, Button, Col, CardImg } from 'reactstrap';

const FavoriteList = props => {
  return (
    <Col xs="12" md="6" lg="3">
      <>
        <Card>
          <CardImg
            width="50%"
            height="50%"
            src={props.gif.images.fixed_height_small.url}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{props.gif.title}</CardTitle>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </>
    </Col>
  );
};

export default FavoriteList;

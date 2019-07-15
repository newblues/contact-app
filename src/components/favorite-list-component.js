import React from 'react';
import { Card, CardBody, CardTitle, Button, Col, CardImg } from 'reactstrap';
import { FaStar } from 'react-icons/fa';

const styles = {
  icon: {
    color: '#ecf0f1',
  },
  iconIsFavorite: {
    color: '#f1c40f',
  },
};

const FavoriteList = props => {
  return (
    <Col xs="12" md="6" lg="3">
      <>
        <Card>
          <CardImg
            width="50%"
            height="50%"
            src={props.gif.images.original.url}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{props.gif.title}</CardTitle>
            <FaStar
              style={styles.iconIsFavorite}
              size="25px"
              onClick={() => props.deleteFavoriteCallBack(props.gif.id)}
            />{' '}
          </CardBody>
        </Card>
      </>
    </Col>
  );
};

export default FavoriteList;

import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button, Col, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const styles = {
  icon: {
    color: 'green',
  },
  iconIsFavorite: {
    color: 'yellow',
  },
};

const GifList = props => {
  const { gif } = props;

  const [isFavorite, setFavorite] = useState(false);

  const addFavorite = gif => {
    props.addFavoriteCallBack(gif);
    setFavorite(!isFavorite);
  };

  const deleteFavorite = gif => {
    props.deleteFavoriteCallBack(gif.id);
    setFavorite(!isFavorite);
  };

  const getDetails = id => {
    props.getDetailsCallBack(id);
  };

  return (
    <Col xs="12" md="6" lg="3">
      <>
        <Card>
          <Link to={`/${gif.id}`}>
            <CardImg
              onClick={() => getDetails(gif.id)}
              width="100%"
              height="120"
              src={gif.images.original.url}
              alt="Card image cap"
            />
          </Link>
          <CardBody>
            <CardTitle>{gif.title}</CardTitle>
            {isFavorite ? (
              <FaStar
                style={styles.iconIsFavorite}
                size="25px"
                onClick={() => deleteFavorite(gif)}
              />
            ) : (
              <FaStar style={styles.icon} size="25px" onClick={() => addFavorite(gif)} />
            )}
          </CardBody>
        </Card>
      </>
    </Col>
  );
};

export default GifList;

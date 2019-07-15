import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button, Col, CardImg, CardColumns, CardDeck } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const styles = {
  icon: {
    color: '#ecf0f1',
  },
  iconIsFavorite: {
    color: '#f1c40f',
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

  const getDetails = gif => {
    props.getDetailsCallBack(gif);
  };

  return (
    <Col xs="12" md="6" lg="3">
      <>
        <Card>
          <Link to={`/${gif.id}`}>
            <CardImg
              onClick={() => getDetails(gif)}
              width="10%"
              src={gif.images.original.url}
              alt="Card image cap"
            />
          </Link>
          <CardBody>
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

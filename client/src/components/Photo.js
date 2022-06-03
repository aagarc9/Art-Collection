import React from 'react';
import { Card } from 'react-bootstrap';

const Photo = ({ id }) => {
  return (
    <Card className="photo">
      <Card.Img
        variant="top"
        src={`http://localhost:3000/photos/${id}`}
        alt="Photo"
      />
    </Card>
  );
};

export default Photo;
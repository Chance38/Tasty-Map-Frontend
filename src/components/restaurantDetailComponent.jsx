import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Rating from '@mui/material/Rating';

const RestaurantDetail = ({ show, onHide, restaurant, onUpdate, onDelete }) => {
    if (!restaurant) return null;
    
    let openTimeList = null;
    try {
      openTimeList = restaurant.openTime ? JSON.parse(restaurant.openTime) : [];
    } catch (e) {
      openTimeList = [];
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{restaurant.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Phone:</strong> {restaurant.phone ? restaurant.phone : "N/A"}</p>
                <p><strong>Type:</strong> {restaurant.type}</p>
                <p><strong>Notes:</strong> {restaurant.notes ? restaurant.notes : "N/A"}</p>
                <p><strong>Price:</strong> {restaurant.price ? restaurant.price : "N/A"}</p>
                <p><strong>Location:</strong> {restaurant.location ? restaurant.location : "N/A"}</p>
                <p>
                    <strong>Environment Score:</strong>{" "}
                    <Rating value={restaurant.environmentScore} max={3} readOnly />
                </p>
                <p>
                    <strong>Service Score:</strong>{" "}
                    <Rating value={restaurant.serviceScore} max={3} readOnly />
                </p>
                <div>
                  <strong>Full Open Time:</strong>
                  {openTimeList.length > 0 ? (
                    <ul>
                      {openTimeList.map((time, index) => (
                        <li key={index}>{time}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onUpdate(restaurant)}>
                    Update
                </Button>
                <Button variant="danger" onClick={() => onDelete(restaurant.id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RestaurantDetail;

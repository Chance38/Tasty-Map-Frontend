import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateRestaurant } from "../service/restaurantService";
import { listTypes } from "../service/typeService";
import Rating from '@mui/material/Rating';

const UpdateRestaurantComponent = ({ restaurant, onClose }) => {
  const [updatedRestaurant, setUpdatedRestaurant] = useState({ ...restaurant });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    listTypes()
      .then(response => {
        const typeOptions = response.data;
        setTypes([{ id: 0, name: "Add New" }, ...typeOptions]);
      })
      .catch(error => console.error("Failed to load types:", error));
  }, []);

  const handleChange = (e) => {
    setUpdatedRestaurant({ ...updatedRestaurant, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setUpdatedRestaurant({ ...updatedRestaurant, type: value });
    if (value !== "Add New") {
      setUpdatedRestaurant(prev => ({ ...prev, newType: "" }));
    }
  };

  const handleSubmit = async () => {
    if (updatedRestaurant.type === "Add New") {
      if (updatedRestaurant.newType.trim() === "") {
        alert("Please enter the new type");
        return;
      } else {
        updatedRestaurant.type = updatedRestaurant.newType.trim();
      }
    }
    try {
      await updateRestaurant(updatedRestaurant.id, updatedRestaurant);
      alert("Restaurant updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating restaurant:", error);
      alert("Failed to update restaurant.");
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 插入新的 PlaceAutocompleteElement */}
        <place-autocomplete id="update-place-autocomplete" input-id="update-restaurant-name"></place-autocomplete>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="update-restaurant-name"
              value={updatedRestaurant.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={updatedRestaurant.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={updatedRestaurant.type}
              onChange={handleTypeChange}
              required
            >
              <option value="">Select a type</option>
              {types.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </Form.Select>
            {updatedRestaurant.type === "Add New" && (
              <Form.Control
                type="text"
                placeholder="Enter new type"
                name="newType"
                value={updatedRestaurant.newType || ""}
                onChange={handleChange}
                className="mt-2"
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={updatedRestaurant.notes}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Open Time</Form.Label>
            <Form.Control
              type="text"
              name="openTime"
              value={updatedRestaurant.openTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={updatedRestaurant.price}
              onChange={handleChange}
              placeholder="Amount"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={updatedRestaurant.location}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Environment Score</Form.Label>
            <Rating
              name="environmentScore"
              value={updatedRestaurant.environmentScore}
              max={3}
              onChange={(event, newValue) =>
                setUpdatedRestaurant({ ...updatedRestaurant, environmentScore: newValue })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Service Score</Form.Label>
            <Rating
              name="serviceScore"
              value={updatedRestaurant.serviceScore}
              max={3}
              onChange={(event, newValue) =>
                setUpdatedRestaurant({ ...updatedRestaurant, serviceScore: newValue })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateRestaurantComponent;

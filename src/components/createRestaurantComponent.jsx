import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createRestaurant } from "../service/restaurantService";
import { listTypes } from "../service/typeService";
import Rating from '@mui/material/Rating';


const CreateRestaurantComponent = ({ onRestaurantAdded }) => {
  const token = localStorage.getItem("token");
  
  const [show, setShow] = useState(false);
  const [restaurant, setRestaurant] = useState({
    name: "",
    phone: "",
    type: "",
    newType: "",
    notes: "",
    openTime: "",
    price: "",
    location: "",
    environmentScore: 0,
    serviceScore: 0,
    latitude: "",
    longitude: ""
  });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    listTypes()
      .then(response => {
        setTypes([{ id: 0, name: "Add New" }, ...response.data]);
      })
      .catch(error => console.error("Failed to load types:", error));
  }, []);

  const handleAddressBlur = () => {
    if (!restaurant.location.trim()) return;

    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not available");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: restaurant.location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setRestaurant(prev => ({
          ...prev,
          latitude: location.lat(),
          longitude: location.lng()
        }));
      } else {
        console.error("Geocode was not successful: " + status);
      }
    });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setRestaurant({ 
      name: "", 
      phone: "", 
      type: "", 
      newType: "",
      notes: "", 
      openTime: "", 
      price: "", 
      location: "", 
      environmentScore: 0, 
      serviceScore: 0,
      latitude: "",
      longitude: ""
    });
  };

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setRestaurant({ ...restaurant, type: value });
    if (value !== "Add New") {
      setRestaurant(prev => ({ ...prev, newType: "" }));
    }
  };

  const handleSubmit = async () => {
    let errorMessage = [];
    if (restaurant.name.trim() === "") {
      errorMessage.push("Please fill in the Restaurant Name");
    }
    if (restaurant.type.trim() === "Add New") {
      if (restaurant.newType.trim() === "") {
        errorMessage.push("Please enter the new type");
      } else {
        restaurant.type = restaurant.newType.trim();
      }
    } else if (restaurant.type.trim() === "") {
      errorMessage.push("Please select a Restaurant Type");
    }
    if (restaurant.environmentScore === 0) {
      errorMessage.push("Please score the Restaurant Environment");
    }
    if (restaurant.serviceScore === 0) {
      errorMessage.push("Please score the Restaurant Service");
    }
    if (errorMessage.length > 0) {
      alert(errorMessage.join("\n\n"));
      return;
    }
    const phoneVal = restaurant.phone.trim() === "" ? null : restaurant.phone.trim();
    const notesVal = restaurant.notes.trim() === "" ? null : restaurant.notes.trim();
    const openTimeVal = restaurant.openTime.trim() === "" ? null : restaurant.openTime.trim();
    const priceVal = restaurant.price.trim() === "" ? null : restaurant.price.trim();
    const locationVal = restaurant.location.trim() === "" ? null : restaurant.location.trim();

    const newRestaurant = {
      name: restaurant.name.trim(), 
      phone: phoneVal, 
      type: restaurant.type.trim(),
      notes: notesVal, 
      openTime: openTimeVal, 
      price: priceVal, 
      location: locationVal,
      environmentScore: restaurant.environmentScore,
      serviceScore: restaurant.serviceScore,
      latitude: parseFloat(restaurant.latitude),
      longitude: parseFloat(restaurant.longitude)
    };    
    try {
      const response = await createRestaurant(newRestaurant);
      onRestaurantAdded(response.data);
      handleClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error("Error creating restaurant:", error);
        alert("Failed to create restaurant.");
      }
    }
  };

  return (
    <div style={{ marginBottom: "20px", minHeight: "50px", textAlign: "center" }}>
      {token && (
        <Button variant="primary" onClick={handleShow}>
          + Add Restaurant
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={restaurant.name}
                onChange={handleChange}
                placeholder="Enter restaurant name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={restaurant.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={restaurant.type} onChange={handleTypeChange} required>
                <option value="">Select a type</option>
                {types.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </Form.Select>
              {restaurant.type === "Add New" && (
                <Form.Control
                  type="text"
                  placeholder="Enter new type"
                  name="newType"
                  value={restaurant.newType}
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
                value={restaurant.notes}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Open Time</Form.Label>
              <Form.Control
                type="text"
                name="openTime"
                value={restaurant.openTime}
                onChange={handleChange}
                placeholder="e.g. Monday: 9AM-5PM; Tuesday: 9AM-5PM; ..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={restaurant.price}
                onChange={handleChange}
                placeholder="Enter price level"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={restaurant.location}
                onChange={handleChange}
                onBlur={handleAddressBlur}
                placeholder="Enter address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Environment Score</Form.Label>
              <div>
                <Rating
                  name="environmentScore"
                  value={restaurant.environmentScore}
                  max={3}
                  onChange={(event, newValue) =>
                    setRestaurant({ ...restaurant, environmentScore: newValue })
                  }
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service Score</Form.Label>
              <div>
                <Rating
                  name="serviceScore"
                  value={restaurant.serviceScore}
                  max={3}
                  onChange={(event, newValue) =>
                    setRestaurant({ ...restaurant, serviceScore: newValue })
                  }
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRestaurantComponent;

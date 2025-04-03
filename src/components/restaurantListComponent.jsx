import React, { useEffect, useState } from 'react';
import { listRestaurant, deleteRestaurant } from '../service/restaurantService';
import CreateRestaurantComponent from './createRestaurantComponent';
import RestaurantDetail from './restaurantDetailComponent';
import UpdateRestaurantComponent from './updateRestaurantComponent';
import RestaurantMapComponent from './restaurantMapComponent';

const RestaurantListComponent = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const fetchRestaurants = () => {
    listRestaurant()
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleRestaurantAdded = (newRestaurant) => {
    setRestaurants((prev) => [...prev, newRestaurant]);
  };

  const handleRowClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedRestaurant(null);
  };

  const handleUpdate = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowUpdate(true);
    setShowDetail(false);
  };
  
  const handleDelete = (restaurantId) => {
    deleteRestaurant(restaurantId)
      .then(() => {
        alert("Restaurant deleted successfully!");
        fetchRestaurants();
        setShowDetail(false);
      })
      .catch((error) => {
        console.error("Failed to delete:", error);
        alert("Failed to delete restaurant.");
      });
  };
  
  const handleUpdateClose = () => {
    setShowUpdate(false);
    fetchRestaurants();
  };

  // 取得今日營業時間（假設 openTime 為 JSON 陣列：Monday ~ Sunday）
  const getTodayOpenTime = (openTimeJson) => {
    if (!openTimeJson) return "N / A";
    
    let openTimes;
    try {
        openTimes = typeof openTimeJson === "string" ? JSON.parse(openTimeJson) : openTimeJson;

        if (!Array.isArray(openTimes)) throw new Error("格式錯誤");
    } catch (e) {
      return "格式錯誤";
    }

    const today = new Date().getDay(); // 0: Sunday, 1: Monday, ...
    const index = (today === 0) ? 6 : today - 1;
    return openTimes[index] || "N / A";
  };

  return (
    <>
      {/* 左側餐廳列表 */}
        <div className="restaurant-list">
            <CreateRestaurantComponent onRestaurantAdded={handleRestaurantAdded} />
            <table className="table table-bordered table-hover" style={{ marginTop: "20px" }}>
                <thead className="table-info">
                    <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Open Time</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map((restaurant, index) => (
                    <tr key={restaurant.id} className="table-warning" style={{ cursor: "pointer" }} onClick={() => handleRowClick(restaurant)}>
                        <td>{index + 1}</td>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.type}</td>
                        <td>{getTodayOpenTime(restaurant.openTime)}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: "20px", minHeight: "50px", textAlign: "center" }}>
                <CreateRestaurantComponent onRestaurantAdded={handleRestaurantAdded} />
            </div>
        </div>
      
        {/* 右側地圖 */}
        <div className="restaurant-map">
            <RestaurantMapComponent restaurants={restaurants} />
        </div>

        <RestaurantDetail 
            show={showDetail}
            onHide={handleCloseDetail}
            restaurant={selectedRestaurant}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />

        {showUpdate && selectedRestaurant && (
            <UpdateRestaurantComponent restaurant={selectedRestaurant} onClose={handleUpdateClose} />
        )}
    </>
  );
}

export default RestaurantListComponent;

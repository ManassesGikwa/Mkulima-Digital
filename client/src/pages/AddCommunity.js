import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCommunity = () => {
  const [community, setCommunity] = useState({
    name: "",
    description: "",
    created_at: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setCommunity({
      ...community,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("access_token"); // Get the JWT token from local storage

      if (!token) {
        throw new Error("No token found");
      }

      const formData = new FormData(); // Create a new FormData object
      formData.append("name", community.name);
      formData.append("description", community.description);
      formData.append("image", community.image); // Use community.image instead of imageFile

      const response = await fetch("http://127.0.0.1:5555/communities", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error adding community: ${response.status} ${errorData.msg}`
        );
      }

      const data = await response.json();
      console.log("Community added successfully:", data);
      // Handle success response
      navigate("/community"); // Redirect to the community page after successful addition
    } catch (error) {
      console.error("Error adding community:", error);
      // Handle error response
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Add Community</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label style={{ marginBottom: "10px" }}>
          Name:
          <input
            type="text"
            name="name"
            value={community.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          Description:
          <textarea
            name="description"
            value={community.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          Created At:
          <input
            type="datetime-local"
            name="created_at"
            value={community.created_at}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCommunity;

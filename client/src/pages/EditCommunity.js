// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const EditCommunity = ({ initialCommunity }) => {
//   const { id: communityId } = useParams();
//   const [community, setCommunity] = useState(
//     initialCommunity || {
//       name: "",
//       description: "",
//       created_at: "",
//       image: null,
//     }
//   );

//   useEffect(() => {
//     if (!initialCommunity && communityId) {
//       fetch(`http://127.0.0.1:5555/communities/${communityId}`)
//         .then((response) => response.json())
//         .then((data) => setCommunity(data))
//         .catch((error) =>
//           console.error("Error fetching community data:", error)
//         );
//     }
//   }, [initialCommunity, communityId]);

//   const handleChange = (event) => {
//     const { name, value, files } = event.target;
//     setCommunity({
//       ...community,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("name", community.name);
//     formData.append("description", community.description);
//     formData.append("created_at", community.created_at);
//     if (community.image instanceof File) {
//       formData.append("image", community.image);
//     }

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:5555/communities/${communityId}`,
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `Error updating community: ${response.status} ${errorText}`
//         );
//       }

//       const data = await response.json();
//       console.log("Community updated successfully", data);
//     } catch (error) {
//       console.error("Error updating community:", error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//       <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Edit Community</h1>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit}
//       >
//         <label style={{ marginBottom: "10px" }}>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={community.name}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
//           />
//         </label>
//         <label style={{ marginBottom: "10px" }}>
//           Description:
//           <textarea
//             name="description"
//             value={community.description}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
//           />
//         </label>
//         <label style={{ marginBottom: "10px" }}>
//           Created At:
//           <input
//             type="datetime-local"
//             name="created_at"
//             value={community.created_at}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
//           />
//         </label>
//         <label style={{ marginBottom: "10px" }}>
//           Image:
//           <input
//             type="file"
//             name="image"
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
//           />
//         </label>
//         <button
//           type="submit"
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#007bff",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditCommunity
    import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditCommunity = ({ initialCommunity }) => {
  const { id: communityId } = useParams();
  const [community, setCommunity] = useState(
    initialCommunity || {
      name: "",
      description: "",
      created_at: "",
      image: null,
    }
  );

  useEffect(() => {
    if (!initialCommunity && communityId) {
      fetch(`http://127.0.0.1:5555/communities/${communityId}`)
        .then((response) => response.json())
        .then((data) => setCommunity(data))
        .catch((error) =>
          console.error("Error fetching community data:", error)
        );
    }
  }, [initialCommunity, communityId]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setCommunity({
      ...community,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", community.name);
    formData.append("description", community.description);
    formData.append("created_at", community.created_at);
    if (community.image instanceof File) {
      formData.append("image", community.image);
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5555/communities/${communityId}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            // Set content type to 'multipart/form-data' to upload files
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error updating community: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Community updated successfully", data);
    } catch (error) {
      console.error("Error updating community:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Edit Community</h1>
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
          Save
        </button>
      </form>
    </div>
  );
};

export default EditCommunity;

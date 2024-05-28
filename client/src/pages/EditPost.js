// import React, { useState, useEffect } from 'react';

// const EditPost = ({ postId }) => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');

//     useEffect(() => {
//         // Fetch post details when component mounts
//         fetch(`http://127.0.0.1:5555/blogposts/${postId}`)
//             .then(response => response.json())
//             .then(data => {
//                 setTitle(data.title);
//                 setContent(data.content);
//             })
//             .catch(error => console.error('Error fetching post details:', error));
//     }, [postId]);

//     const handleTitleChange = (e) => {
//         setTitle(e.target.value);
//     };

//     const handleContentChange = (e) => {
//         setContent(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetch(`http://127.0.0.1:5555/blogposts/${postId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ title, content }),
//         })
//         .then((response) => {
//             if (response.ok) {
//                 console.log('Post updated successfully');
//                 // Handle success - redirect or show confirmation
//             } else {
//                 console.error('Failed to update post');
//                 // Handle failure - show error message
//             }
//         })
//         .catch(error => {
//             console.error('Error occurred while updating post:', error);
//         });
//     };

//     return (
//         <div>
//             <h2>Edit Post</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Title:</label>
//                 <input type="text" value={title} onChange={handleTitleChange} />
//                 <label>Content:</label>
//                 <textarea value={content} onChange={handleContentChange} />
//                 <button type="submit">Save Changes</button>
//             </form>
//         </div>
//     );
// };

// export default EditPost;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './EditPost.css';

function EditPost() {
  const { state } = useLocation();
  const { onSubmit } = state || {}; // Retrieve onSubmit from state
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the post data to edit
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/blogposts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title || '',
            content: data.content || '',
            image: null
          });
          setImageUrl(data.image || null);
        } else {
          setError('Failed to fetch post data');
        }
      } catch (error) {
        setError('Error fetching post data: ' + error.message);
      }
    }
    fetchPost();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: selectedImage
    }));
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if an image is selected
      if (formData.image) {
        // Upload image to Cloudinary
        const formDataForImage = new FormData();
        formDataForImage.append('file', formData.image);
        formDataForImage.append('upload_preset', 'zsegbm6t'); // Replace with your Cloudinary upload preset
        const response = await axios.post('https://api.cloudinary.com/v1_1/dmnnoyi14/image/upload', formDataForImage);

        // Update form data with image URL
        formData.image = response.data.secure_url;
      }

      // Send form data to backend
      const response = await fetch(`/blogposts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSubmit && onSubmit(formData); // Call onSubmit if it's provided
        setFormData({
          title: '',
          content: '',
          image: null
        });
        setImageUrl(null);
        navigate(`/posts/${id}`); // Navigate back to the post detail
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      setError(error.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  }

  // Additional handleSubmit function
  async function handleCustomSubmit() {
    // Your form submission logic
    // You can include any additional logic here
    onSubmit && onSubmit(formData); // Call onSubmit if it's provided
  }

  return (
    <form onSubmit={handleSubmit} className="edit-post-form">
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Content:
        <textarea name="content" value={formData.content} onChange={handleChange} />
      </label>
      <label>
        Post Image:
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </label>
      {imageUrl && <img src={imageUrl} alt="Selected" className="image-preview" />}
      {error && <p className="error-message">{error}</p>}
      <Button type="submit" className='submit-button' disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </Button>
      {/* <Button onClick={handleCustomSubmit}>Custom Submit</Button> Button to trigger custom submit */}
    </form>
  );
}

export default EditPost;
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// import '../index.css';
// import img1 from '../images/img-1.jpg';
// import img2 from '../images/img-2.jpg';
// import img3 from '../images/img-3.jpg';
// import img4 from '../images/img-4.jpg';
// import img5 from '../images/img-5.jpg';
// import img6 from '../images/img-6.jpg';
// import img7 from '../images/img-7.jpg';
// import img8 from '../images/img-8.jpg';
// import img9 from '../images/img-9.jpg';
// import img10 from '../images/img-10.jpg';
// import display1 from '../images/display1.jpg';
// import display2 from '../images/display2.jpg';
// import display3 from '../images/display3.jpg';
// import display4 from '../images/display4.jpg';

// const Home = () => {
//   const [maxScrollLeft, setMaxScrollLeft] = useState(0);
//   const imageList = [
//     img1,
//     img2,
//     img3,
//     img4,
//     img5,
//     img6,
//     img7,
//     img8,
//     img9,
//     img10
//   ];

//   useEffect(() => {
//     const initSlider = () => {
//       const imageList = document.querySelector(".slider-wrapper .image-list");
//       const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
//       const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
//       const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");

//       if (imageList) {
//         const maxScroll = imageList.scrollWidth - imageList.clientWidth;
//         setMaxScrollLeft(maxScroll);

//         // Handle scrollbar thumb drag
//         scrollbarThumb.addEventListener("mousedown", (e) => {
//           const startX = e.clientX;
//           const thumbPosition = scrollbarThumb.offsetLeft;
//           const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

//           const handleMouseMove = (e) => {
//             const deltaX = e.clientX - startX;
//             const newThumbPosition = thumbPosition + deltaX;
//             const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
//             const scrollPosition = (boundedPosition / maxThumbPosition) * maxScroll;

//             scrollbarThumb.style.left = `${boundedPosition}px`;
//             imageList.scrollLeft = scrollPosition;
//           }

//           const handleMouseUp = () => {
//             document.removeEventListener("mousemove", handleMouseMove);
//             document.removeEventListener("mouseup", handleMouseUp);
//           }

//           document.addEventListener("mousemove", handleMouseMove);
//           document.addEventListener("mouseup", handleMouseUp);
//         });

//         // Slide images according to the slide button clicks
//         slideButtons.forEach(button => {
//           button.addEventListener("click", () => {
//             const direction = button.id === "prev-slide" ? -1 : 1;
//             const scrollAmount = imageList.clientWidth * direction;
//             imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
//           });
//         });

//         // Show or hide slide buttons based on scroll position
//         const handleSlideButtons = () => {
//           slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
//           slideButtons[1].style.display = imageList.scrollLeft >= maxScroll ? "none" : "flex";
//         }

//         // Update scrollbar thumb position based on image scroll
//         const updateScrollThumbPosition = () => {
//           const scrollPosition = imageList.scrollLeft;
//           const thumbPosition = (scrollPosition / maxScroll) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
//           scrollbarThumb.style.left = `${thumbPosition}px`;
//         }

//         // Event listeners for image list scroll
//         imageList.addEventListener("scroll", () => {
//           updateScrollThumbPosition();
//           handleSlideButtons();
//         });
//       }
//     };

//     // Initialize slider on load and resize
//     initSlider();
//     window.addEventListener("resize", initSlider);

//     // Clean up event listeners on component unmount
//     return () => {
//       window.removeEventListener("resize", initSlider);
//     };
//   }, [maxScrollLeft]);

//   const images = [
//     {
//       url: display1,
//       title: 'For Farmers',
//       description: 'Manage your grain from paddock to payment with AgriDigital Onfar.'
//     },
//     {
//       url: display2,
//       title: 'For Site Operators',
//       description: 'Track and manage stored grain inventory with AgriDigital Store.'
//     },
//     {
//       url: display3,
//       title: 'For Traders',
//       description: 'Buy and sell grain, and access finance to unlock growth opportunities with AgriDigital Trade.'
//     },
//     {
//       url: display4,
//       title: 'For Brokers',
//       description: 'Connect, keep records and create value for your clients with AgriDigital Broker.'
//     }
//   ];
  
//     return (
//       <div className='main'>
//       <div className="video position-relative">
//         <video autoPlay muted loop id="myVideo">
//           <source
//             src="https://cdn.pixabay.com/video/2020/04/30/37663-418005775_large.mp4"
//             type="video/mp4"
//           />
//         </video>
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-3">
//               <div className="d-flex justify-content-center">
//                 <div className="detail">
//                   <h2 className="mb-3 fw-bold">Mkulima Digital</h2>
//                   <p>We Digitise Grain Management for Over 11,600 Agribusinesses Globally</p>
//                   <hr className="mb-3" />
            
//                   <Link to="/login" className="text-decoration-none fw-normal">
//                     LOGIN
//                   </Link>
//                   <div className="arrow mt-4">
//                     <i className="bi bi-chevron-down"></i>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='body1'>
//         <div className="container">
//           <div className="slider-wrapper">
//             <button id="prev-slide" className="slide-button material-symbols-rounded">
//               chevron_left
//             </button>
//             <ul className="image-list">
//               {imageList.map((imgSrc, index) => (
//                 <li key={`img-${index + 1}`}>
//                   <img className="image-item" src={imgSrc} alt={`img-${index + 1}`} />
//                 </li>
//               ))}
//             </ul>
//             <button id="next-slide" className="slide-button material-symbols-rounded">
//               chevron_right
//             </button>
//           </div>
//           <div className="slider-scrollbar">
//             <div className="scrollbar-track">
//               <div className="scrollbar-thumb"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="image-display-container">
//       <h2 className="image-heading">Hard-working Solutions</h2>
//       <div className="image-cards-container">
//       {images.map((image, index) => (
//   <div key={index} className="image-card">
//     <img src={image.url} alt={`Image ${index + 1}`} className="image" />
//     <h5 className='title'>{image.title}</h5>
//     <p className="display-description">{image.description}</p>
//     <button className="discover-button">DISCOVER</button>
//   </div>
// ))}
//       </div>
//     </div>
//     <div className="support-section">
//         <h2 className="support-title">GET REAL SUPPORT</h2>
//         <p className="support-description">Here when you need us.</p>
//         <div className="support-content">
//           <div className="support-category">
//             <h3 className="category-title">Sales</h3>
//             <p className="category-text">
//               Want to chat with sales? Simply complete our contact form and a member of our team will be in touch.
//               Alternatively, you can book a demo for a time convenient to you.
//             </p>
//           </div>
//           <div className="vertical-line"></div>
//           <div className="support-category">
//             <h3 className="category-title">Support</h3>
//             <p className="category-text">
//               Get the help you need, when you need it. Our Knowledgebase articles guide you through our most common support
//               requests. Simply contact our team if you need extra help.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
//   };

// export default Home;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../index.css';
import img1 from '../images/img-1.jpg';
import img2 from '../images/img-2.jpg';
import img3 from '../images/img-3.jpg';
import img4 from '../images/img-4.jpg';
import img5 from '../images/img-5.jpg';
import img6 from '../images/img-6.jpg';
import img7 from '../images/img-7.jpg';
import img8 from '../images/img-8.jpg';
import img9 from '../images/img-9.jpg';
import img10 from '../images/img-10.jpg';
import display1 from '../images/display1.jpg';
import display2 from '../images/display2.jpg';
import display3 from '../images/display3.jpg';
import display4 from '../images/display4.jpg';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login status

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking authentication state)
    // Set the isLoggedIn state accordingly
    // Example: setIsLoggedIn(true);
    console.log("isLoggedIn:", isLoggedIn); 
  }, []); // Run this effect only once, on component mount

  const imageList = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10
  ];

  const images = [
    {
      url: display1,
      title: 'For Farmers',
      description: 'Manage your grain from paddock to payment with AgriDigital Onfar.'
    },
    {
      url: display2,
      title: 'For Site Operators',
      description: 'Track and manage stored grain inventory with AgriDigital Store.'
    },
    {
      url: display3,
      title: 'For Traders',
      description: 'Buy and sell grain, and access finance to unlock growth opportunities with AgriDigital Trade.'
    },
    {
      url: display4,
      title: 'For Brokers',
      description: 'Connect, keep records and create value for your clients with AgriDigital Broker.'
    }
  ];

  return (
    <div className='main'>
      {!isLoggedIn ? ( // Only render the video section if user is not logged in
        <div className="video position-relative">
          <video autoPlay muted loop id="myVideo">
            <source
              src="https://cdn.pixabay.com/video/2020/04/30/37663-418005775_large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-3">
                <div className="d-flex justify-content-center">
                  <div className="detail">
                    <h2 className="mb-3 fw-bold" style={{'color':'white'}}>Mkulima Digital</h2>
                    <p style={{'color':'white'}}>We Digitise Grain Management for Over 11,600 Agribusinesses Globally</p>
                    <hr className="mb-3" style={{'color':'white'}} />
                    <Link to="/login" className="text-decoration-none fw-normal" style={{'color':'white'}}>
                      LOGIN
                    </Link>
                    <div className="arrow mt-4">
                      <i className="bi bi-chevron-down" style={{'color':'white'}}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className='body1'>
        <div className="container">
          <div className="slider-wrapper">
            <button id="prev-slide" className="slide-button material-symbols-rounded">
              chevron_left
            </button>
            <ul className="image-list">
              {imageList.map((imgSrc, index) => (
                <li key={`img-${index + 1}`}>
                  <img className="image-item" src={imgSrc} alt={`img-${index + 1}`} />
                </li>
              ))}
            </ul>
            <button id="next-slide" className="slide-button material-symbols-rounded">
              chevron_right
            </button>
          </div>
          <div className="slider-scrollbar">
            <div className="scrollbar-track">
              <div className="scrollbar-thumb"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="image-display-container">
        <h2 className="image-heading">Hard-working Solutions</h2>
        <div className="image-cards-container">
          {images.map((image, index) => (
            <div key={index} className="image-card">
              <img src={image.url} alt={`Image ${index + 1}`} className="image" />
              <h5 className='title'>{image.title}</h5>
              <p className="display-description">{image.description}</p>
              <button className="discover-button">DISCOVER</button>
            </div>
          ))}
        </div>
      </div>
      <div className="support-section">
        <h2 className="support-title">GET REAL SUPPORT</h2>
        <p className="support-description">Here when you need us.</p>
        <div className="support-content">
          <div className="support-category">
            <h3 className="category-title">Sales</h3>
            <p className="category-text">
              Want to chat with sales? Simply complete our contact form and a member of our team will be in touch.
              Alternatively, you can book a demo for a time convenient to you.
            </p>
          </div>
          <div className="vertical-line"></div>
          <div className="support-category">
            <h3 className="category-title">Support</h3>
            <p className="category-text">
              Get the help you need, when you need it. Our Knowledgebase articles guide you through our most common support
              requests. Simply contact our team if you need extra help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

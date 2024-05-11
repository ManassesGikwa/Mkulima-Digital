import React, { useEffect, useState } from 'react';

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

const Home = () => {
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
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

  useEffect(() => {
    const initSlider = () => {
      const imageList = document.querySelector(".slider-wrapper .image-list");
      const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
      const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
      const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");

      if (imageList) {
        const maxScroll = imageList.scrollWidth - imageList.clientWidth;
        setMaxScrollLeft(maxScroll);

        // Handle scrollbar thumb drag
        scrollbarThumb.addEventListener("mousedown", (e) => {
          const startX = e.clientX;
          const thumbPosition = scrollbarThumb.offsetLeft;
          const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

          const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScroll;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
          }

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          }

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        });

        // Slide images according to the slide button clicks
        slideButtons.forEach(button => {
          button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
          });
        });

        // Show or hide slide buttons based on scroll position
        const handleSlideButtons = () => {
          slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
          slideButtons[1].style.display = imageList.scrollLeft >= maxScroll ? "none" : "flex";
        }

        // Update scrollbar thumb position based on image scroll
        const updateScrollThumbPosition = () => {
          const scrollPosition = imageList.scrollLeft;
          const thumbPosition = (scrollPosition / maxScroll) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
          scrollbarThumb.style.left = `${thumbPosition}px`;
        }

        // Event listeners for image list scroll
        imageList.addEventListener("scroll", () => {
          updateScrollThumbPosition();
          handleSlideButtons();
        });
      }
    };

    // Initialize slider on load and resize
    initSlider();
    window.addEventListener("resize", initSlider);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("resize", initSlider);
    };
  }, [maxScrollLeft]);

  return (
    <div className='main'>
      <div className="video position-relative">
    <video autoPlay muted loop id="myVideo">
      <source
        src="https://video.wixstatic.com/video/c0bbc5_ea3fdc8d953b4dbcab20a021d2ef1389/1080p/mp4/file.mp4"
        type="video/mp4"
      />
    </video>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-3">
          <div className="d-flex justify-content-center">
            <div className="detail">
              <h2 className="mb-3 fw-bold">Mkulima Digital</h2>
              <hr className="mb-3" />
              <p>
                We Digitise Grain Management for over 11, 600 Agribusinesses Globally
              </p>
              <a href="" className="text-decoration-none fw-normal">
                LOGIN
              </a>
              <div className="arrow mt-4">
                <i className="bi bi-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
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
    </div>
  );
};

export default Home;

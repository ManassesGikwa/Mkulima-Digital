import React from 'react'

const Header = () => {
  return (
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
              <h2 className="mb-3 fw-bold">Mkulima Gigital</h2>
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
  )
}

export default Header
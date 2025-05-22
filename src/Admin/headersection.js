import React from 'react';

const HeaderSection = ({
  bg,
  fullScreen = false,
  fullWidth = true,
  overlay = false,
  overlayColor = '#ffffff',
  overlayOpacity = 0.8,
  showDesc = true,
  showTitle = true,
  showIcon = true,
  icon = '#000000',
  iconBg = '#ffffff',
  showName = true,
  showRole = true,
  showButtons = true,
  showImageOverlay = true,
  imageOver = '#B6E5D8',
  imageOverOpacity = 0.6,
  fallBackImage = '../_images/background1.jpg',
}) => {
  return (
    <section
      data-bs-version="5.1"
      className={`header01 immersem5 ${fullScreen ? 'mbr-fullscreen' : ''} ${
        bg.parallax ? 'mbr-parallax-background' : ''
      }`}
      group="Headers"
      data-bg-video={bg.type === 'video' ? bg.value.url : undefined}
    >
      {bg.type === 'video' && (
        <div className="mbr-fallback-image disabled"></div>
      )}

      {overlay && bg.type !== 'color' && (
        <div
          className="mbr-overlay"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        ></div>
      )}

      <div className={fullWidth ? 'container-fluid' : 'container'}>
        <div className="row">
          <div className="col-12">
            <div className="content-wrapper">
              <div className="image-wrap">
                <img
                  src="https://r.mobirisesite.com/1499700/assets/images/photo-1562774053-701939374585.jpeg"
                  alt="Mobirise"
                />
                {showImageOverlay && (
                  <div
                    className="image-overlay"
                    style={{
                      backgroundColor: imageOver,
                      opacity: imageOverOpacity,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                )}
              </div>

              <div className="title-wrapper">
                {showDesc && (
                  <p className="mbr-desc mbr-fonts-style">Breaking</p>
                )}
                {showTitle && (
                  <h1 className="mbr-section-title mbr-fonts-style">
                    <b>College News Today</b>
                  </h1>
                )}
              </div>

              <div className="content-wrap">
                {showIcon && (
                  <a href="#" className="icon-wrapper">
                    <span
                      className="mbr-iconfont mobi-mbri-search mobi-mbri"
                      style={{
                        color: icon,
                        backgroundColor: iconBg,
                      }}
                    ></span>
                  </a>
                )}
                {showName && (
                  <p className="mbr-name mbr-fonts-style">
                    <b>Your Campus Source</b>
                  </p>
                )}
                {showRole && (
                  <p className="mbr-role mbr-fonts-style">
                    Get the freshest college news. Stay connected with our AI
                    and manually curated content. Never miss a beat!
                  </p>
                )}
                {showButtons && (
                  <div className="mbr-section-btn">
                    <a className="btn btn-white" href="https://mobiri.se">
                      View All
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;

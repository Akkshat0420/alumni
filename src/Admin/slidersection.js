import React from 'react';

const SliderSection = ({
  fullScreen = false,
  fullWidth = false,
  showTitle = true,
  showDesc = true,
  showText = true,
  showButtons = true,
  autoplay = false,
  interval = 5,
  loop = true,
  draggable = true,
  arrows = true,
  arrowsMobile = true,
  arrowsColor = '#000000',
  gap = 1,
  showImageOverlay = true,
  imageOver = '#B6E5D8',
  imageOverOpacity = 0.6,
  overlay = true,
  overlayColor = '#ffffff',
  overlayOpacity = 0.1,
  bg = {
    type: 'image', // or 'color'
    image: '../_images/background1.jpg',
    color: '#ffffff',
    parallax: true,
  }
}) => {
  return (
    <section
      className={`slider05 mbr-embla ${fullScreen ? 'mbr-fullscreen' : ''} ${bg.parallax ? 'mbr-parallax-background' : ''}`}
      data-bs-version="5.1"
    >
      {overlay && bg.type !== 'color' && <div className="mbr-overlay"></div>}

      <div className={fullWidth ? 'container-fluid' : 'container'}>
        <div className="row">
          <div className="col-12">
            <div className="content-wrapper">
              <div className="content-wrap">
                {showDesc && (
                  <p className="mbr-desc mbr-fonts-style" data-app-selector=".mbr-desc">
                    Spotlight
                  </p>
                )}

                <div className="title-wrapper">
                  {showTitle && (
                    <h2 className="mbr-section-title mbr-fonts-style" data-app-selector=".mbr-section-title, .mbr-section-btn">
                      <b>Hot Off</b>
                    </h2>
                  )}

                  <div className="text-wrapper">
                    {showText && (
                      <p className="mbr-text mbr-fonts-style" data-app-selector=".mbr-text, .text-wrapper">
                        Important updates and stories.
                      </p>
                    )}
                  </div>
                </div>

                {showButtons && (
                  <div className="mbr-section-btn" data-toolbar="-mbrBtnMove">
                    <a className="btn btn-white" href="https://mobiri.se">
                      More Info
                    </a>
                  </div>
                )}
              </div>

              <div
                className="embla"
                data-loop={loop}
                data-auto-play={autoplay}
                data-auto-play-interval={interval}
                data-draggable={draggable}
                data-skip-snaps="true"
                data-align="center"
                data-contain-scroll="trimSnaps"
              >
                <div className="embla__viewport">
                  <div className="embla__container">
                    {[
                      'https://r.mobirisesite.com/1499700/assets/images/photo-1554473675-d0904f3cbf38.jpeg',
                      'https://r.mobirisesite.com/1499700/assets/images/photo-1606761568499-6d2451b23c66.jpeg',
                      'https://r.mobirisesite.com/1499700/assets/images/photo-1516979187457-637abb4f9353.jpeg',
                    ].map((src, index) => (
                      <div
                        key={index}
                        className="embla__slide slider-image item"
                        style={{
                          marginLeft: `${gap}rem`,
                          marginRight: `${gap}rem`,
                        }}
                      >
                        <div className="slide-content">
                          <div className="item-wrapper">
                            <div className="item-img">
                              <img src={src} alt="Mobirise Website Builder" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {arrows && (
                  <>
                    <button className="embla__button embla__button--prev">
                      <span className="mbr-iconfont mobi-mbri-left mobi-mbri" aria-hidden="true"></span>
                      <span className="sr-only visually-hidden">Previous</span>
                    </button>
                    <button className="embla__button embla__button--next">
                      <span className="mbr-iconfont mobi-mbri-right mobi-mbri" aria-hidden="true"></span>
                      <span className="sr-only visually-hidden">Next</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;

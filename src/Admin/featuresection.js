import React from 'react';

const FeaturesSection = ({
  fullScreen = false,
  fullWidth = true,
  showIcon = true,
  showTags = true,
  showTitle = true,
  showText = true,
  showSocial = false,
  soc = 1,
  socColor = '#ffffff',
  socBg = '#000000',
  cardBg = '#f3f6f9',
  bg = { type: 'image', value: '../_images/background1.jpg', parallax: false },
  overlay = false,
  overlayColor = '#ffffff',
  overlayOpacity = 0.8,
}) => {
  const cards = [
    {
      img: 'https://r.mobirisesite.com/1499700/assets/images/photo-1507537509458-b8312d35a233.jpeg',
      tags: ['Awards', 'Events'],
      title: 'Carter Wins Award',
      text: 'Dr. Emily Carter receives prestigious award for her research in renewable energy.',
    },
    {
      img: 'https://r.mobirisesite.com/1499700/assets/images/photo-1541829070764-84a7d30dd3f3.jpeg',
      tags: ['Achievements', 'Scholarships'],
      title: 'Spring Fest Coming',
      text: 'The annual Spring Festival will feature live music, food trucks, and student performances.',
    },
    {
      img: 'https://r.mobirisesite.com/1499700/assets/images/photo-1434030216411-0b793f4b4173.jpeg',
      tags: ['Sports', 'Research'],
      title: 'Debate Team Wins',
      text: 'The debate team secures victory at the national championship, showcasing exceptional talent.',
    },
    {
      img: 'https://r.mobirisesite.com/1499700/assets/images/photo-1522202176988-66273c2fd55f.jpeg',
      tags: ['Student Life', 'Innovation'],
      title: 'Hackathon Winners',
      text: 'Students demonstrate outstanding creativity in campus-wide innovation challenge.',
    },
  ];

  return (
    <section
      className={`features05 immersem5 ${fullScreen ? 'mbr-fullscreen' : ''} ${bg.parallax ? 'mbr-parallax-background' : ''}`}
    >
      {bg.type === 'video' && <div className="mbr-fallback-image disabled"></div>}
      {overlay && bg.type !== 'color' && (
        <div className="mbr-overlay" style={{ opacity: overlayOpacity, backgroundColor: overlayColor }}></div>
      )}

      <div className={fullWidth ? 'container-fluid' : 'container'}>
        <div className="row">
          {cards.map((card, idx) => (
            <div key={idx} className="item features-image col-12 col-lg-6">
              <div className="item-wrapper" style={{ backgroundColor: cardBg }}>
                <div className="item-img">
                  <img src={card.img} alt={card.title} />
                </div>
                <div className="item-content">
                  {(showIcon || showTags) && (
                    <div className="item-desc">
                      {showIcon && (
                        <div className="icon-wrapper">
                          <span className="mbr-iconfont mobi-mbri-user-2 mobi-mbri"></span>
                        </div>
                      )}
                      {showTags && (
                        <ul className="list mbr-fonts-style">
                          {card.tags.map((tag, i) => (
                            <li key={i} className="item-wrap">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  <div className="title-wrapper">
                    <div className="title-wrap">
                      {showTitle && <h4 className="item-title mbr-fonts-style"><b>{card.title}</b></h4>}
                      {showText && <p className="item-text mbr-fonts-style">{card.text}</p>}
                    </div>
                    {showSocial && (
                      <div className="social-wrapper">
                        <div className="soc-item">
                          <a href="https://mobiri.se/">
                            <span className="mbr-iconfont socicon socicon-facebook" style={{ color: socColor, backgroundColor: socBg }}></span>
                          </a>
                        </div>
                        {soc > 1 && (
                          <div className="soc-item">
                            <a href="https://mobiri.se/">
                              <span className="mbr-iconfont socicon socicon-youtube" style={{ color: socColor, backgroundColor: socBg }}></span>
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
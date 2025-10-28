import React, { useEffect, useState, useRef } from "react";


const Gallery: React.FC = () => {

  
// Entry point
 function setupGallery(): void {
  setupCarousels();
  setupCarouselNavigation();
  startAutoScroll();
}

// -------------------------------
// 1️⃣ setupCarousels
// -------------------------------
function setupCarousels(): void {
  const imagesCarousel = document.getElementById('images-carousel');
  const videosCarousel = document.getElementById('videos-carousel');

  if (!imagesCarousel || !videosCarousel) {
    console.warn('❌ Carousels not found.');
    return;
  }

  // Handle image clicks
  imagesCarousel.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const carouselItem = target.closest('.carousel-item');
    if (!carouselItem) return;

    const img = carouselItem.querySelector('img');
    if (img instanceof HTMLImageElement) {
      showImageModal(img.src, img.alt);
    }
  });

  // Handle video clicks
  videosCarousel.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const carouselItem = target.closest('.carousel-item');
    if (!carouselItem) return;

    const video = carouselItem.querySelector('video');
    if (video instanceof HTMLVideoElement) {
      const source = video.querySelector('source');
      if (source instanceof HTMLSourceElement) {
        showVideoModal(source.src);
      }
    }
  });

  const imageItems = document.querySelectorAll('#images-carousel .carousel-item');
  const videoItems = document.querySelectorAll('#videos-carousel .carousel-item');
  console.log(`✅ Carousels setup with ${imageItems.length} images and ${videoItems.length} videos.`);
}

// -------------------------------
// 2️⃣ setupCarouselNavigation
// -------------------------------
function setupCarouselNavigation(): void {
  const carouselControls = document.querySelectorAll<HTMLElement>('.carousel-controls');

  carouselControls.forEach((control) => {
    const carouselType = control.dataset.carousel;
    if (!carouselType) return;

    const prevBtn = control.querySelector('.prev-btn') as HTMLButtonElement | null;
    const nextBtn = control.querySelector('.next-btn') as HTMLButtonElement | null;
    const carousel = document.getElementById(`${carouselType}-carousel`);
    if (!carousel || !prevBtn || !nextBtn) return;

    const track = carousel.querySelector('.carousel-track') as HTMLElement | null;
    if (!track) return;

    const slides = track.querySelectorAll<HTMLElement>('.carousel-item');
    const slidesToShow = getSlidesToShow();
    const maxSlides = Math.max(0, slides.length - slidesToShow);
    let currentSlide = 0;

    const updateButtons = (): void => {
      prevBtn.disabled = false;
      nextBtn.disabled = false;

      if (carouselType === 'images') {
        const info = document.getElementById('current-slide-info');
        if (info) {
          const start = currentSlide + 1;
          const end = Math.min(currentSlide + slidesToShow, slides.length);
          info.textContent = `Manual mode - Showing ${start}-${end} of ${slides.length}`;
        }
      }
    };

    const moveCarousel = (direction: 'next' | 'prev'): void => {
      const slideWidth = slides[0]?.offsetWidth ?? 0 + 24;

      if (direction === 'next') {
        currentSlide = currentSlide >= maxSlides ? 0 : currentSlide + 1;
      } else {
        currentSlide = currentSlide <= 0 ? maxSlides : currentSlide - 1;
      }

      track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      track.style.transition = 'transform 0.3s ease';

      updateButtons();
    };

    prevBtn.addEventListener('click', () => moveCarousel('prev'));
    nextBtn.addEventListener('click', () => moveCarousel('next'));

    updateButtons();
  });
}

// -------------------------------
// 3️⃣ startAutoScroll
// -------------------------------
function startAutoScroll(): void {
  const carouselIds = ['images-carousel', 'videos-carousel'];

  carouselIds.forEach((carouselId) => {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track') as HTMLElement | null;
    if (!track) return;

    const items = track.querySelectorAll('.carousel-item');
    const cloneCount = carouselId === 'images-carousel' ? 2 : 1;

    // Clone for infinite scroll
    for (let i = 0; i < cloneCount; i++) {
      items.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        track.appendChild(clone);
      });
    }

    track.classList.add('auto-scroll-infinite');

    const indicator = document.createElement('div');
    indicator.className = 'auto-scroll-indicator';
    indicator.innerHTML = '<i class="fas fa-play"></i> Auto-sliding';
    carousel.appendChild(indicator);

    carousel.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    carousel.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  });
}

// -------------------------------
// 4️⃣ Helper functions
// -------------------------------
function showImageModal(src: string, alt: string): void {
  console.log(`🖼️ Show image modal: ${alt} (${src})`);
}

function showVideoModal(src: string): void {
  console.log(`🎥 Show video modal: ${src}`);
}

function getSlidesToShow(): number {
  return window.innerWidth < 768 ? 1 : 3;
}

const [visible, setVisible] = useState(false);
const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
      setupGallery();
      
    }, []);


  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">ZOOT in action</p>
        </div>

        {/* Images Carousel */}
        <div className="carousel-section">
          <div className="carousel-header">
            <h3>
              📸 Images <span className="image-counter">(20 photos)</span>
            </h3>
            <div className="carousel-header-controls">
              <div className="carousel-controls" data-carousel="images">
                <button className="carousel-btn prev-btn" data-direction="prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="carousel-btn next-btn" data-direction="next">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="carousel-container" id="images-carousel">
            <div className="carousel-track">
              {[
                "photo_2025-08-05_00-53-48.jpg",
                "photo_2025-08-05_00-52-14.jpg",
                "photo_2025-08-05_00-50-24.jpg",
                "photo_2025-08-05_00-50-17.jpg",
                "photo_2025-08-05_00-50-12.jpg",
                "photo_2025-08-05_00-14-28.jpg",
                "photo_2025-08-05_00-14-20.jpg",
                "photo_2025-08-05_00-13-59.jpg",
                "photo_2025-08-01_21-20-09.jpg",
                "photo_2025-07-30_06-58-34.jpg",
                "photo_2025-07-30_04-21-01.jpg",
                "photo_2025-07-30_02-06-51.jpg",
                "photo_2025-07-27_01-30-25.jpg",
                "photo_2025-07-26_22-13-32.jpg",
                "photo_2025-07-24_00-06-01.jpg",
                "photo_2025-07-23_04-31-33.jpg",
                "photo_2025-07-22_00-33-40.jpg",
                "photo_2025-07-16_00-08-49.jpg",
                "photo_2024-11-29_01-29-32.jpg",
                "Gy7bRC5a8AAezDo.jpg",
              ].map((img, index) => (
                <div className="carousel-item" key={index}>
                  <img
                    src={`ZOOT AF EXMP/${img}`}
                    alt={`ZOOT Image ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-info">
            <p>
              <i className="fas fa-info-circle"></i> Use the arrow buttons to
              navigate through all 20 images
            </p>
            <div
              className="carousel-debug"
              style={{ marginTop: "10px", fontSize: "0.8rem", color: "#666" }}
            >
              <span id="current-slide-info">Loading images...</span>
            </div>
          </div>
        </div>

        {/* Videos Carousel */}
        <div className="carousel-section">
          <div className="carousel-header">
            <h3>🎬 Videos</h3>
            <div className="carousel-header-controls">
              <div className="carousel-controls" data-carousel="videos">
                <button className="carousel-btn prev-btn" data-direction="prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="carousel-btn next-btn" data-direction="next">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="carousel-container" id="videos-carousel">
            <div className="carousel-track">
              {[
                "bg_1.mp4",
                "envato_video_gen_Aug_02_2025_1_55_21.mp4",
                "video 01 (1).mp4",
                "video 01 (2).mp4",
                "video 01 (3).mp4",
                "video 01 (4).mp4",
                "video_2024-09-12_02-28-21.mp4",
                "video_2024-11-28_18-03-47.mp4",
                "video_2024-11-28_18-03-53.mp4",
                "video_2025-07-31_13-20-28.mp4",
              ].map((vid, index) => (
                <div ref={ref} className="carousel-item" key={index}>
            
              <video
                muted
                loop
                poster=""
                preload="none"
                controls
                autoPlay
              >
                <source src={`ZOOT AF EXMP/${vid}`} type="video/mp4"  />
                Your browser does not support the video tag.
              </video>
           
                  <div className="video-overlay">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

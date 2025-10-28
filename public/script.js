// Constants and Configuration
const PRESALE_CONFIG = {
    rateStage1: 1000000, // 1 SOL = 1,000,000 ZOOT
    rateStage2: 800000,  // 1 SOL = 800,000 ZOOT
    rateStage3: 600000,  // 1 SOL = 600,000 ZOOT
    minPurchase: 0.1,    // Minimum 0.1 SOL
    endDate: new Date('2025-03-31T23:59:59').getTime(),
    targetRaised: 1000   // Target 1000 SOL
};

// Global variables
let walletConnected = false;
let currentWallet = null;
let currentProvider = null;
let totalRaised = 0;
let totalContributors = 0;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupCountdown();
    setupPresaleWidget();
    setupGallery();
    setupTokenomicsChart();
    setupScrollAnimations();
    updateStats();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Countdown timer
function setupCountdown() {
    const countdownElement = document.getElementById('timeLeft');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = PRESALE_CONFIG.endDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            countdownElement.textContent = "Presale Ended";
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Presale widget functionality
function setupPresaleWidget() {
    const connectWalletBtn = document.getElementById('connectWallet');
    const solAmountInput = document.getElementById('solAmount');
    const zootAmountInput = document.getElementById('zootAmount');
    const buyTokensBtn = document.getElementById('buyTokens');
    const walletStatus = document.getElementById('walletStatus');

    // Connect wallet functionality
    connectWalletBtn.addEventListener('click', connectWallet);
    
    // SOL amount input change
    solAmountInput.addEventListener('input', function() {
        const solAmount = parseFloat(this.value) || 0;
        const zootAmount = solAmount * PRESALE_CONFIG.rateStage1;
        zootAmountInput.value = zootAmount.toLocaleString();
        
        // Enable/disable buy button
        if (walletConnected && solAmount >= PRESALE_CONFIG.minPurchase) {
            buyTokensBtn.disabled = false;
            buyTokensBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            buyTokensBtn.disabled = true;
            buyTokensBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    });

    // Buy tokens functionality
    buyTokensBtn.addEventListener('click', buyTokens);
}

// Wallet connection functions
async function connectWallet() {
    try {
        // Check if Phantom wallet is installed
        if (window.solana && window.solana.isPhantom) {
            const response = await window.solana.connect();
            currentWallet = response.publicKey.toString();
            currentProvider = window.solana;
            updateWalletUI(true);
        } else if (window.solflare && window.solflare.isSolflare) {
            const response = await window.solflare.connect();
            currentWallet = response.publicKey.toString();
            currentProvider = window.solflare;
            updateWalletUI(true);
        } else {
            // Show wallet selection modal
            showWalletModal();
        }
    } catch (error) {
        console.error('Wallet connection failed:', error);
        showNotification('Failed to connect wallet. Please try again.', 'error');
    }
}

function updateWalletUI(connected) {
    const connectWalletBtn = document.getElementById('connectWallet');
    const walletStatus = document.getElementById('walletStatus');
    const buyTokensBtn = document.getElementById('buyTokens');
    
    walletConnected = connected;
    
    if (connected) {
        connectWalletBtn.innerHTML = `<i class="fas fa-wallet"></i> ${currentWallet.substring(0, 8)}...`;
        connectWalletBtn.style.background = '#2ecc71';
        
        walletStatus.innerHTML = `<i class="fas fa-check-circle" style="color: #2ecc71;"></i> Wallet Connected`;
        walletStatus.style.background = 'rgba(46, 204, 113, 0.1)';
        walletStatus.style.border = '1px solid rgba(46, 204, 113, 0.3)';
        
        // Enable buy button if amount is valid
        const solAmount = parseFloat(document.getElementById('solAmount').value) || 0;
        if (solAmount >= PRESALE_CONFIG.minPurchase) {
            buyTokensBtn.disabled = false;
            buyTokensBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    } else {
        connectWalletBtn.innerHTML = `<i class="fas fa-wallet"></i> Connect Wallet`;
        connectWalletBtn.style.background = '';
        
        walletStatus.innerHTML = `<i class="fas fa-wallet"></i> Connect your wallet to continue`;
        walletStatus.style.background = '';
        walletStatus.style.border = '';
        
        buyTokensBtn.disabled = true;
        buyTokensBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

function showWalletModal() {
    const modal = document.createElement('div');
    modal.className = 'wallet-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Connect Wallet</h3>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <p>To participate in the ZOOT presale, please install one of the following Solana wallets:</p>
                <div class="wallet-options">
                    <a href="https://phantom.app/" target="_blank" class="wallet-option">
                        <img src="https://phantom.app/img/phantom-icon.svg" alt="Phantom">
                        <span>Phantom Wallet</span>
                    </a>
                    <a href="https://solflare.com/" target="_blank" class="wallet-option">
                        <img src="https://solflare.com/assets/solflare-logo.svg" alt="Solflare">
                        <span>Solflare Wallet</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .wallet-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            overflow: hidden;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        .close-modal {
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        .modal-body {
            padding: 1.5rem;
        }
        .wallet-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
        }
        .wallet-option {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            text-decoration: none;
            color: #333;
            transition: all 0.3s ease;
        }
        .wallet-option:hover {
            border-color: #ff6b6b;
            background: #f8f9fa;
        }
        .wallet-option img {
            width: 32px;
            height: 32px;
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
}

// Buy tokens functionality
async function buyTokens() {
    if (!walletConnected || !currentProvider) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const solAmount = parseFloat(document.getElementById('solAmount').value);
    
    if (solAmount < PRESALE_CONFIG.minPurchase) {
        showNotification(`Minimum purchase is ${PRESALE_CONFIG.minPurchase} SOL`, 'error');
        return;
    }
    
    try {
        // Show loading state
        const buyBtn = document.getElementById('buyTokens');
        const originalText = buyBtn.innerHTML;
        buyBtn.innerHTML = '<span class="loading"></span> Processing...';
        buyBtn.disabled = true;

        // Initialize contract if not already initialized
        if (!zootContract.connection) {
            const initialized = await zootContract.initialize();
            if (!initialized) {
                throw new Error('Failed to initialize contract');
            }
        }

        // Check if wallet has sufficient balance
        const hasSufficientBalance = await zootContract.checkSufficientBalance(currentWallet, solAmount);
        if (!hasSufficientBalance) {
            throw new Error('Insufficient SOL balance');
        }

        // Create and send transaction
        const transaction = await zootContract.createPurchaseTransaction(
            new solanaWeb3.PublicKey(currentWallet),
            solAmount
        );

        // Request signature from wallet
        const signature = await currentProvider.signAndSendTransaction(transaction);
        
        // Verify transaction success
        await zootContract.verifyTransaction(signature);
        
        // Update stats
        totalRaised += solAmount;
        totalContributors++;
        updateStats();
        
        // Show success
        showNotification(`Successfully purchased ${(solAmount * PRESALE_CONFIG.rateStage1).toLocaleString()} ZOOT tokens!`, 'success');
        
        // Reset form
        document.getElementById('solAmount').value = '';
        document.getElementById('zootAmount').value = '';
        
        // Reset button
        buyBtn.innerHTML = originalText;
        buyBtn.disabled = true;
        buyBtn.classList.add('opacity-50', 'cursor-not-allowed');
        
    } catch (error) {
        console.error('Transaction failed:', error);
        showNotification(error.message || 'Transaction failed. Please try again.', 'error');
        
        // Reset button
        const buyBtn = document.getElementById('buyTokens');
        buyBtn.innerHTML = 'Buy ZOOT Tokens';
        buyBtn.disabled = false;
        buyBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Simulate transaction (replace with actual Solana implementation)
async function simulateTransaction(amount) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate transaction success
            resolve(true);
        }, 2000);
    });
}

// Update statistics
function updateProgress() {
    const progressBar = document.querySelector('.stage.active .progress');
    const progressText = document.getElementById('stage1-progress');
    const percentage = (totalRaised / PRESALE_CONFIG.targetRaised) * 100;
    const clampedPercentage = Math.min(100, Math.max(0, percentage));
    
    progressBar.style.width = `${clampedPercentage}%`;
    progressText.textContent = `${Math.floor(clampedPercentage)}% Complete`;
}

function updateStats() {
    const raisedAmount = document.getElementById('raisedAmount');
    const contributors = document.getElementById('contributors');
    
    raisedAmount.textContent = `${totalRaised} SOL`;
    contributors.textContent = totalContributors.toLocaleString();
    
    // Update the progress bar
    updateProgress();
}

// Carousel functionality
function setupGallery() {
    setupCarousels();
    setupCarouselNavigation();
    startAutoScroll();
}

function setupCarousels() {
    // Setup image carousel click handlers using event delegation
    const imagesCarousel = document.getElementById('images-carousel');
    imagesCarousel.addEventListener('click', function(e) {
        const carouselItem = e.target.closest('.carousel-item');
        if (carouselItem) {
            const img = carouselItem.querySelector('img');
            if (img) {
                showImageModal(img.src, img.alt);
            }
        }
    });

    // Setup video carousel click handlers using event delegation
    const videosCarousel = document.getElementById('videos-carousel');
    videosCarousel.addEventListener('click', function(e) {
        const carouselItem = e.target.closest('.carousel-item');
        if (carouselItem) {
            const video = carouselItem.querySelector('video');
            if (video) {
                showVideoModal(video.querySelector('source').src);
            }
        }
    });

    const imageItems = document.querySelectorAll('#images-carousel .carousel-item');
    const videoItems = document.querySelectorAll('#videos-carousel .carousel-item');
    console.log('Carousels setup with', imageItems.length, 'images and', videoItems.length, 'videos');
}

function setupCarouselNavigation() {
    const carouselControls = document.querySelectorAll('.carousel-controls');
    
    carouselControls.forEach(control => {
        const carouselType = control.dataset.carousel;
        const prevBtn = control.querySelector('.prev-btn');
        const nextBtn = control.querySelector('.next-btn');
        const carousel = document.getElementById(`${carouselType}-carousel`);
        const track = carousel.querySelector('.carousel-track');
        
        let currentSlide = 0;
        const slides = track.querySelectorAll('.carousel-item');
        const slidesToShow = getSlidesToShow();
        const maxSlides = Math.max(0, slides.length - slidesToShow);
        
        console.log(`${carouselType}: ${slides.length} slides, showing ${slidesToShow}, max slide: ${maxSlides}`);
        
        // Update button states and debug info
        function updateButtons() {
            // Enable both buttons for infinite scrolling
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            
            // Update debug info for images carousel
            if (carouselType === 'images' && document.getElementById('current-slide-info')) {
                const startImage = currentSlide + 1;
                const endImage = Math.min(currentSlide + slidesToShow, slides.length);
                document.getElementById('current-slide-info').textContent = 
                    `Manual mode - Showing images ${startImage}-${endImage} of ${slides.length} | Slide ${currentSlide + 1}/${maxSlides + 1}`;
            }
        }
        
        // Move carousel
        function moveCarousel(direction) {
            const oldSlide = currentSlide;
            
            if (direction === 'next' && currentSlide < maxSlides) {
                currentSlide++;
            } else if (direction === 'prev' && currentSlide > 0) {
                currentSlide--;
            } else if (direction === 'next' && currentSlide >= maxSlides) {
                // Loop back to start
                currentSlide = 0;
            } else if (direction === 'prev' && currentSlide === 0) {
                // Loop to end
                currentSlide = maxSlides;
            }
            
            if (oldSlide !== currentSlide || direction === 'next' || direction === 'prev') {
                const slideWidth = slides[0].offsetWidth + 24; // 24px for margin
                track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
                track.style.transition = 'transform 0.3s ease';
                console.log(`Moved to slide ${currentSlide}, transform: translateX(-${currentSlide * slideWidth}px)`);
            }
            
            updateButtons();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            // Disable auto-scroll and use manual control
            const track = carousel.querySelector('.carousel-track');
            if (track.classList.contains('auto-scroll-infinite')) {
                track.classList.remove('auto-scroll-infinite');
                track.style.animation = 'none';
                track.style.transform = 'translateX(0)';
                currentSlide = 0; // Reset position
            }
            moveCarousel('next');
        });
        
        prevBtn.addEventListener('click', () => {
            // Disable auto-scroll and use manual control
            const track = carousel.querySelector('.carousel-track');
            if (track.classList.contains('auto-scroll-infinite')) {
                track.classList.remove('auto-scroll-infinite');
                track.style.animation = 'none';
                track.style.transform = 'translateX(0)';
                currentSlide = 0; // Reset position
            }
            moveCarousel('prev');
        });
        
        // Initialize
        updateButtons();
        
        // Store reference for auto-scroll
        carousel.carouselControls = { currentSlide, maxSlides, moveCarousel, updateButtons };
    });
}

function getSlidesToShow() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
}

function startAutoScroll() {
    const carousels = ['images-carousel', 'videos-carousel'];
    
    carousels.forEach(carouselId => {
        const carousel = document.getElementById(carouselId);
        const track = carousel.querySelector('.carousel-track');
        const items = track.querySelectorAll('.carousel-item');
        
        console.log(`Setting up auto-scroll for ${carouselId} with ${items.length} items`);
        
        // Clone items multiple times to ensure smooth infinite scroll
        // For images with 56 items, we need more clones to see all images
        const cloneCount = carouselId === 'images-carousel' ? 2 : 1;
        
        for (let i = 0; i < cloneCount; i++) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
        }
        
        // Enable infinite auto-scroll
        track.classList.add('auto-scroll-infinite');
        
        // Calculate total width for proper animation
        const totalItems = track.querySelectorAll('.carousel-item').length;
        console.log(`Total items after cloning: ${totalItems}`);
        
        // Add auto-scroll indicator
        const indicator = document.createElement('div');
        indicator.className = 'auto-scroll-indicator';
        indicator.innerHTML = '<i class="fas fa-play"></i> Auto-sliding';
        carousel.appendChild(indicator);
        
        // Reset position when animation completes
        track.addEventListener('animationiteration', () => {
            track.style.transform = 'translateX(0)';
        });
        
        // Pause animation on hover
        carousel.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
}

function showImageModal(src, alt) {
    console.log('Opening modal for image:', src);
    
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="close-image-modal">&times;</span>
            <div class="image-loading">Loading...</div>
            <img src="${src}" alt="${alt}" style="display: none;">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .image-modal.show {
            opacity: 1;
        }
        .image-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        }
        .image-modal-content img {
            max-width: 100%;
            max-height: 80vh;
            width: auto;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .image-loading {
            color: white;
            font-size: 1.2rem;
            padding: 2rem;
        }
        .close-image-modal {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 2rem;
            color: white;
            cursor: pointer;
            z-index: 10001;
            background: rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }
        .close-image-modal:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // Handle image loading
    const img = modal.querySelector('img');
    const loading = modal.querySelector('.image-loading');
    
    img.onload = function() {
        loading.style.display = 'none';
        img.style.display = 'block';
        console.log('Image loaded successfully');
    };
    
    img.onerror = function() {
        loading.innerHTML = 'Failed to load image';
        console.error('Failed to load image:', src);
    };
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 50);
    
    // Close modal functionality
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
            if (style.parentNode) {
                document.head.removeChild(style);
            }
        }, 300);
    }
    
    modal.querySelector('.close-image-modal').addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Video modal functionality
function showVideoModal(src) {
    console.log('Opening modal for video:', src);
    
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <span class="close-video-modal">&times;</span>
            <div class="video-loading">Loading video...</div>
            <video controls autoplay style="display: none;">
                <source src="${src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .video-modal.show {
            opacity: 1;
        }
        .video-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        }
        .video-modal-content video {
            max-width: 100%;
            max-height: 80vh;
            width: auto;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .video-loading {
            color: white;
            font-size: 1.2rem;
            padding: 2rem;
        }
        .close-video-modal {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 2rem;
            color: white;
            cursor: pointer;
            z-index: 10001;
            background: rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }
        .close-video-modal:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // Handle video loading
    const video = modal.querySelector('video');
    const loading = modal.querySelector('.video-loading');
    
    video.onloadeddata = function() {
        loading.style.display = 'none';
        video.style.display = 'block';
        console.log('Video loaded successfully');
    };
    
    video.onerror = function() {
        loading.innerHTML = 'Failed to load video';
        console.error('Failed to load video:', src);
    };
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 50);
    
    // Close modal functionality
    function closeVideoModal() {
        video.pause(); // Stop video playback
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
            if (style.parentNode) {
                document.head.removeChild(style);
            }
        }, 300);
    }
    
    modal.querySelector('.close-video-modal').addEventListener('click', closeVideoModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });
}

// Tokenomics chart
function setupTokenomicsChart() {
    const ctx = document.getElementById('tokenomicsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Presale', 'Liquidity', 'Marketing', 'Team', 'Rewards'],
            datasets: [{
                data: [40, 25, 15, 10, 10],
                backgroundColor: [
                    '#ff6b6b',
                    '#4ecdc4',
                    '#45b7d1',
                    '#f9ca24',
                    '#a55eea'
                ],
                borderWidth: 0,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature, .detail-card, .timeline-item, .carousel-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 400px;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 1.5rem;
            }
            .notification-success {
                border-left: 4px solid #2ecc71;
            }
            .notification-error {
                border-left: 4px solid #e74c3c;
            }
            .notification-info {
                border-left: 4px solid #45b7d1;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #666;
                margin-left: 1rem;
            }
            .notification-message {
                flex: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Initialize stats update interval
setInterval(updateStats, 30000); // Update every 30 seconds

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        if (!scrollBtn) {
            const btn = document.createElement('button');
            btn.id = 'scrollToTop';
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            btn.onclick = scrollToTop;
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            `;
            document.body.appendChild(btn);
        }
    } else {
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});

// Add CSS for responsive navigation
const responsiveStyles = document.createElement('style');
responsiveStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-link {
            font-size: 1.2rem;
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(responsiveStyles);

// Image Grid Toggle Function
function toggleImageGrid() {
    const carousel = document.getElementById('images-carousel');
    const grid = document.getElementById('image-grid');
    const btn = document.querySelector('.btn-view-all');
    
    if (grid.style.display === 'none' || grid.style.display === '') {
        // Show grid, hide carousel
        grid.style.display = 'block';
        carousel.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-film"></i> View Carousel';
        btn.title = 'Switch back to carousel view';
    } else {
        // Show carousel, hide grid
        grid.style.display = 'none';
        carousel.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-th"></i> View All Images';
        btn.title = 'View all images in grid format';
    }
}

console.log('ZOOT Presale Website Initialized Successfully! 🚀'); 
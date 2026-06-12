// Lightbox Gallery for Portfolio
document.addEventListener('DOMContentLoaded', function() {
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption">
                <h3></h3>
                <p></p>
            </div>
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            justify-content: center;
            align-items: center;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        
        .lightbox-caption {
            text-align: center;
            color: white;
            padding: 20px;
        }
        
        .lightbox-caption h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        
        .lightbox-caption p {
            color: #aaa;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: 0.3s;
        }
        
        .lightbox-close:hover {
            color: #ff6b6b;
        }
        
        .lightbox-prev, .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            font-size: 30px;
            padding: 15px 20px;
            cursor: pointer;
            border-radius: 5px;
            transition: 0.3s;
        }
        
        .lightbox-prev:hover, .lightbox-next:hover {
            background: rgba(255,255,255,0.3);
        }
        
        .lightbox-prev {
            left: -80px;
        }
        
        .lightbox-next {
            right: -80px;
        }
        
        @media (max-width: 768px) {
            .lightbox-prev {
                left: 10px;
                padding: 10px 15px;
            }
            
            .lightbox-next {
                right: 10px;
                padding: 10px 15px;
            }
            
            .lightbox-caption h3 {
                font-size: 1.2rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentIndex = 0;
    
    // Add click handlers
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            showLightbox(item);
        });
    });
    
    function showLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('h4')?.textContent || item.querySelector('h3')?.textContent || 'Projet';
        const desc = item.querySelector('p')?.textContent || '';
        
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const lightboxTitle = lightbox.querySelector('.lightbox-caption h3');
        const lightboxDesc = lightbox.querySelector('.lightbox-caption p');
        
        lightboxImg.src = img.src;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Navigation
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        showLightbox(portfolioItems[currentIndex]);
    });
    
    lightbox.querySelector('.lightbox-next').addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        showLightbox(portfolioItems[currentIndex]);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        if (e.key === 'ArrowRight') currentIndex = (currentIndex + 1) % portfolioItems.length;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            showLightbox(portfolioItems[currentIndex]);
        }
    });
});
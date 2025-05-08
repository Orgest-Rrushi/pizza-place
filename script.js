document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    document.documentElement.lang = 'sq'; // Albanian by default
    
    // Language Switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set language
            document.documentElement.lang = lang === 'al' ? 'sq' : 'en';
        });
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category');
            
            // Hide all menu categories
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Show selected category
            document.getElementById(category).classList.add('active');
            
            // Reset carousel position for the selected category
            initCarousel(document.getElementById(category).querySelector('.carousel-track'));
        });
    });
    
    // Carousel Functionality
    const carousels = document.querySelectorAll('.carousel-track');
    const prevBtns = document.querySelectorAll('.carousel-btn.prev');
    const nextBtns = document.querySelectorAll('.carousel-btn.next');
    
    // Initialize all carousels
    carousels.forEach(carousel => {
        initCarousel(carousel);
    });
    
    function initCarousel(carousel) {
        if (!carousel) return;
        
        const items = carousel.querySelectorAll('.menu-item');
        const itemWidth = items[0].offsetWidth + 30; // width + margin
        let position = 0;
        let maxPosition = 0;
        
        // Calculate max position based on visible items
        function calculateMaxPosition() {
            const containerWidth = carousel.parentElement.offsetWidth - 100; // minus padding
            const visibleItems = Math.floor(containerWidth / itemWidth);
            maxPosition = Math.max(0, items.length - visibleItems);
        }
        
        calculateMaxPosition();
        
        // Set initial position
        carousel.style.transform = `translateX(0)`;
        
        // Find the prev/next buttons for this carousel
        const prevBtn = carousel.parentElement.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.parentElement.querySelector('.carousel-btn.next');
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            if (position > 0) {
                position--;
                carousel.style.transform = `translateX(-${position * itemWidth}px)`;
            }
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            if (position < maxPosition) {
                position++;
                carousel.style.transform = `translateX(-${position * itemWidth}px)`;
            }
        });
        
        // Auto rotate carousel
        let autoRotate = setInterval(function() {
            if (position < maxPosition) {
                position++;
            } else {
                position = 0;
            }
            carousel.style.transform = `translateX(-${position * itemWidth}px)`;
        }, 5000);
        
        // Pause auto-rotation on hover
        carousel.parentElement.addEventListener('mouseenter', function() {
            clearInterval(autoRotate);
        });
        
        // Resume auto-rotation on mouse leave
        carousel.parentElement.addEventListener('mouseleave', function() {
            autoRotate = setInterval(function() {
                if (position < maxPosition) {
                    position++;
                } else {
                    position = 0;
                }
                carousel.style.transform = `translateX(-${position * itemWidth}px)`;
            }, 5000);
        });
        
        // Recalculate on window resize
        window.addEventListener('resize', function() {
            calculateMaxPosition();
            // Reset position if needed
            if (position > maxPosition) {
                position = maxPosition;
                carousel.style.transform = `translateX(-${position * itemWidth}px)`;
            }
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show an alert
            const lang = document.documentElement.lang;
            const thankYouMessage = lang === 'sq' 
                ? `Faleminderit për mesazhin, ${name}! Do t'ju kontaktojmë së shpejti.`
                : `Thank you for your message, ${name}! We will get back to you soon.`;
            
            alert(thankYouMessage);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Scroll animations
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        // Add shadow to header on scroll
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});
import { initRadarChart } from './components/radar-chart.js';
import { initWordCloud } from './components/word-cloud.js';
import { initPredictiveTool } from './components/predictive-tool.js';
import { initInteractiveTable } from './components/interactive-table.js';
import { register } from './registerServiceWorker.js';

document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.getElementById('slides-container');
    const slides = Array.from(document.querySelectorAll('.slide'));
    // const prevButton = document.getElementById('prev-slide-chevron');
    // const nextButton = document.getElementById('next-slide-chevron');

    let currentSlide = 0;
    const totalSlides = slides.length;

    const activeComponentCleanups = new Map();

    function updateSlideCounter() {
        // if (slideCounter) {
        //     slideCounter.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
        // }
    }

    function cleanupSlideComponents(slideIndex) {
        const slideData = window.slidesData[slideIndex];
        if (!slideData || !slideData.id) return;

        const cleanup = activeComponentCleanups.get(slideData.id);
        if (cleanup) {
            console.log(`Cleaning up component for slide ${slideData.id}`);
            cleanup();
            activeComponentCleanups.delete(slideData.id);
        }
    }

    function initializeSlideComponents(slideIndex) {
        const slideData = window.slidesData[slideIndex];
        if (!slideData || !slideData.id) {
            console.warn("No slide data found for index:", slideIndex);
            return;
        }

        // If a component for this slide ID is already active, skip re-initialization
        if (activeComponentCleanups.has(slideData.id)) {
            console.log(`Component for slide ${slideData.id} already initialized.`);
            return;
        }

        let cleanupFunction = null;

        switch (slideData.type) {
            case 'radar_chart':
                const radarCanvas = document.getElementById(`radarChart-${slideData.id}`);
                if (radarCanvas) {
                    console.log(`Initializing radar chart for slide ${slideData.id}`);
                    initRadarChart(radarCanvas);
                } else {
                    console.warn("Radar chart canvas not found for slide:", slideData.id);
                }
                break;
            case 'word_cloud':
                const wordCloudCanvas = document.getElementById(`wordCloud-${slideData.id}`);
                if (wordCloudCanvas) {
                    console.log(`Initializing word cloud for slide ${slideData.id}`);
                    cleanupFunction = initWordCloud(wordCloudCanvas);
                    if (cleanupFunction) {
                        activeComponentCleanups.set(slideData.id, cleanupFunction);
                    }
                } else {
                    console.warn("Word cloud canvas not found for slide:", slideData.id);
                }
                break;
            case 'predictive_tool':
                const toolContainer = document.getElementById(`predictiveToolContainer-${slideData.id}`);
                if (toolContainer && window.tf) {
                    console.log(`Initializing predictive tool for slide ${slideData.id}`);
                    cleanupFunction = initPredictiveTool(toolContainer, window.tf);
                    if (cleanupFunction) {
                        activeComponentCleanups.set(slideData.id, cleanupFunction);
                    }
                } else {
                    if (!toolContainer) console.warn("Predictive tool container not found for slide:", slideData.id);
                    if (!window.tf) console.warn("TensorFlow (window.tf) not available for slide:", slideData.id);
                }
                break;
            case 'table':
                const tableElement = document.getElementById(`interactiveTable-${slideData.id}`);
                if (tableElement) {
                    console.log(`Initializing interactive table for slide ${slideData.id}`);
                    cleanupFunction = initInteractiveTable(tableElement);
                    if (cleanupFunction) {
                        activeComponentCleanups.set(slideData.id, cleanupFunction);
                    }
                } else {
                    console.warn("Interactive table element not found for slide:", slideData.id);
                }
                break;
        }
    }

    // function flashChevron(button) {
    //     if (button) {
    //         button.classList.add('chevron-active');
    //         setTimeout(() => {
    //             button.classList.remove('chevron-active');
    //         }, 300); // Flash duration
    //     }
    // }

    const slideLeaveAnimation = (element) => {
        return gsap.to(element, { autoAlpha: 0, duration: 0.3, ease: "power1.in" });
    };

    // Function to initialize title slide specific animations and scaling
    function initTitleSlideAnimsAndScaling(slideElement) {
        const titleContent = slideElement.querySelector('.title-slide-content');
        if (!titleContent) return;

        const logo = titleContent.querySelector('.logo');
        const headline = titleContent.querySelector('.headline');
        const subtitle = titleContent.querySelector('.subtitle');
        const meta = titleContent.querySelector('.meta');

        // Ensure elements exist before proceeding
        if (!logo || !headline || !subtitle || !meta) {
            console.warn("Title slide elements not found for animation/scaling.");
            return;
        }

        // 1. Dynamic Font Scaling (Proportion & Scale)
        // GSAP sets styles, so we need to ensure it happens after initial render and CSS are applied.
        // We might need to trigger this on slideEnter or after a tiny delay if computedStyle is not ready.
        gsap.to(headline, {
            duration: 0, onComplete: () => { // Use a zero-duration tween to ensure it runs after CSS
                const headlineFontSize = parseFloat(window.getComputedStyle(headline).fontSize);
                if (subtitle) {
                    subtitle.style.fontSize = `${headlineFontSize * 0.45}px`; // Subtitle ~45% of headline
                }
                if (meta && subtitle) {
                    const subtitleFontSize = parseFloat(window.getComputedStyle(subtitle).fontSize);
                    meta.style.fontSize = `${subtitleFontSize * 0.65}px`; // Meta ~60-70% of subtitle (using 0.65 for slightly larger)
                }
            }
        });

        // 2. Motion Etiquette (Staggered fade-in)
        // Resetting elements to be invisible before fade-in
        gsap.set([logo, headline, subtitle, meta], { autoAlpha: 0, y: 20 }); // Start slightly lower and invisible

        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power1.out" } });
        tl.to(logo, { autoAlpha: 1, y: 0 }, "+=0.1") // Start after a small delay from slide transition
            .to(headline, { autoAlpha: 1, y: 0 }, "-=0.4") // Stagger start (100ms after logo starts)
            .to(subtitle, { autoAlpha: 1, y: 0 }, "-=0.4") // Stagger start (100ms after headline starts)
            .to(meta, { autoAlpha: 1, y: 0 }, "-=0.4");     // Stagger start (100ms after subtitle starts)
    }

    // function navigateTo(slideIndex) {
    //     if (slideIndex < 0 || slideIndex >= slides.length) return;
    //     if (slideIndex === currentSlide && slides[slideIndex].classList.contains('active')) return;

    //     const prevSlideIndex = currentSlide;
    //     const newActiveSlide = slides[slideIndex];

    //     // Cleanup components on the outgoing slide
    //     cleanupSlideComponents(prevSlideIndex);

    //     // Fade out current slide
    //     gsap.to(slides[prevSlideIndex], {
    //         opacity: 0,
    //         duration: 0.3,
    //         onComplete: () => {
    //             slides[prevSlideIndex].style.display = 'none'; // Hide after fade out

    //             // Update current slide index before showing the new slide
    //             currentSlide = slideIndex;

    //             // Show the target slide
    //             slides[currentSlide].style.display = 'flex'; // Assuming slides use flex for centering content

    //             // Initialize components for the new slide *before* fade-in starts
    //             // This ensures components are ready when slide is visible
    //             initializeSlideComponents(currentSlide);

    //             // Special handling for title slide animations and scaling
    //             if (newActiveSlide.querySelector('.title-slide-content')) {
    //                 initTitleSlideAnimsAndScaling(newActiveSlide);
    //             }

    //             // Fade in target slide
    //             gsap.to(slides[currentSlide], {
    //                 opacity: 1,
    //                 duration: 0.3,
    //                 delay: 0.05 // Slight delay to ensure display:flex is applied
    //             });

    //             // updateSlideCounter(); // REMOVED call
    //         }
    //     });
    // }

    // function nextSlide() {
    //     flashChevron(nextButton);
    //     navigateTo((currentSlide + 1) % totalSlides);
    // }

    // function prevSlide() {
    //     flashChevron(prevButton);
    //     navigateTo((currentSlide - 1 + totalSlides) % totalSlides);
    // }

    // Initial setup
    if (slides.length > 0 && window.slidesData && window.slidesData.length > 0) {
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.style.display = 'flex';
                slide.style.opacity = 1;
                initializeSlideComponents(0); // Initialize components for the first slide
            } else {
                slide.style.display = 'none';
                slide.style.opacity = 0;
            }
        });
        // updateSlideCounter(); // REMOVED call
    } else {
        // if (slideCounter) { // REMOVED
        //     slideCounter.textContent = 'No slides found or data missing'; // REMOVED
        // } // REMOVED
        console.warn("No slides found or window.slidesData is missing. Check your HTML structure and data script.");
    }

    // Event Listeners
    // if (nextButton) nextButton.addEventListener('click', nextSlide);
    // if (prevButton) prevButton.addEventListener('click', prevSlide);

    // window.addEventListener('keydown', (event) => {
    //     if (event.key === 'ArrowRight') {
    //         flashChevron(nextButton);
    //         nextSlide();
    //     }
    //     else if (event.key === 'ArrowLeft') {
    //         flashChevron(prevButton);
    //         prevSlide();
    //     }
    // });

    // Register the service worker
    register();

    // Dark Mode Toggle Logic
    // const darkModeToggleButton = document.getElementById('dark-mode-toggle');
    // const darkIcon = document.getElementById('theme-toggle-dark-icon');
    // const lightIcon = document.getElementById('theme-toggle-light-icon');

    // // Function to update icon visibility based on theme
    // function updateIcons(isDarkMode) {
    //     if (isDarkMode) {
    //         darkIcon.classList.remove('hidden');
    //         lightIcon.classList.add('hidden');
    //     } else {
    //         darkIcon.classList.add('hidden');
    //         lightIcon.classList.remove('hidden');
    //     }
    // }

    // // Function to apply the theme
    // function applyTheme() {
    //     const savedTheme = localStorage.getItem('theme');
    //     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //     let isDarkMode;

    //     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    //         document.body.classList.add('dark-mode');
    //         isDarkMode = true;
    //     } else {
    //         document.body.classList.remove('dark-mode');
    //         isDarkMode = false;
    //     }
    //     updateIcons(isDarkMode);
    // }

    // // Listener for toggle button
    // if (darkModeToggleButton) {
    //     darkModeToggleButton.addEventListener('click', () => {
    //         const isDarkMode = document.body.classList.toggle('dark-mode');
    //         localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    //         updateIcons(isDarkMode);
    //     });
    // }

    // // Apply theme on initial load
    // applyTheme();

    // // Listen for changes in system preference (optional, but good UX)
    // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
});

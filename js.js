window.addEventListener("load", function() {
    
    // 1. Register all necessary plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText); 
    
    // 2. Initialize ScrollSmoother first
    let smooth = ScrollSmoother.create({
        // Use ID strings with the '#' selector
        wrapper: "#smooth-wrapper", 
        content: "#smooth-content",
        smooth: 1.5, // Optional: Add a smooth value here for the scroll effect
        // effects: true // Optional: enables data-speed and data-lag attributes
    });
    
    // 3. Create the SplitText instance
    let split = SplitText.create("#lorem", { type: "words" });

    // 4. Create the ScrollTrigger animation
    gsap.from(split.words, {
        scrollTrigger: {
            // Using the trigger property is highly recommended
            trigger: "#lorem", 
            start: "top 50%", // Starts when the top of #lorem hits 80% down the viewport
            end: "bottom 20%",
            // toggleActions:"restart pu none none", // Removed unnecessary action, scrub handles this
            // pin:true, // Pinning the element, might interfere with smooth scroll on this element
            markers: true,
            scrub: true,
        },
        x: -10,
        duration: 1,
        autoAlpha: 0,
        opacity: 1,
        stagger: 0.05,
        // 🛑 REMOVED smooth: 2 (This was the main error)
    });
});
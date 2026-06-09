gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    let menu = document.querySelectorAll("nav");
    let edu = document.getElementById("EDU");
    let about = document.querySelectorAll(".about");
    let icon = document.querySelectorAll(".icon");
    let project = document.querySelectorAll(".project");
    let contact = document.querySelectorAll(".contact");
    let neon = document.querySelectorAll(".neonLine");

    let time = gsap.timeline();
    
    time.from(menu, {
        y: -100,
        duration: 1,
        opacity: 0,
    });

    gsap.to(".about-header", {
        duration: 4,
        color: "rgba(255, 255, 255, 1)",
        textShadow: "0 0 20px rgba(11, 244, 243, 0.4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    time.to(about, {
        x: -10,
        opacity: 1,
        duration: 1,
        delay: 1,
        stagger: 0.5,
    });

    let animate = gsap.timeline({ repeat: -1 });
    let words = document.querySelectorAll(".about .text-move span");
    words.forEach((word, i) => {
        animate
            .fromTo(word,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
            .to(word, { opacity: 1, duration: 1.5 })
            .to(word, {
                y: -40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.in"
            })
            .add("nextWord", "-=0.4");
    });

    gsap.from(".icon", {
        scrollTrigger: {
            trigger: ".icon",
            start: "top 90%",
        },
        x: 10,
        autoAlpha: 0,
        duration: 1
    });

    gsap.to(".neonLine.horizontal", {
        duration: 2,
        x: 1000,
        repeat: -1,
        repeatDelay: 0.5,
        ease: "power2.in",
        keyframes: {
            opacity: [0, 1, 1, 0, 0],
            scaleX: [1, 2.5, 1],
            filter: ["blur(0px)", "blur(2px)", "blur(7px)"],
            times: [0, 0.1, 0.4, 0.6, 1]
        },
        boxShadow: "-20px 0 10px #0bf4f3, -40px 0 20px #0bf4f3"
    });

    gsap.to(".neonLine.vertical", {
        duration: 1,
        y: 1000,
        repeat: -1,
        repeatDelay: 0.8,
        ease: "power2.in",
        keyframes: {
            opacity: [0, 1, 1, 0, 0],
            scaleY: [1, 2.5, 1],
            filter: ["blur(0px)", "blur(2px)", "blur(15px)"],
            times: [0, 0.1, 0.4, 0.6, 1]
        },
        boxShadow: "0 -20px 10px #0bf4f3, 0 -40px 20px #0bf4f3"
    });

    gsap.from(".edu-test", {
        scrollTrigger: {
            trigger: ".edu-test",
        },
        y: 50,
        duration: 1,
        ease: "power3.out",
    });

    let eduBoxes = document.querySelectorAll('.edu-test');
    eduBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            gsap.to(box, { "--angle": "360deg", duration: 2, repeat: -1, ease: "none" });
        });
    });

    time.from(edu, {
        scrollTrigger: {
            trigger: edu,
            start: "top center",
            scrub: true
        },
        x: 10,
        autoAlpha: 0,
        delay: 1,
    });

    gsap.utils.toArray(".edu-test").forEach(box => {
        gsap.from(box, {
            scrollTrigger: {
                trigger: box,
                toggleActions: "play none none none",
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    time.from(project, {
        x: 10,
        autoAlpha: 0,
        delay: 2,
    });

    window.addEventListener("load", () => {
        let boxesContainer = document.querySelector(".boxes");
        if (boxesContainer) {
            let loopDistance = (boxesContainer.offsetWidth + 80) / 2;
            gsap.to(".boxes", {
                x: `-=${loopDistance}`,
                duration: 20,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % loopDistance)
                }
            });
        }
    });
    let AboutBtn = document.getElementById("About-btn");
    let EducationBtn = document.getElementById("Education-btn");
    let ContactBtn = document.getElementById("Contact-btn");

    function scrollToSection(targetSelector) {
        let offset = 70; 
        let targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            let elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            let offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }

    if (AboutBtn) AboutBtn.addEventListener("click", (e) => { e.preventDefault(); scrollToSection("#about"); });
    if (EducationBtn) EducationBtn.addEventListener("click", (e) => { e.preventDefault(); scrollToSection("#EDU"); });
    if (ContactBtn) ContactBtn.addEventListener("click", (e) => { e.preventDefault(); scrollToSection("#contact-section"); });

    let scriptURL = "https://script.google.com/macros/s/AKfycbxIS53wDq-ZKHEISL8ab63b17GBTGpoRVweu0Z-x1StOl5qr6cq1HOfU9duCzwlEtgd/exec";
    let form = document.forms['submit-to-google-sheet'];
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    let toastLiveExample = document.getElementById('liveToast');
                    let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                    toastBootstrap.show();
                    form.reset();
                });
        });
    }
});

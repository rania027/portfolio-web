/**
 * Rania Marium T - Advanced Portfolio Processing System Core
 * Created under semantic Vanilla ECMA script standards.
 */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    generateFloatingTokens();
    initMobileNavigation();
    initThemeEngine();
    initScrollIntersections();
    initFormValidation();
});

/* ==========================================================================
   APP LIFE-CYCLE ENVIRONMENT INIT
   ========================================================================== */
function initLoader() {
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 600);
    });
}

/* ==========================================================================
   BACKGROUND PROGRAMMING FLOATING GENERATOR
   ========================================================================== */
function generateFloatingTokens() {
    const container = document.getElementById("bg-particles");
    if (!container) return;

    const tokenPool = [
        "#include", "int main()", "{}", "printf()", 
        "malloc()", "free()", "*", "&", ";"
    ];
    
    const maxParticles = 25;

    for (let i = 0; i < maxParticles; i++) {
        const span = document.createElement("span");
        span.classList.add("floating-particle");
        span.textContent = tokenPool[Math.floor(Math.random() * tokenPool.length)];
        
        // Random scatter coordinates assignment
        span.style.left = `${Math.random() * 95}%`;
        span.style.animationDelay = `${Math.random() * 12}s`;
        span.style.animationDuration = `${14 + Math.random() * 20}s`;
        
        container.appendChild(span);
    }
}

/* ==========================================================================
   NAVIGATION ENGINE & RESPONSIVE TOGGLES
   ========================================================================== */
function initMobileNavigation() {
    const toggleBtn = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");
    const links = document.querySelectorAll(".nav-link");

    toggleBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        toggleBtn.classList.toggle("active");
    });

    // Handle seamless links close transitions on viewport navigation action
    links.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            toggleBtn.classList.remove("active");
        });
    });
}

/* ==========================================================================
   THEME SWITCHER PERSISTENCE MATRIX ENGINE
   ========================================================================== */
function initThemeEngine() {
    const themeBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    
    // Scan matching cached configurations
    const currentTheme = localStorage.getItem("portfolio-theme") || "dark";
    htmlElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(themeBtn, currentTheme);

    themeBtn.addEventListener("click", () => {
        let activeTheme = htmlElement.getAttribute("data-theme");
        let targetedTheme = activeTheme === "dark" ? "light" : "dark";
        
        htmlElement.setAttribute("data-theme", targetedTheme);
        localStorage.setItem("portfolio-theme", targetedTheme);
        updateThemeIcon(themeBtn, targetedTheme);
    });
}

function updateThemeIcon(btn, theme) {
    const icon = btn.querySelector("i");
    if (theme === "light") {
        icon.className = "fas fa-sun";
    } else {
        icon.className = "fas fa-moon";
    }
}

/* ==========================================================================
   SCROLL INTERSECTIONS, REVEALS, ACTIVE HIGHLIGHTS & COUNTERS
   ========================================================================== */
function initScrollIntersections() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const backToTop = document.getElementById("back-to-top");
    let countersAnimated = false;

    // Trigger base reveal states instantly for viewport entry blocks
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                
                // Secondary hook check if target container holds active numeric stat targets
                if(entry.target.id === "achievements" && !countersAnimated) {
                    animateAchievementCounters();
                    countersAnimated = true;
                }
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Monitor track adjustments for active links sync mechanics
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 140;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });

        // Floating Action Return button operational threshold monitoring state
        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function animateAchievementCounters() {
    const targets = document.querySelectorAll(".counter-number");
    
    targets.forEach(counter => {
        const limitValue = parseInt(counter.getAttribute("data-target"), 10);
        let startingPosition = 0;
        const durationCycle = 1500; // Total run length allocated in ms
        const tickStep = Math.ceil(limitValue / (durationCycle / 16)); // Target matching refresh bounds

        const counterInterval = setInterval(() => {
            startingPosition += tickStep;
            if (startingPosition >= limitValue) {
                counter.textContent = limitValue + "+";
                clearInterval(counterInterval);
            } else {
                counter.textContent = startingPosition;
            }
        }, 16);
    });
}

/* ==========================================================================
   CODE TRANSFERS AND CLIPBOARD INTERFACES
   ========================================================================== */
function copySnippet(buttonElement) {
    const parentTerminal = buttonElement.closest(".terminal-card");
    const rawText = parentTerminal.querySelector("code").innerText;

    navigator.clipboard.writeText(rawText).then(() => {
        const originalHtml = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.style.background = "#27c93f";
        buttonElement.style.color = "#fff";

        setTimeout(() => {
            buttonElement.innerHTML = originalHtml;
            buttonElement.style.background = "";
            buttonElement.style.color = "";
        }, 1800);
    }).catch(err => {
        console.error("Critical Clipboard Failure Intercepted: ", err);
    });
}

/* ==========================================================================
   FORM VERIFICATION SUBSYSTEMS
   ========================================================================== */
function initFormValidation() {
    const contactForm = document.getElementById("portfolio-contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Perform basic runtime field validations
        const nameVal = document.getElementById("frm-name").value.trim();
        const emailVal = document.getElementById("frm-email").value.trim();
        const msgVal = document.getElementById("frm-msg").value.trim();

        if (nameVal === "" || emailVal === "" || msgVal === "") {
            alert("Error Processing: Ensure all structural form inputs are explicitly filled before execution initialization.");
            return;
        }

        // Simulating a successful asynchronous form injection pipeline sequence
        const submissionBtn = contactForm.querySelector(".form-submit-btn");
        const originalBtnText = submissionBtn.innerHTML;
        
        submissionBtn.disabled = true;
        submissionBtn.innerHTML = 'Sending Core Packet <i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
            alert(`Compilation Complete! Thank you, ${nameVal}. Your message container package was routed securely.`);
            contactForm.reset();
            submissionBtn.disabled = false;
            submissionBtn.innerHTML = originalBtnText;
        }, 1400);
    });
}
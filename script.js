/**
 * NITHIN - PERSONAL PORTFOLIO SCRIPT
 * Vanilla JavaScript (No jQuery / Frameworks)
 */

document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------------------------------------------------
    // 1. Dark / Light Theme Toggle
    // -------------------------------------------------------------------------
    const themeToggle = document.getElementById("theme-toggle");

    function setTheme(isDark) {
        document.body.classList.toggle("dark-mode", isDark);
        if (themeToggle) {
            themeToggle.innerHTML = isDark
                ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
                : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
            themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        }
    }

    if (themeToggle) {
        setTheme(localStorage.getItem("portfolio-theme") === "dark");
        themeToggle.addEventListener("click", function () {
            const isDark = !document.body.classList.contains("dark-mode");
            setTheme(isDark);
            localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
        });
    }

    // -------------------------------------------------------------------------
    // 2. Mobile Navigation Hamburger Menu Toggle
    // -------------------------------------------------------------------------
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobile-nav");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (hamburger && mobileNav) {
        hamburger.addEventListener("click", function () {
            const isOpen = mobileNav.classList.contains("open");
            if (isOpen) {
                mobileNav.classList.remove("open");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            } else {
                mobileNav.classList.add("open");
                hamburger.classList.add("active");
                hamburger.setAttribute("aria-expanded", "true");
            }
        });

        mobileLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                mobileNav.classList.remove("open");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    // -------------------------------------------------------------------------
    // 2. Active Section Navigation Highlighter
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function highlightNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(function (current) {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + sectionId) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", highlightNav);

    // -------------------------------------------------------------------------
    // 3. Contact Form Submission Handling
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            formStatus.textContent = "";

            setTimeout(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                formStatus.style.color = "#166534";
                formStatus.textContent = "Thank you! Your message has been received. Nithin will get back to you shortly.";
                contactForm.reset();

                setTimeout(function () {
                    formStatus.textContent = "";
                }, 5000);
            }, 1000);
        });
    }

    // -------------------------------------------------------------------------
    // 4. Modal Dialog Handler for "More About Me" & Blog Posts
    // -------------------------------------------------------------------------
    const modalOverlay = document.getElementById("modal-overlay");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.getElementById("modal-close");

    const modalData = {
        "about-more": {
            title: "More About Nithin",
            content: `
                <p style="margin-bottom: 14px;">I am a Computer Science Engineering graduate with a strong passion for backend systems, distributed data processing, and clean RESTful API design.</p>
                <p style="margin-bottom: 14px;">During my degree, I focused heavily on core computer science fundamentals—mastering Data Structures, Object-Oriented Programming in Python & Java, Operating Systems concurrency, and Relational Databases (SQL).</p>
                <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin: 20px 0 10px; color: var(--text-color);">Core Engineering Interests:</h4>
                <ul style="padding-left: 20px; color: var(--muted-text); margin-bottom: 20px; line-height: 1.8;">
                    <li><strong>Backend & Microservices:</strong> Building asynchronous APIs with Python, FastAPI, and Flask.</li>
                    <li><strong>Database Systems:</strong> SQL schema design, query optimization, and PostgreSQL indexing.</li>
                    <li><strong>Cloud & Networking:</strong> AWS EC2/S3 infrastructure, HTTP/TCP protocol fundamentals, and Docker containerization.</li>
                    <li><strong>Problem Solving:</strong> Algorithmic logic and clean, modular code architecture.</li>
                </ul>
                <p>I am looking for full-time backend software development or Python engineering roles where I can build reliable software and continue growing.</p>
            `
        },
        "blog-networks": {
            title: "Understanding Computer Networks",
            content: `
                <p style="margin-bottom: 14px; font-size: 0.88rem; color: var(--accent-color); font-weight: 600;">PUBLISHED SEPTEMBER 02, 2026</p>
                <p style="margin-bottom: 14px;">Computer networks form the foundational architecture of modern software applications. Whether you are building web apps or microservices, understanding how packets travel across layers is vital.</p>
                <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin: 18px 0 8px;">Key Concepts Covered:</h4>
                <ol style="padding-left: 20px; color: var(--muted-text); line-height: 1.8; margin-bottom: 16px;">
                    <li><strong>OSI vs. TCP/IP Model:</strong> Physical, Data Link, Network, Transport, and Application layers.</li>
                    <li><strong>TCP vs UDP:</strong> Connection-oriented reliable delivery vs fast datagram streaming.</li>
                    <li><strong>HTTP & WebSockets:</strong> Request-response cycles, headers, status codes, and persistent connections.</li>
                    <li><strong>Socket Programming:</strong> How Python applications interface with network sockets for client-server communication.</li>
                </ol>
            `
        },
        "blog-os": {
            title: "Basics of Operating Systems",
            content: `
                <p style="margin-bottom: 14px; font-size: 0.88rem; color: var(--accent-color); font-weight: 600;">PUBLISHED AUGUST 18, 2026</p>
                <p style="margin-bottom: 14px;">Operating Systems serve as the bridge between software code and physical hardware resources. Writing efficient backend software requires a firm grasp of OS process management.</p>
                <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin: 18px 0 8px;">Key Topics:</h4>
                <ol style="padding-left: 20px; color: var(--muted-text); line-height: 1.8; margin-bottom: 16px;">
                    <li><strong>Processes vs Threads:</strong> Virtual memory space isolation vs shared execution contexts.</li>
                    <li><strong>Concurrency & Deadlocks:</strong> Mutex locks, semaphores, and race condition prevention.</li>
                    <li><strong>Memory Management:</strong> Paging, virtual memory allocation, and garbage collection mechanisms.</li>
                    <li><strong>File Systems:</strong> I/O buffering, file descriptors, and system calls.</li>
                </ol>
            `
        },
        "blog-apis": {
            title: "Introduction to REST APIs",
            content: `
                <p style="margin-bottom: 14px; font-size: 0.88rem; color: var(--accent-color); font-weight: 600;">PUBLISHED JULY 29, 2026</p>
                <p style="margin-bottom: 14px;">Representational State Transfer (REST) is the standard architectural style for web API development. Designing clean REST APIs ensures maintainability and seamless client integration.</p>
                <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin: 18px 0 8px;">REST Best Practices:</h4>
                <ol style="padding-left: 20px; color: var(--muted-text); line-height: 1.8; margin-bottom: 16px;">
                    <li><strong>Nouns over Verbs:</strong> Use <code>/api/v1/tasks</code> instead of <code>/api/v1/getTasks</code>.</li>
                    <li><strong>HTTP Verbs:</strong> GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal.</li>
                    <li><strong>Status Codes:</strong> 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error.</li>
                    <li><strong>FastAPI & OpenAPI:</strong> Generating automated Swagger UI documentation and Pydantic data validation.</li>
                </ol>
            `
        }
    };

    function openModal(key) {
        if (modalData[key] && modalOverlay) {
            modalTitle.textContent = modalData[key].title;
            modalBody.innerHTML = modalData[key].content;
            modalOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    }

    document.addEventListener("click", function (e) {
        const trigger = e.target.closest("[data-modal]");
        if (trigger) {
            e.preventDefault();
            const key = trigger.getAttribute("data-modal");
            openModal(key);
        }

        if (e.target === modalOverlay || e.target.closest("#modal-close")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
            closeModal();
        }
    });
});
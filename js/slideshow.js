(function () {
    function Slideshow(rootId, options) {
        var root = document.getElementById(rootId);
        if (!root) return;

        var slides = root.getElementsByTagName("img");
        if (!slides || slides.length === 0) return;

        var prevBtn = document.getElementById(options.prevId);
        var nextBtn = document.getElementById(options.nextId);
        var dotsHost = document.getElementById(options.dotsId);

        var index = 0;
        var timer = null;
        var intervalMs = options.intervalMs || 3500;

        function hasClass(el, cls) {
            return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
        }
        function addClass(el, cls) {
            if (!hasClass(el, cls)) el.className = (el.className ? el.className + " " : "") + cls;
        }
        function removeClass(el, cls) {
            el.className = (" " + el.className + " ").replace(" " + cls + " ", " ").replace(/^\s+|\s+$/g, "");
        }

        function buildDots() {
            if (!dotsHost) return;
            dotsHost.innerHTML = "";

            for (var i = 0; i < slides.length; i++) {
                var a = document.createElement("a");
                a.href = "#";
                a.className = "dot" + (i === index ? " is-active" : "");
                a.setAttribute("data-index", String(i));
                a.onclick = function (e) {
                    if (e && e.preventDefault) e.preventDefault();
                    var n = parseInt(this.getAttribute("data-index"), 10);
                    goTo(n);
                    restart();
                    return false;
                };
                dotsHost.appendChild(a);
            }
        }

        function updateDots() {
            if (!dotsHost) return;
            var dots = dotsHost.getElementsByTagName("a");
            for (var i = 0; i < dots.length; i++) {
                if (i === index) addClass(dots[i], "is-active");
                else removeClass(dots[i], "is-active");
            }
        }

        function show(n) {
            for (var i = 0; i < slides.length; i++) removeClass(slides[i], "is-active");
            index = (n + slides.length) % slides.length;
            addClass(slides[index], "is-active");
            updateDots();
        }

        function next() { show(index + 1); }
        function prev() { show(index - 1); }

        function start() {
            stop();
            timer = window.setInterval(next, intervalMs);
        }

        function stop() {
            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        function restart() {
            start();
        }

        function goTo(n) {
            if (isNaN(n)) return;
            show(n);
        }

        // Buttons
        if (prevBtn) {
            prevBtn.onclick = function (e) {
                if (e && e.preventDefault) e.preventDefault();
                prev();
                restart();
                return false;
            };
        }
        if (nextBtn) {
            nextBtn.onclick = function (e) {
                if (e && e.preventDefault) e.preventDefault();
                next();
                restart();
                return false;
            };
        }

        // Pause on hover (desktop-friendly)
        root.onmouseover = function () { stop(); };
        root.onmouseout = function () { start(); };

        // Init
        buildDots();
        show(0);
        start();
    }

    // Create your meme slideshow instance here
    Slideshow("memeSlideshow", {
        prevId: "memePrev",
        nextId: "memeNext",
        dotsId: "memeDots",
        intervalMs: 3500
    });
})();
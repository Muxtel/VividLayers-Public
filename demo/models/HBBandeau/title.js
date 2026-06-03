function findShadowRoot(element) {
    if (!element) return null;
    if (element.shadowRoot) return element.shadowRoot;
    for (const child of element.children) {
        const sr = findShadowRoot(child);
        if (sr) return sr;
    }
    return null;
}

function startCarousel(interval = 10000){
    const host = document.querySelector('.vl_model_HBBandeau');
    const shadow = findShadowRoot(host);
    if (!shadow) return;

    const container = shadow.getElementById("HBBandeau-container");
    if (!container) return;

    let index = 0;
    let carouselItems = [];

    function updateItems() {
        carouselItems = Array.from(container.querySelectorAll(".hiria"));
        if (carouselItems.length > 0 && !carouselItems.some(el => el.style.display === "flex")) {
            index = 0;
            showItem(index);
        }
    }

    function showItem(i) {
        carouselItems.forEach(el => el.style.display = "none");
        const el = carouselItems[i];
        if (!el) return;
        el.style.display = "flex";

        const animIn = el.getAttribute("anim-in");
        if (animIn) {
            el.classList.remove(animIn);
            void el.offsetWidth;
            el.classList.add(animIn);
        }
    }

    function nextItem() {
        if (carouselItems.length === 0) return;

        // On arrête si c'est le dernier item
        if (index >= carouselItems.length - 1) {
            return;
        }

        const current = carouselItems[index];
        const animOut = current.getAttribute("anim-out");
        if (animOut) {
            current.classList.remove(animOut);
            void current.offsetWidth;
            current.classList.add(animOut);
        }

        setTimeout(() => {
            current.style.display = "none";
            index += 1;
            showItem(index);
        }, 500); // durée de l'anim-out
    }

    const observer = new MutationObserver(updateItems);
    observer.observe(container, { childList: true, subtree: true });

    // Initialisation
    updateItems();
    setInterval(nextItem, interval);
}

startCarousel();
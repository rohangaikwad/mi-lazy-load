const InitLazyLoader = (targetClass = "lazy-load", loadedClass = "lazy-loaded") => {
    let observer = new MutationObserver(mutations => {
        let elems = Array.from(document.querySelectorAll("img.lazy-load:not(.lazy-loaded)"));
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.classList.contains(targetClass) && !node.classList.contains(loadedClass)) {
                    elems.push(node);
                }
            });
        });
        ObserveImages(elems);
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    const ObserveImages = images => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(({
                target,
                isIntersecting
            }) => {
                if (isIntersecting) {
                    target.src = target.dataset.src;
                    target.classList.add(loadedClass);
                    imageObserver.unobserve(target);
                }
            });
        });
        images.forEach(img => {
            img.classList.remove(targetClass);
            imageObserver.observe(img);
        });
    };
};
const MILazyLoader = {
    init: (targetClass = "lazy-load", loadedClass = "lazy-loaded") => {
        const ObserveImages = images => {
            console.log(images);
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(({
                    target,
                    isIntersecting
                }) => {
                    console.log(isIntersecting, target.src);
                    if (isIntersecting && target.dataset.src && target.src.length !== target.dataset.src) {
                        console.log("MIL LOADING", target);
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
        ObserveImages(Array.from(document.querySelectorAll(`img.${targetClass}:not(.${loadedClass})`)));
        let observer = new MutationObserver(mutations => {
            let elems = [];
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.classList.contains(targetClass) && !node.classList.contains(loadedClass)) {
                        console.log("MIL FOUND", node);
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
    }
};
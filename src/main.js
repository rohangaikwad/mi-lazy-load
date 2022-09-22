const MILazyLoader = {
    init: (targetClass = "lazy-load", loadedClass = "lazy-loaded") => {
        const captureClass = "lazy-capture";
        const ObserveImages = (images) => {
            if(images.length === 0) return;
            console.log(images)
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(({target, isIntersecting}) => {
                    console.log(isIntersecting,target.src)
                    if (isIntersecting && target.dataset.src && target.src.length !== target.dataset.src ) {
                        console.log("MIL LOADING", target)
                        target.src = target.dataset.src;
                        target.classList.add(loadedClass)
                        imageObserver.unobserve(target);
                    }
                });
            });
        
            images.forEach(img => {
                img.classList.remove(targetClass, captureClass);
                imageObserver.observe(img)
            });
        }

        const FilteredElems = (_target) => {
            let __elems = _target.querySelectorAll(`img.${targetClass}:not(.${captureClass}):not(.${loadedClass})`);
            __elems.forEach(elem => elem.classList.add(captureClass));
            return __elems;
        }
        let initialElems = FilteredElems(document);
        ObserveImages(initialElems);

        let observer = new MutationObserver((mutations) => {
            let elems = [];
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {                    
                    if(node.nodeType !== 1) return;
                    let mutatedElems = FilteredElems(node);
                    elems.push(...mutatedElems);
                })
            });
            ObserveImages(elems);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
} 
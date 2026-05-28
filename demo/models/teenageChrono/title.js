(function(shadow) {
    let observer;
    const customFunction = () => {
        ///
        // const debug = shadow.querySelector("#test");

        // if (debug) {
        //     debug.innerHTML += `<div>updateTemplate: ${Date.now()}</div>`;
        // }
    }

    const exec = () => {
        if (observer) observer.disconnect();
    
        customFunction();
    
        if (observer) {
            observer.observe(shadow, { childList: true, subtree: true });
        }
    }
    
    
    exec();

    // Observe mutations pour reconstruire le chart si le contenu change
    observer = new MutationObserver(exec);
    observer.observe(shadow, { childList: true, subtree: true });
})(shadow);
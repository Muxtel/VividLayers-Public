(function(shadow) {
    let observer;

    const customFunction = () => {
        ////
        /// custom code
    }


    const exec = () => {
        if (observer) observer.disconnect();
    
        customFunction();
    
        if (observer) {
            observer.observe(shadow, { childList: true, subtree: true });
        }
    }

    exec();

    //Observe mutations pour reconstruire si le contenu change
    observer = new MutationObserver(exec);
    observer.observe(shadow, { childList: true, subtree: true });
})(shadow);
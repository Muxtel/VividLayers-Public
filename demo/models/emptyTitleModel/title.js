(function(shadow) {
    const observer = new MutationObserver(exec);

    const customFunction = () => {
        ////
        /// custom code
    }


    function exec() {
        observer.disconnect();
        customFunction();
        observer.observe(shadow, { childList: true, subtree: true });
    }

    observer.observe(shadow, { childList: true, subtree: true });

    exec(); // exécution initiale
})(shadow);
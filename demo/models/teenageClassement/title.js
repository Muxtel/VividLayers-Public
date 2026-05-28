(function(shadow) {
    const observer = new MutationObserver(exec);

    const customFunction = () => {
        ////
        /// custom code
    }

    function exec() {
        customFunction();
    }

    observer.observe(shadow, { childList: true, subtree: true });

    exec(); // exécution initiale
})(shadow);
!(function() {
    const subscribeElement = document.querySelector(".subscribe-mouse-move");
    const unsubscribeElement = document.querySelector(".unsubscribe-mouse-move");
    const x = document.querySelector(".x");
    const y = document.querySelector(".y");
    let unsubscribe;

    subscribe(subscribeElement, "click", function() {
        unsubscribe = subscribe(document, "mousemove", function(e) {
            x.value = e.pageX;
            y.value = e.pageY;
        });
        unsubscribeElement.style.display = "";
        subscribeElement.style.display = "none";
    });

    subscribe(unsubscribeElement, "click", function() {
        unsubscribe();
        subscribeElement.style.display = "";
        unsubscribeElement.style.display = "none";
    });
})();

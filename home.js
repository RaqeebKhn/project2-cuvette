document.getElementById("rules-btn").addEventListener("click", function () {
    document.getElementById("rules-popup").classList.remove("hidden");
});

document.getElementById("close-btn").addEventListener("click", function () {
    document.getElementById("rules-popup").classList.add("hidden");
});

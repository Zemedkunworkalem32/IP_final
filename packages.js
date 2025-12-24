function selectPkg(element, pkgName) {
    // 1. CHECK IF USER IS LOGGED IN
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        // 2. SHOW POP-UP IF NOT SIGNED UP
        alert("First you have to register!");
        return; // Stop the function here
    }

    // 3. PROCEED IF LOGGED IN
    const priceText = element.querySelector(".pkg-price").innerText;
    // Extract only the numbers (e.g., "$350/person" becomes "350")
    const priceValue = priceText.replace(/[^0-9]/g, "");

    // Save selection to browser memory
    localStorage.setItem("selectedPackage", pkgName);
    localStorage.setItem("selectedPrice", priceValue);

    // UI feedback (Toast)
    const toast = document.getElementById("toast");
    if (toast) {
        toast.innerText = pkgName + " Package Selected";
        toast.style.display = "block";
    }

    // Redirect to payment page
    setTimeout(() => {
        window.location.href = "Payment.html"; // Ensure this matches your payment file name
    }, 800);
}

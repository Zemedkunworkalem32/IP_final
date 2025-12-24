const counters = document.querySelectorAll('.stat-number');

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = Math.ceil(target / 100);

        if (current < target) {
            counter.innerText = current + increment;
            setTimeout(updateCount, 30);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thank you for contacting EthioTrip! We will reach out soon.");
    this.reset();
});
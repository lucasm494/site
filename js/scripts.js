document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready');

    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });

    // Scroll to the top of the page when it loads
    window.onload = function() {
        window.scrollTo(0, 0);
    };
});

function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

function toggleTerms(event) {
    event.preventDefault();
    const terms = document.getElementById('terms');
    if (terms.style.display === 'none' || terms.style.display === '') {
        terms.style.display = 'block';
        event.target.textContent = 'Hide';
    } else {
        terms.style.display = 'none';
        event.target.textContent = 'Terms';
    }
}
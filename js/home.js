document.addEventListener('DOMContentLoaded', function() {
    const spans = document.querySelectorAll('.background-text span');

    spans.forEach(span => {
        span.addEventListener('mouseover', () => {
            span.style.color = 'white';
            span.style.opacity = '1';
        });

        span.addEventListener('mouseout', () => {
            span.style.color = 'grey';
            span.style.opacity = '1';
        });
    });
});
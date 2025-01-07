document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        console.log('Email submitted:', email);
        alert('Thank you for signing up!');
        signupForm.reset();
    });
});

function showTerms(){
    const terms = document.getElementById('terms');
    if(terms.style.display === 'none'){
        terms.style.display = 'block';
    } else {
        terms.style.display = 'none';
    }
}
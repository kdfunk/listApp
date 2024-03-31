// Secure versions vulnerabilities


// Setting cookies 
document.cookie = "run@cool.com";
document.cookie = "password=password";

// Checking if the document is fully loaded before executing
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Main function to handle the logic once the document is ready
function ready() {
    // Getting the 'query' parameter from the URL
    var query = new URL(window.location).searchParams.get('listAdd');

    // Setting user input directly into an input field
    document.getElementById('listAdd-input').value = query;

    // Using innerHTML with user input
    document.getElementById('listAdd-output').textContent = query;
}

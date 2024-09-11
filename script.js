document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;

    if(name && review) {
        // Send the review to the backend
        fetch('/submit-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, review: review })
        })
        .then(response => response.json())
        .then(data => {
            // Update the review list
            const reviewList = document.getElementById('reviewList');
            reviewList.innerHTML += `
                <div class="review">
                    <strong>${data.name}</strong>
                    <p>${data.review}</p>
                </div>
            `;
            // Clear the form
            document.getElementById('name').value = '';
            document.getElementById('review').value = '';
        })
        .catch(error => console.error('Error:', error));
    }
});

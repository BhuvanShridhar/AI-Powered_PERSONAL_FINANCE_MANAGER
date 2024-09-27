// frontend/script.js
document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    try {
        const response = await fetch('http://localhost:5000/api/expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, category })
        });

        const data = await response.json();
        document.getElementById('message').innerText = data.message;

        // Clear input fields
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
    } catch (error) {
        document.getElementById('message').innerText = 'Error adding expense';
    }
});

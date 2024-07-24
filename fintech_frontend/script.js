

document.getElementById('transactionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    try {
        const response = await fetch('http://localhost:3000/transaction', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userId, amount, type })
        });

        const result = await response.json();
        document.getElementById('result').textContent = result.message || result.error;
    } catch (error) {
        document.getElementById('result').textContent = 'Error processing transaction';
    }
});
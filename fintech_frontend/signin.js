document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    
    try {
        const response = await fetch('http://localhost:3000/check-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        });
        
        const result = await response.json();
        
        if (response.ok) {
            messageDiv.innerHTML = `<p style="color: green;">${result.message}</p>`;
            window.location.href = 'dashboard.html';  // Redirect to dashboard
        } else {
            messageDiv.innerHTML = `<p style="color: red;">${result.message}</p>`;
        }
    } catch (error) {
        messageDiv.innerHTML = `<p style="color: red;">Internal server error. Please try again later.</p>`;
        console.error('Error:', error);
    }
});
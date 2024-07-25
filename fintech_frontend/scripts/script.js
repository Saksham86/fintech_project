const userID=document.getElementById('userid');
const userId = localStorage.getItem("id");
    const userName=localStorage.getItem("name");
    userID.innerHTML=`<p> ${userId}:- ${userName} </p>`;
document.getElementById('transactionForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    
    
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    const resultDiv = document.getElementById('result');
   
   
    
    try {
        const response = await fetch('http://localhost:3000/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                amount: amount,
                type: type,
            }),
        });
        
        const result = await response.json();
        
        if (response.ok) {
            resultDiv.innerHTML = `<p style="color: green;">Transaction successful: ${result.message}</p>`;
            setTimeout(()=>{
                resultDiv.innerHTML = `<div></div>`

            },5000)
            alert("Transaction Success")
        } else {
            resultDiv.innerHTML = `<p style="color: red;">Transaction failed: ${result.message}</p>`;
            alert("Transaction Failed");
            setTimeout(()=>{
                resultDiv.innerHTML = `<div></div>`

            },5000)
            
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Internal server error. Please try again later.</p>`;
        console.error('Error:', error);
    }
});

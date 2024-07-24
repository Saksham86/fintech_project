const axios = require('axios');


document.getElementById('transactionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    try {
        
        const response= await axios.post('http://localhost:3000/transaction',{

            body: { userId:2, amount:100, type:"deposit" },
            
            headers: {
                'Content-Type': 'application/json'
              }          

          });
          console.log(response);
          

        
        document.getElementById('result').textContent = response.data || response.error;
    } catch (error) {
        document.getElementById('result').textContent = 'Error processing transaction';
    }
});
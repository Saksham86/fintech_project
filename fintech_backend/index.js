    // index.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());



app.post('/transaction', async (req, res) => {
    const { userId, amount, type } = req.body;
    console.log("hit");

    try {
        // Fetch user balance
        const userResponse = await axios.post("https://romantic-starfish-35.hasura.app/v1/graphql", {
            query: `
                query ($id: Int!) {
                    users_by_pk(id: $id) {
                        balance
                    }
                }
            `,
            variables: { id: userId }
        }, {
            headers: { 'x-hasura-admin-secret': "RjO69h57sWs1vyn1nThWowtr69JuN4SkBobZVB7giXZsxoESiNC48EEeLTSSBPtn" }
        });

        const user = userResponse.data.data.users_by_pk;
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let newBalance = user.balance;
        if (type === 'deposit') {
            newBalance += amount;
        } else if (type === 'withdrawal') {
            if (user.balance < amount) {
                return res.status(400).json({ error: 'Insufficient funds' });
            }
            newBalance -= amount;
        } else {
            return res.status(400).json({ error: 'Invalid transaction type' });
        }

        // Update user balance and create transaction
        await axios.post("https://romantic-starfish-35.hasura.app/v1/graphql", {
            query: `
                mutation ($id: Int!, $newBalance: numeric!, $amount: numeric!, $type: String!) {
                    update_users_by_pk(pk_columns: {id: $id}, _set: {balance: $newBalance}) {
                        id
                    }
                    insert_transactions(objects: {user_id: $id, amount: $amount, type: $type}) {
                        returning {
                            id
                        }
                    }
                }
            `,
            variables: { id: userId, newBalance, amount, type }
        }, {
            headers: { 'x-hasura-admin-secret': "RjO69h57sWs1vyn1nThWowtr69JuN4SkBobZVB7giXZsxoESiNC48EEeLTSSBPtn" }
        });

        res.json({ message: 'Transaction successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

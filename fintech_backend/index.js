
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const cors=require('cors');
const app = express();






app.use(cors());
app.use(express.json());

const HASURA_URL="https://romantic-starfish-35.hasura.app/v1/graphql";
const HASURA_SECRET="RjO69h57sWs1vyn1nThWowtr69JuN4SkBobZVB7giXZsxoESiNC48EEeLTSSBPtn";



app.post('/transaction', async (req, res) => {
    const {userId,amount,type} =  req.body;

    
    

    try {
       
        const userResponse = await axios.post(HASURA_URL, {
            query: `
                query ($id: Int!) {
                    users_by_pk(id: $id) {
                        balance
                        name
                    }
                }
            `,
            variables: { id: userId }
        }, {
            headers: { 'x-hasura-admin-secret': HASURA_SECRET }
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

        

        await axios.post(HASURA_URL, {
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
            headers: { 'x-hasura-admin-secret': HASURA_SECRET }
        });

        

        
        res.status(200).json({
            message:"success"
        })
        

        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


//user check
app.post('/check-user', async (req, res) => {
    const { username, password } = req.body;

    const query = `
        query ($username: String!, $password: String!) {
            users(where: {username: {_eq: $username}, password: {_eq: $password}}) {
                id
            }
        }
    `;

    const variables = {
        username,
        password,
    };
    

    try {
        const response = await axios.post(
            HASURA_URL,
            {
                query,
                variables,
            },
            {
                headers: {
                    'x-hasura-admin-secret': HASURA_SECRET,
                },
            }
        );

       
        

        if (response.data.data.users.length > 0) {
            res.status(200).json({ success: true, message: 'User authenticated successfully' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

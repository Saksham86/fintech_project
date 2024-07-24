
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const bodyParser=require("body-parser");


const app = express();
app.use(express.json());
const HASURA_URL="https://romantic-starfish-35.hasura.app/v1/graphql"
const HASURA_SECRET="RjO69h57sWs1vyn1nThWowtr69JuN4SkBobZVB7giXZsxoESiNC48EEeLTSSBPtn"



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

        console.log(userResponse.data);
        res.status(200).json({
            message:"lite"
        })

        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const PORT = 8000;
const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors()); //blocking of requests


app.get('/languages', async(req, res) => {
    const options ={
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST 
        }
    }

    try {
        const response = await axios('https://google-translate20.p.rapidapi.com/languages',options);
        const Languages=Object.keys(response.data.data).map(key=>response.data.data[key]);
        res.status(200).json(Languages);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Error'})
    }
})

app.get('/translation', async(req, res) => {
    const { TextToTranslate, OutputLanguage, InputLanguage} = req.query;
    const options ={
        method: 'GET',
        params: {
        text: TextToTranslate,
        tl: OutputLanguage,
        sl: InputLanguage
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST 
        }
    }

    try {
        const response = await axios('https://google-translate20.p.rapidapi.com/translate',options);
        res.status(200).json(response.data.data.translation);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Error'})
    }
})

app.listen(PORT, () => {
    console.log("Server is running at PORT " + PORT );
})

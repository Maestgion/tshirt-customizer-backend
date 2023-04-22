import express from "express"
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai"

dotenv.config()

const router = express.Router()

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
  

const openAi = new OpenAIApi(config)

router.route("/").get((req, res)=>{
    res.status(200).json({message : "Hello"})
})


router.route('/').post(async (req, res)=>{
    try{

        const {prompt} = req.body

        const response= await  openAi.createImage({
            prompt,
            n: 1,
            size: '1024X1024',
            response_format: 'b64_json'
        })

        const img = response.data.data[0].b64_json

        res.status(200).json({photo: img})

    }catch(e){
        console.error(e)
        res.status(500).json({message: "Sorry, something went wrong!"})
    }
})


export default router;
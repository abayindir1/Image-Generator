const {Configuration, OpenAIApi} = require("openai")

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const generateImage = async(req, res) =>{
    const{userPrompt, size}=req.body;
    var imageSize

    if (size == 'small') {
        imageSize == "256x256"
    } else if(size == 'medium'){
        imageSize == '512x512'
    }else{
        imageSize == "1024x1024"
    }

    try {
        const response = await openai.createImage({
            prompt: userPrompt,
            n: 1,
            size: imageSize
        });
        const imageURL = response.data.data[0].url

        res.status(200).json({
            success:true,
            data:imageURL
        });

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }

        res.status(200).json({
            success:false,
            error:"The image cannot be generated"
        });
    }
}

module.exports = {generateImage};
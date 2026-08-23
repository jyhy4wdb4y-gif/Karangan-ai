export default function handler(req,res){res.status(200).json({ok:true,ai_ready:Boolean(process.env.OPENAI_API_KEY),model:process.env.OPENAI_MODEL||"gpt-5.6"})}

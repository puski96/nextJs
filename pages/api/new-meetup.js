import { MongoClient } from "mongodb";

async function handler(req,res){
    if(req.method==="POST"){
        const data=req.body;


        const client= await MongoClient.connect('mongodb+srv://Gabi:gabi1234@cluster0.8vrox.mongodb.net/meetup?retryWrites=true&w=majority');
        const db=client.db();

        const meetupsCollection=db.collection('meetups');
        const result=await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({message:"meetup added"});
    }
}
export default handler;
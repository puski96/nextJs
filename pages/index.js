import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";



function HomePage(props){
    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta 
                name="description"
                content="Browse meetup datas"
            ></meta>
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>
}
export async function getStaticProps(){

    const client= await MongoClient.connect('mongodb+srv://Gabi:gabi1234@cluster0.8vrox.mongodb.net/meetup?retryWrites=true&w=majority')
    const db= client.db();
    const meetupsCollection=db.collection('meetups');
    const meetups=await meetupsCollection.find().toArray();
    client.close()

    return {
        props:{
            meetups:meetups.map(meetup=>({
                title:meetup.title,
                address:meetup.address,
                description:meetup.description,
                image:meetup.image,
                id:meetup._id.toString()
            }))

        },
        revalidate: 10
    };

}

// export async function getServerSideProps(context){
//     const req =context.req;
//     const res=context.res;
//     return {
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     }
// }
export default HomePage;
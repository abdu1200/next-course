import { Resend } from 'resend'; //Resend is a class
import WelcomeTemplate from '@/emails/WelcomeTemplate';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY); //we are creating an instance of Resend(object) and we pass the api key

export async function POST() {
    await resend.emails.send({   //we pass it a payload object
        from: '...', //this from email has to be from a domain you own(like abdulkerim.com's email), we can not use free service like gmail, yahoo,.....we can configure the domain in the resend website
        to: 'abdukmom03@gmail.com',
        subject: '...',
        react: <WelcomeTemplate name="kma" />  //the react component that represents our template
    }) 

    return NextResponse.json({})
}



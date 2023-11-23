import React, { CSSProperties } from 'react'
import { Html, Body, Container, Tailwind, Text, Link, Preview} from '@react-email/components'
//the above are all components
//Html - the html element in an html email
//Container - for centralizing our content
//to add a preview text to our email(the first line people see in their email client)

//in the props, we are defining the props object inline but we can define it as a separate interface
const WelcomeTemplate = ({ name }: { name: string}) => { //we are grabbing the name property from the props object
  return (
    <html>
        <Preview>Welcome aboard!</Preview>
        <Tailwind>
            <Body style={{ background: '#fff'}}>  {/*inline styling*/}
                <Container style={body}>
                <Text className='font-bold text-3xl'>Hello {name}</Text>  {/*tailwind styling*/}
                <Link href="https://abdulkerim.com">www.abdulkerim.com</Link>
                </Container>
            </Body>
        </Tailwind>
    </html>
    )
}


//we can also pass props to our WelcomeTemplate component to render content dynamically


//for styling, it is better to create a style object outside of the component
const body: CSSProperties = {   //we anotate the object to get the autocompletion of css properties
    background: '#fff'
}

const heading: CSSProperties = {
    fontSize: '32px'
}


export default WelcomeTemplate
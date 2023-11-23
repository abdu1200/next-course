'use client';
import React from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary' //CldUploadWidget(upload widget component) is a component
import { useState } from 'react';


interface CloudinaryResult {
    public_id: string;
}

const UploadPage = () => {

  const [publicId, setPublicId] = useState('');  //state variable to store the public_id that is to be passed to the image component to be viewed
  
  return (
    <>
    
    {/* to render the uploaded image */}
    {publicId &&
    <CldImage src={publicId} width={270} height={180} alt='a cat'/> }
    
    <CldUploadWidget 
      uploadPreset='df0bdmz8' //the file is uploaded in the product env't and in this preset
      
      options={{     //options is set to an object
        sources: [ "local"],
        multiple: false,   //if we don't want to allow multiple files to be uploaded at once
        maxFiles: 5,
      }}

      onUpload={(result, widget) => {
        //console.log(result);
        if (result.event !== 'success') return;
        const info = result.info as CloudinaryResult  //here we used 'type assersion' to tell the typescript compiler about the type of this property(info)
        setPublicId(info.public_id)
      }} > 
        {({ open}) => 
        <button 
        className='btn btn-primary'
        onClick={() => open()}>Upload</button>} 
    </CldUploadWidget>
    {/* for the uploadPreset prop, to get the preset, settings - upload -add preset-...
    this component expects function as its children and next-cloudinary passes an object to this children function and we destructure it
    open is a func
    when we click the button, we get the upload dialog box
    the above upload widget component has onUpload event that gets triggered everytime a file is uploaded
     */}
    </> 
  )
}

export default UploadPage
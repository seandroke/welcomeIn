import { Button, Header, Image } from 'semantic-ui-react'
import React, { useState } from "react";
import Link from 'next/link'
import axios from "axios"

export default images;

function images(props) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [uploaded, setUploaded] = useState("");


    const handleSubmit = (evt) => {
        evt.preventDefault();
        var formData = new FormData();
        formData.append("FileField", image);
        formData.append("Name", name);
        console.log(image);
        axios.post("http://10.0.0.142:8007/friendlyfaces/", formData).then((responsePost) => axios.get("http://10.0.0.142:8007/friendlyfaces/").then((responseGet) => setUploaded(responseGet.data[0].Image)));
    }
    
    const onChangeImage = e =>{
        setImage(e.target.files[0]);
    }

    const onChangeName = e =>{
        setName(e.target.value)
    }

    return (

      <div class=" ui clearing segment">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <h1 class="ui header">WelcomeIN</h1>
        <div class="ui inverted menu">
        <Link href="/index">
          <a class="item">
            Home
          </a>
          </Link>
          <Link href="/users">
            <a className="item">
              Authorized Individuals
          </a>
          </Link>
          <Link href="/footage">
            <a className="item">
              Footage</a>
          </Link>
          <Link href="/settings">
            <a className="item">
              Settings
          </a>
          </Link>
        </div>
        
        <h2 align="center">Upload A Photo of an Authorized Individual</h2>

            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            <form className="ui form segment" onSubmit={handleSubmit}>
                <label><h3>Your Face:</h3></label>
                <input type="file" onChange={onChangeImage} />
                <p></p>
                <label><h3>Your Name:</h3></label>
                <input type="text" value={name} onChange={onChangeName} />
                <p></p>
                <input type="submit" value="Submit" />
                <img src={uploaded} />
            </form>
        </div>



    );
}
;


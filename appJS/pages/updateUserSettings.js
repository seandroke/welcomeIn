import Link from 'next/link'
import React, { useState } from "react";
import { Grid, Image, Divider, Button, Header, Modal, Input, Form, Label, CommentActions } from 'semantic-ui-react'
import axios from "axios"

function updateUserSettings(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sms, setSMS] = useState("");
  const [address, setAddress] = useState("");
  const admin = "admin";
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      var formData = new FormData();
      formData.append("user", admin);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("smsnumber", sms);
      formData.append("houseaddress", address);
      axios.post("http://10.0.0.142:8007/userpersonalsettings/", formData);

  }

    const onChangeName = e =>{
        setName(e.target.value)
        }

    const onChangeEmail = e =>{
        setEmail(e.target.value)
        }

     const onChangeSMS = e =>{
        setSMS(e.target.value)
        }
        
    const onChangeAddress = e =>{
        setAddress(e.target.value)
        }

  return (
    <div style={{ paddingLeft: '8px' }}>
      <div class=" ui clearing segment">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <h1 class="ui header">WelcomeIN</h1>
        <div class="ui inverted menu">
        <Link href="/index">
            <a className="item">
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
            <a className="active item">
               Settings
          </a>
          </Link>

        </div>
        <div style={{ paddingTop: '16px' }} class="ui center aligned grid">
          <h2 class="ui icon header">
            <i class="settings icon"></i>
            <div class="content">
              Update User Preferences
    <div class="sub header">Change your account settings and e-mail preferences.</div>
            </div>
          </h2>
        </div>
        <div class="ui divider"></div>
        <form className="ui form segment" onSubmit={handleSubmit}>
                <label><h3>Name:</h3></label>
                <input type="text" onChange={onChangeName} />
                <p></p>
                <label><h3>E-Mail:</h3></label>
                <input type="text" onChange={onChangeEmail}  />
                <p></p>
                <label><h3>SMS:</h3></label>
                <input type="text" onChange={onChangeSMS}  />
                <p></p>
                <label><h3>Property Address:</h3></label>
                <input type="text" onChange={onChangeAddress}  />
                <input type="submit"></input>
            </form>
        <div style={{ paddingLeft: '8px', paddingTop: '8px' }}>

       

        <Link href="/settings"><button style={{ marginLeft: '90%' }} class="positive ui button">Return</button></Link>

        
        </div>
      </div>
    </div> //ending page
  )


} export default updateUserSettings

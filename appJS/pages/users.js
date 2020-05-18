import Link from 'next/link'
import { Grid, Image, Divider, Button, Header, Modal, Input, Form, GridColumn } from 'semantic-ui-react'
import React, { useState, useEffect } from "react";
import axios from "axios"


function Users() {

    
    const [list, setArray] = useState([]);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    useEffect(() => {
        axios.get("http://10.0.0.142:8007/friendlyfaces/").then((responseGet) => setArray(responseGet.data));
    }, []);
    
    CancelToken: source.token;

    const removeImage = (name) => {
        var formData = new FormData();
        formData.append("Name", name);
        axios.delete("http://10.0.0.142:8007/friendlyfaces/", formData)
    } 


    return (
        <div class=" ui clearing segment">
        <div style={{ paddingLeft: '8px' }}>
            <div>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

                <h1 class="ui header">WelcomeIN</h1>
                <div class="ui inverted menu">
                    <Link href="/index">
                        <a className="item">
                            Home
            </a>
                    </Link>
                    <a class="active item">
                        Authorized Individuals
      </a>
                    <Link href="/footage">
                        <a className="item">
                            Footage
            </a>
                    </Link>
                    <Link href="/settings">
                        <a className="item">
                            Settings
            </a>
                    </Link>

                </div>
            </div>

            <div>
                <Modal trigger={
                    <Link href="/manageIndividuals"><button style={{ marginTop: '16px' }} class="medium ui button">
                        Manage Authorized Individuals
            </button>
                    </Link>
                }>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src='http://10.0.0.142/facial-recognition-application/sean.droke/FacialRecognitionRepo/backend/media/FriendlyFaces/dani_cXVUGbP.PNG' />
                        <Modal.Description>
                            <Header>Upload a photo of authorized individual</Header>
                            <p>
                                <form className="ui form">
                                    <div className="field">
                                        <label></label>
                                        <input name="image" type="text" placeholder="image...">
                                        </input>
                                        <Divider horizontal></Divider>
                                        <button class="small ui button">
                                            Upload Image
                        </button>

                                    </div>
                                </form>
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
                <Divider horizontal></Divider>
                <div class="ui fitted divider"></div>
                <Divider horizontal></Divider>
            </div>

            <div>
                <Grid>
                    <Grid.Row columns={4}>
                        
                        {list.map(ele => (
                            <Grid.Column>
                                <Image
                                    fluid
                                    label={{
                                        as: 'a',
                                        color: 'black',
                                        content: ele.Name,
                                        ribbon: true,
                                    }}
                                    src={ele.Image} size='small' />
                            </Grid.Column>

                        ))}
                    </Grid.Row>
                </Grid>


                </div>
            </div>
        </div>)


}


export default Users
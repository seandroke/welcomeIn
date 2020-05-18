import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { Button, Table } from 'semantic-ui-react'
import axios from "axios"

export default video;

function video(props) {

  const [list, setArray] = useState([]);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  var str = ""

  useEffect(() => {
      axios.get("http://10.0.0.142:8007/footage/").then((responseGet) => setArray(responseGet.data));
  }, []);
  
  console.log(list);
  
  var contents = [];

  list.map(e => {
    var a = new Date(e.date);
    var month=a.getUTCMonth() + 1
    var day=a.getDate()
    var year=a.getFullYear()
    var finalDate = month+ "/" + day + "/" + year

    var hours = a.getUTCHours() -4;
    var ampm = hours >= 12 ? 'PM EST' : 'AM EST';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minutes = a.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;

    var finalTime = hours + ":" + minutes + " " + ampm;

    var videoURL = e.url;
  
    contents.push({
      date: finalDate,
      time: finalTime,
      url:videoURL
    })
  })


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
        
        <h2 align="center">Video Activity Logs</h2>
        <div>
        
        <table class="ui selectable celled table">
        <thead>
          <tr>
            <th class="">Door ID</th>
            <th class="">Date</th>
            <th class="">Time</th>
            <th class="">Footage</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(e => (
            <tr>
            <td>Door 1</td>
            <td>{e.date}</td>
            <td>{e.time}</td>
            <td class = "center aligned">
              <Button class="ui grey button" href={e.url} >
                <video width="100" height="100" controls><source src ={e.url} type="video/mp4"></source></video>
              </Button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>

    );
};

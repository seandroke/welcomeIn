import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { Button, Table } from 'semantic-ui-react'
import axios from "axios"


export default photos

function photos(props) {

  const [list, setArray] = useState([]);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  var str = ""

  useEffect(() => {
      axios.get("http://10.0.0.142:8007/userlogging/").then((responseGet) => setArray(responseGet.data));
  }, []);
  
  var contents = [];

  list.map(e => {
    var a = new Date(e.EventTime);
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

    var videoURL = e.URL;

    var accessType = e.AccessType;
  
    contents.push({
      date: finalDate,
      time: finalTime,
      url:videoURL,
      access:accessType
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
        
        <h2 align="center">Activity Log</h2>
        <div>
        
        <table class="ui selectable celled table">
        <thead>
          <tr>
            <th class="">Date</th>
            <th class="">Time</th>
            <th class="">Footage</th>
            <th class="">Access Type</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(e => (
            <tr>
            <td>{e.date}</td>
            <td>{e.time}</td>
            <td class = "center aligned">
              <img width="300" height="200" src={e.url}></img>
            </td>
          <td>{e.access}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>

    );
};

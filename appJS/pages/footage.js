import Link from 'next/link'
import React from 'react'

function Footage() {

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
          Authroized Individuals
            </a>
      </Link>
      <Link href="/footage" >
      <a className="active item">
        Footage
      </a>
      </Link>
     <Link href="/settings">
     <a class="item">
        Settings
      </a>
     </Link>
      
    </div>
    <div style={{ paddingTop: '16px' }} class="ui center aligned grid">
          <h2 class="ui icon header">
            <Link href="/photos"><i class="camera icon"></i></Link>
            <div class="content">
              Photos
    <div class="sub header">View a Log of Photos for every Entry to your Home.</div>
            </div>
          </h2>
        </div>

        <div class="ui divider"></div>
        <div style={{ paddingTop: '16px' }} class="ui center aligned grid">
          <h2 class="ui icon header">
            <Link href="/video"><i class="film icon"></i></Link>
            <div class="content">
              Videos
    <div class="sub header">View a dashboard of all recordings detected by the System.</div>
            </div>
          </h2>
        </div>

        <div class="ui divider"></div>

   
    <div>

    </div>
  </div>
  </div>
  )
}

export default Footage
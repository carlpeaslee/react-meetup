import React, { Component } from 'react'
import Auth0 from 'auth0-lock'
import {auth0Domain, auth0ClientId, url} from 'config'

class App extends Component {

  state = {
    email: false
  }

  constructor() {
    super()
    this.auth = new Auth0(
      auth0ClientId,
      auth0Domain,
      {
        auth: {
          redirectUrl: url,
          responseType: 'token',
          params: {
            scope: 'openid email'
          }
        }
      }
    )
    this.auth.on('authenticated', (authResponse) => {
      this.setState(
        (prevState, props) => {
          let {email} = authResponse.idTokenPayload
          return {
            email
          }
        },
        () => {
          //a callback
        }
      )
    })
  }

  render() {
    return (
      <div>
        {(this.state.email) ?
          <h3>
            Hello {this.state.email}
          </h3> :
          <button
            onClick={()=>{
              this.auth.show()
            }}
          >
            Login!
          </button>
        }

      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import Auth0 from 'auth0-lock'
import {auth0Domain, auth0ClientId, url} from 'config'
import {getAllComments, createComment} from 'graphql'
import {Col, Login, Submit, CommentInput, Comment, Text, Author } from 'styled'

class App extends Component {

  state = {
    email: false,
    text: '',
    comments: []
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

    this.polling = setInterval(
      this.retrieveComments,
      2000
    )

  }

  retrieveComments = async () => {
    try {
      let comments = await getAllComments()
      this.setState({comments})
    } catch (error) {

    }
  }

  submitComment = async () => {
    let {author, text} = this.state
    try {
      await createComment(author, text)
    } catch (error) {

    }
  }

  handleChange = (e) => {
    e.persist()
    this.setState((prevState, props) => {
      return {
        text: e.target.value
      }
    })
  }

  render() {
    return (
      <Col>
        {(!this.state.email) ?
          <Login
            onClick={()=>{
              this.auth.show()
            }}
          >
            Login
          </Login> :
          <div>
            <CommentInput
              value={this.state.text}
              onChange={this.handleChange}
            />
            <Submit
              onClick={this.submitComment}
            >
              Submit Comment
            </Submit>
          </div>
        }
        {this.state.comments.map(comment => {
          return (
            <Comment
              key={comment.id}
              author={comment.author}
            >
              <Text>
                {comment.text}
              </Text>
              <Author>
                {comment.author}
              </Author>
            </Comment>
          )
        })}
      </Col>
    )
  }
}

export default App

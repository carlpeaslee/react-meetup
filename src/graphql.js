import {api} from 'config'

export const getAllComments = async () => {

  let options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(
      {
        query: `{
          allComments (
            first: 999
            orderBy: createdAt_DESC
          ) {
            id
            author
            text
          }
        }`
      }
    )
  }
  try {
    let result = await fetch(api, options)
    let response = await result.json()
    return response.data.allComments
  } catch (error) {
  }
}

export const createComment = async (author, text) => {

  let options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(
      {
        query: `
          mutation {
            createComment (
              author: "${author}"
              text: "${text}"
            ) {
              id
              author
              text
            }
          }
        `
      }
    )
  }
  try {
    let result = await fetch(api, options)
    let response = await result.json()
    return response.data.createComment
  } catch (error) {
  }
}

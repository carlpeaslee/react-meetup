import styled, {css} from 'styled-components'

const media = {
  s: (...args) => css`
    @media (max-width: 800px) {
      ${ css (...args)}
    }
  `
}

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: sans-serif;
  width: 50%;
  margin: auto;
  ${media.s`
    width: 100%;
  `}
`

export const Login = styled.button`
  display: flex;
  width: 100%;
  height: 100px;
  font-size: 30px;
  background-color: darkorchid;
  color: honeydew;
  justify-content: center;
`

export const Submit = styled(Login)`
  background-color: powderblue;
  color: darksalmon;
  &:hover {
    background-color: lemonchiffon;
  }
`

export const CommentInput = styled.textarea`
  width: 100%;
  font-size: 20px;
`

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: mintcream;
  border: ${({author})=>(author === 'cpeaslee@gmail.com') ? '3px groove deeppink': '1px solid olivedrab'};
  height: 150px;
  width: 100%;
  margin: 4px;
  padding: 4px;
`

export const Text = styled.p`
  font-size: 18px;
  font-weight: 200;
`

export const Author = styled.h3`
  font-size: 20px;
  font-weight: 400;
  color: saddlebrown;
`

import { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function StartingScreen() {
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return(
  <Container>
    <div className='leftSide'>
      <h1>Play Vs...</h1>
      <div className='avatar'>
        <a href={'https://www.chess.com/member/esfm'}>
          <img src='./assets/avatar.svg' alt='avatar'/>
          </a>
      </div>
      <h2><bold>Erick Bot</bold> (1500)</h2>
      <div className='description'>
        <h3>Since he was a child, Erick loved to play chess, but since he started to study about technology lately, he does not have the time to play with his friends anymore. To solve the problem, he made an "Erick-bot" to keep losing even when he is not playing.</h3>
      </div>
    </div>
    <div className='rightSide'>
      <h1><dark>CheckMate-Me!</dark></h1>
      <div className='userInfos'>
        <input 
        type={'text'}
        placeholder={'Your name'}
        onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {
      isLoading ? 
        <div className='loading'/>
        :
        <Link to={'/GameScreen'}>
          <button onClick={() => setIsLoading(true)}>
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </button>
        </Link>
      }
      <h2><span>Find Me in:</span></h2>
      <div className='links' >
        <ion-icon name="logo-github"/>
        <h4><a href={'https://github.com/ErickSchuenck'}>My Github</a></h4>
      </div>
      <div className='links'>
        <ion-icon name="logo-linkedin"/>
        <h4><a href={'https://www.linkedin.com/in/erick-schuenck-fava-mokdeci-603367221/'}>My linkedin</a></h4>
      </div>
      <div className='links'>
        <h5><ion-icon name="bookmark"/></h5>
        <h4><a href={'https://curriculum-vitae-chi.vercel.app/'}>My digital curriculum</a></h4>
      </div>
      <div className='links'>
        <h5>&#9813;</h5>
        <h4><a href={'https://www.chess.com/member/esfm'}>My chess.com</a></h4>
      </div>
     
    </div>

    
  </Container>
  )
}

const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  
  ion-icon{
    font-size: 30px;
    color: black;
    margin: 10px;
  }
  .leftSide{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
    width: 100%;
  }

  .rightSide{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    height: 100%;
    background-color: #DEDEDE;
  }
  .avatar{
    cursor: pointer;
    background-color: white;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .description{
    max-width: 250px
  }
  h1{
    color: white;
    font-weight: 800;
    dark{
      font-size: 45px;
      color: black;
    }
  }
  h2{
    color: white;
    font-weight: 300;
    span{
      color: black;
    }
    bold{
      font-weight: 800;
    }
  }
  h3{
    color: white;
    font-weight: 300;
    text-align: center
  }
  h4{
    margin: 0;
  }
  h5{
    padding-right: 5px;
    font-size: 30px;
    margin: 0;
  }
  span{
    font-weight: 500;
  }
  input{
    text-align: center;
    cursor: pointer;
    border: none;
    width: 230px;
    height: 26px;
    font-size: 16px;
    color: white;
    background-color: #333333;
    padding: 10px;
    border-radius: 5px;
  }
  input:focus {
    transition: all .3s;
    background-color: #6e8b3d;
    outline: 0;
    transform: scale(1.01);
  }
  input::placeholder{
    font-weight: 800;
    color: white;
  }
  button{
    
    border: none;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #DEDEDE;
    cursor: pointer;
    ion-icon{
      font-size: 35px;
      :hover{
        transition: all .3s;
        color: #6e8b3d;
        transform: scale(1.3);
      }
    }
    
    h2{
      font-size: 20px;
    }
  }
  .links{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .loading {
    animation: is-rotating 1s infinite;
    width: 25px;
    height: 25px;
    border: 6px solid #6e8b3d;
    border-top-color: white;
    border-radius: 50%;
    margin: 15px;
  }

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }

  a:link {
    text-decoration: none;
    color: black;
  }

  a:visited {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: none;
    color: black;
  }

  a:active {
    text-decoration: none;
    color: black;
  }
 @media(max-width: 700px){
    flex-direction: column;
 }
`

"use client"

import styles from './page.module.css'
import { ChangeEvent, MouseEventHandler, ReactNode, useState } from 'react'


export default function Home() {
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const minlength:number=8
  function nameHandler(e:ChangeEvent<HTMLInputElement>):void{
    setName(e.target.value)

  }
  function hasSpecialCharacters():JSX.Element {
    const pattern = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(pattern.test(name) || pattern.test(password) ){
      return (
        <p className={styles.alert} >the username or password cannot contain special characters</p>
      )
    }
    else{
      return(
        <></>
      )
    }
  }
  function passwordHandler(e:ChangeEvent<HTMLInputElement>):void{
    setPassword(e.target.value)
  }
  function lengthValidator():JSX.Element{
    if(password.length<8 || name.length<8){
      return(
        <p className={styles.alert}>the password or username is less than 8 characters</p>
      )
    }
      else{
        return <></>
      
    }
  }
  function signupHandler():void{
    location.href="/signup"
  }
  
  function loginHandler(){
    
  }

  return (
    <main className={styles.main}>
      <h3>GIVEBACK<span className={styles.color}>TIME.</span></h3>
      <div className={styles.logincontainer}>
        <div className={styles.inputfieldcontainer}>
        
          <input type='text' className={styles.inputfield} id='username' placeholder='username or email' onChange={nameHandler} value={name}/>
          <input type='password' className={styles.inputfield} placeholder='password' onChange={passwordHandler} value={password} />
          <button className={styles.loginbutton} onClick={loginHandler} > Login</button>
          {lengthValidator()}
          {hasSpecialCharacters()}
          <button className={styles.loginbutton} onClick={signupHandler} > Signup</button>
        </div>
      </div>
    </main>
  )
}

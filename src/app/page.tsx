"use client"

import styles from './page.module.css'
import { ChangeEvent, MouseEventHandler, ReactNode, useState } from 'react'
import Signinbutton from '@/Components/Buttons/googleSignin'

export default function Home() {
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const minlength:number=8
  const pattern = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/
  function nameHandler(e:ChangeEvent<HTMLInputElement>):void{
    setName(e.target.value)

  }
  function hasSpecialCharacters():boolean {
        
    if(pattern.test(name) || pattern.test(password) ) return true
    else return false
}
  function passwordHandler(e:ChangeEvent<HTMLInputElement>):void{
    setPassword(e.target.value)
  }
  function lengthValidator():boolean{
    if(password.length>1 || name.length>1){
        if(password.length<minlength || name.length<minlength) return true
        else return false
            
        
    }else return false
}
  function signupHandler():void{
    location.href="/signup"
  }
  
  function loginHandler():void{
    
  }
  function googleSigninHandler():void{
    console.log("hello world")
  }

  return (
    <main className={styles.main}>
      <h3>GIVEBACK<span className={styles.color}>TIME.</span></h3>
      <div className={styles.logincontainer}>
        <div className={styles.inputfieldcontainer}>
        
          <input type='text' className={styles.inputfield} id='username' placeholder='username or email' onChange={nameHandler} value={name}/>
          <input type='password' className={styles.inputfield} placeholder='password' onChange={passwordHandler} value={password} />
          <button className={styles.loginbutton} onClick={loginHandler} > Login</button>
          {lengthValidator()? <p className={styles.alert}>the password or username must be more than 8 characters</p> : null}
          {hasSpecialCharacters()? <p className={styles.alert} >the username or password cannot contain special characters</p>:null}
          <Signinbutton height={30} width={30} onClick={googleSigninHandler} labelstring={"Google Signin"}/>
          <button className={styles.loginbutton} onClick={signupHandler} > Signup</button>

        </div>
      </div>
    </main>
  )
}

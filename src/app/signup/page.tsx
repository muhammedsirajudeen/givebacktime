"use client"

import styles from './page.module.css'
import { ChangeEvent, MouseEventHandler, ReactNode, useState } from 'react'


export default function Signup() {
    
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    const minlength:number=8
    const pattern = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
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

    function passwordChecker():JSX.Element{

        if(password.length>1){
            if(password!==confirmpassword){
                return(
                    <p className={styles.passwordredalert}>the passwords doesnt match</p>
                )
            }else{
                return(
                    <p className={styles.passwordgreenalert}>the passwords match</p>
                )
            }
        }
        else{
            return(
                <></>
            )
        }
    }
    function loginHandler():void{
        location.href="/"
    }
    function confirmpasswordHandler(e:ChangeEvent<HTMLInputElement>){
        setConfirmpassword(e.target.value)
    }
    
    function signupHandler():void {
        if(password.length>=8 && name.length>=8 && password===confirmpassword && !pattern.test(name) && !pattern.test(password) )  {
            

        }
        else{
            setName("")
            setPassword("")
            setConfirmpassword("")
            alert("please check the information")
            
        }
    }

    return (
        <main className={styles.main}>
        <h3>GIVEBACK<span className={styles.color}>TIME.</span></h3>
        <h6>SIGNUP TO CONTINUE TO THE PLATFORM</h6>
        <div className={styles.logincontainer}>
            <div className={styles.inputfieldcontainer}>
            
            <input type='text' className={styles.inputfield} id='username' placeholder='username or email' onChange={nameHandler} value={name}/>
            <input type='password' className={styles.inputfield} placeholder='password' onChange={passwordHandler} value={password} />
            <input type='password' className={styles.inputfield} placeholder='password' onChange={confirmpasswordHandler} value={confirmpassword} />
            <button className={styles.loginbutton} onClick={signupHandler} > Signup</button>
            {lengthValidator()? <p className={styles.alert}>the password or username must be more than 8 characters</p> : null}
            {hasSpecialCharacters()? <p className={styles.alert} >the username or password cannot contain special characters</p>:null}
            {passwordChecker()}
            <button className={styles.loginbutton} onClick={loginHandler} > Login</button>
            </div>
        </div>
        </main>
    )
    }
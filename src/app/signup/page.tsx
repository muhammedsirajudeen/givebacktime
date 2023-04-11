"use client"

import styles from '../page.module.css'
import { ChangeEvent, MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react'
import Signinbutton from '../../Components/Buttons/googleSignin'
import { FirebaseApp } from 'firebase/app'
import { actionCodeSettings } from '@/FirebaseHelper/ActionCode'
import { getAuth, Auth,createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth";
import { useAppSelector } from '@/State/useAppSelector'
export default function Signup() {
    
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    const minlength:number=8
    const pattern = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    const firebaseApp=useRef<FirebaseApp>()
    const [createAccount,setCreateAccount]=useState(false)
    console.log(process.env.NEXT_PUBLIC_FIREBASE_APIKEY)
    let auth:Auth
    //same here
    useAppSelector((state)=>{
        firebaseApp.current=state.firebase.app
        auth=getAuth(firebaseApp.current)
        
    })
   
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
    //firebase create account with email and password
    function createAccountHandler():void {
        
        if(password.length>=8 && name.length>=8 && password===confirmpassword && !pattern.test(name) && !pattern.test(password) )  {
            // const auth=getAuth(firebaseApp.current)
            createUserWithEmailAndPassword(auth,name,password).then((userCredential)=>{
                const user=userCredential.user
                console.log(user)
                setCreateAccount(true)

            }).catch((error)=>{
                const errorCode=error.code
                const errorMessage=error.message
                console.log(errorMessage)
            })

        }
        else{
            setName("")
            setPassword("")
            setConfirmpassword("")
            alert("please check the information")
            
        }
    }
    function verifyAccountHandler():void{
        const auth=getAuth(firebaseApp.current)
        sendSignInLinkToEmail(auth, name, actionCodeSettings)
        .then(() => {
            alert("email sent successfully")
            window.localStorage.setItem('emailForSignIn', name);
          })
        .catch((error:any) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
        });
    }
    function googleSignupHandler(){
        console.log("hello")
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
            <button className={styles.createbutton} onClick={createAccountHandler} > Create Account</button>
            <button className={createAccount? styles.loginbutton :styles.hidebutton}  onClick={verifyAccountHandler} > Verify Email</button>
            {lengthValidator()? <p className={styles.alert}>the password or username must be more than 8 characters</p> : null}
            {hasSpecialCharacters()? <p className={styles.alert} >the username or password cannot contain special characters</p>:null}
            {passwordChecker()}
            <Signinbutton height={30} width={30} onClick={googleSignupHandler} labelstring={"Google Signup"}/>
            <button className={styles.loginbutton} onClick={loginHandler} > Login</button>
           
            </div>
        </div>
        </main>
    )
    }
"use client"

import styles from '../page.module.css'
import { ChangeEvent, memo, useMemo, useRef, useState } from 'react'
import Signinbutton from '../../Components/Buttons/googleSignin'
import { FirebaseApp } from 'firebase/app'
import { actionCodeSettings } from '@/FirebaseHelper/ActionCode'
import { getAuth, Auth,createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth";
import { useAppSelector } from '@/State/useAppSelector'
import { Firestore, getFirestore } from 'firebase/firestore'
import { collection, addDoc } from "firebase/firestore"; 

export default function Signup() {
    
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    const minlength:number=8
    const pattern = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    const firebaseApp=useRef<FirebaseApp>()
    
    let auth:Auth    
    let db:Firestore
    useAppSelector((state)=>{
        firebaseApp.current=state.firebase.app
        auth=getAuth(firebaseApp.current)
        db=getFirestore(firebaseApp.current)
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
            
            createUserWithEmailAndPassword(auth,name,password).then((userCredential)=>{
                const user=userCredential.user
                window.localStorage.setItem("uid",user.uid)
                return userCredential.user.getIdToken()
                

            }).then((accessToken)=>{
                console.log(accessToken)
                window.localStorage.setItem("token",accessToken)
                sendSignInLinkToEmail(auth, name, actionCodeSettings)
                .then(async () => {
                    alert("email sent successfully")
                    window.localStorage.setItem('emailForSignIn', name)
                    
                    //hash the password according to it

                    addDoc(collection(db, "UserEmailVerificationStatus"), {
                        email: name,
                        verified:false    
                      }).then(()=>{
                        window.location.href="/uploaduserdetails"

                      })
                    
                  })
                  //find the type of this error message
                .catch((error) => {
        
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode,errorMessage)
                });

            })
            .catch((error)=>{
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
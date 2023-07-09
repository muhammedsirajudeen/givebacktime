"use client"
import { useEffect, useRef, useState } from "react"
import styles from "./page.module.css"
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useAppSelector } from "@/State/useAppSelector";
import { FirebaseApp } from "firebase/app";
import axios from "axios";
export default function VerifyEmail(){
    const [initialState,setinitialState]=useState("veryifing your email")
    const firebaseApp=useRef<FirebaseApp>()
    useAppSelector((state)=>firebaseApp.current=state.firebase.app)
    useEffect(()=>{
        const auth=getAuth(firebaseApp.current)
        if (isSignInWithEmailLink(auth, window.location.href)) {
            
            let email:string|   null= window.localStorage.getItem('emailForSignIn')!
            if (!email) {
    
                email = window.prompt('Please provide your email for confirmation');
            }
            if(email){
      
            signInWithEmailLink(auth,email, window.location.href)
                .then( async (result) => {
                    setinitialState("email verified")
                    
                    
                    //here we do need to set the get the token as the token is already verified we can however
                    //we can set the collection marked as verified so that when the user requests for it
                    //it knows that the email is already verified
                    window.localStorage.removeItem('emailForSignIn');
                    
    
            })
                .catch((error) => {
        
            });
        }
    }
    },[])
    return (
        <div className={styles.maincontainer}>
            <div className={styles.subcontainer}>
                {initialState}
            </div>
        </div>
    )
}
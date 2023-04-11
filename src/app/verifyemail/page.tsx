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
                    
                    window.localStorage.removeItem('emailForSignIn');
                    let response=await axios.post("/api/getToken",{
                        email:email
                    })
                    console.log(response.data)
    
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
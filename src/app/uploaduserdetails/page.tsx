"use client"

import axios from "axios"
import { getAuth } from "firebase/auth"
import { useEffect,useRef, useState } from "react"
import styles from "./page.module.css"
export default function UploadUserDetails():JSX.Element{
    const url="http://localhost:3000/api"
    const fileanchor=useRef<HTMLInputElement>(null)
    const imageanchor=useRef<HTMLImageElement | null>(null)
    const [selectedfile,setSelectedfile]=useState<File | null>(null)
    useEffect(()=>{
        
        async function getTokenStatus(){
            let response = await axios.post(url+"/getToken",{
                uid:localStorage.getItem("uid")
               
                
            })
            console.log(response.data)
            if(response.data.access!=="approved"){
                window.location.href="/"
            }
            

        }
        getTokenStatus()
    },[])
    function uploadHandler(){
        let filename=fileanchor.current?.files
        if(filename){
            setSelectedfile(filename[0])
            let imageurl=URL.createObjectURL(filename[0])
            console.log(imageurl)
            if(imageanchor.current) imageanchor.current.src=imageurl

        }
    }
    return (
        <div className={styles.maincontainer}>
            <div className={styles.subcontainer}>
                <div className={styles.imageholder}>
                    <img   src="" className={styles.profileimage} ref={imageanchor} /> 
                    {/* we need some functionality of alt thats why we are using this */}
                </div>
                <input type="file" ref={fileanchor} className={styles.fileuploader}/>

                <button onClick={uploadHandler} className={styles.upload}>Upload</button>
            </div>
        </div>
    )
}
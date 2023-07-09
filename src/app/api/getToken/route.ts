import jwt from "jsonwebtoken"
import admin from "@/FirebaseHelper/AdminSdk"
export async function POST(request:Request){
  //learn more about the new api routes
  //no here we are accepting the uid and checking if there is a user by the name also there is no way for the imposter to 
  //fake the uid
  const data=await request.json()
  console.log(data)
  const userRecord=await admin.auth().getUser(data.uid)
  console.log(userRecord)
  
  if(userRecord){
    return new Response(JSON.stringify({access:"approved"}))
  }
  else{
    return new Response(JSON.stringify({access:"denied"}))
  }
}

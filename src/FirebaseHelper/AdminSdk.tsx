import admin,{ServiceAccount} from "firebase-admin"

import firebaseConfigAdmin from "./firebaseConfigAdmin.json"

const serviceaccount:ServiceAccount=firebaseConfigAdmin as ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceaccount)
});

export default admin

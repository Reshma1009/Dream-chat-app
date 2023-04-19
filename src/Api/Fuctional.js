import { auth,db } from "../firsebase.confige";
import {  ref, onValue } from "firebase/database";


/* variable */


export function getCurrentUser(data,setCurrentUser) {

  const useRef = ref(db, "users/");
  onValue(useRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      console.log(item.val());

        arr.push({ ...item.val(), userId: item.key });
      
    });
    setCurrentUser(arr);
  });
}
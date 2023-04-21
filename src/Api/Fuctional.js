import { auth, db } from "../firsebase.confige";
import { ref, onValue } from "firebase/database";

/* variable */

export function getCurrentUser(setCurrentUser) {
  const useRef = ref(db, "users/");
  onValue(useRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      // console.log(item.val());

      arr.push({ ...item.val(), userId: item.key });
    });
    setCurrentUser(arr);
  });
}

/* Get UserLists */
export function userSList(data, setUserList) {
  const usersRef = ref(db, "users/");
  onValue(usersRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item) => {
      if (data.uid == item.key) {
        arr.push({ ...item.val(), userId: item.key });
      }
    });
    setUserList(arr[0]);
  });
}

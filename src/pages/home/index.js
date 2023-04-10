import React, { useState, useEffect } from "react";
import Post from "../../components/Post";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersInformation } from "../../slices/userSlices";
import { push, getDatabase, ref, set, onValue } from "firebase/database";

const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  const currentUser = auth.currentUser;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  console.log(data);
  console.log("current user", auth.currentUser);
  const [verify, setVerify] = useState(false);
  const [value, setValue] = useState("");
  /*    useEffect(() => {
     if (currentUser && currentUser.emailVerified) {
       setVerify( true );
       dispatch(usersInformation(currentUser));
       localStorage.setItem("userRegistationIfo", JSON.stringify(currentUser));

     }
   }, [] ); */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        setVerify(true);
        dispatch(usersInformation(user));
        localStorage.setItem("userRegistationIfo", JSON.stringify(user));
      }
    });
  }, []);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);
  let sendPost = (e) => {
    setValue(e.target.value);
  };
 const [userList, setUserList] = useState({});
  useEffect(() => {
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
  }, []);


  let submitPost = () => {
    console.log("post");
    set(push(ref(db, "posts/")), {
      username: userList.username,
      posts: value,
      userId: data.uid,
    });
  };
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const postsRef = ref(db, "posts/");
    onValue(postsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), postId: item.key });
      });
      setAllPosts(arr);
    });
  }, []);

  return (
    <>
      {verify ? (
        <div className="grid grid-cols-12 h-screen overflow-hidden">
          <div className="col-span-3 relative">
            <div className="h-[180px]">
              <Sidebar active="home" />
            </div>
            <div className="pl-8">
              <UserList />
            </div>
          </div>
          <div
            className="col-span-6 pt-5 "
            style={{
              backgroundImage: 'url("images/bg-color.png")',
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <input type="text" onChange={sendPost} />
              <button onClick={submitPost}>post</button>
            </div>
            <div className="h-[100vh] overflow-x-hidden ">
              {allPosts.map((item) => (
                <Post
                  name={item.username}
                  profilePic="images/profile.png"
                  postPic="images/img.png"
                  content={item.posts}
                />
              ))}
            </div>
          </div>
          <div className="col-span-3">
            <Profile />
          </div>
        </div>
      ) : (
        <div className="flex w-full h-screen justify-center items-center bg-primary">
          <h3 className="text-5xl bg-white text-primary text-center p-7  font-pop font-bold">
            please verify your mail
          </h3>
        </div>
      )}
    </>
  );
};

export default Home;

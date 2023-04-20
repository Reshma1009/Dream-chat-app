import React, { useState, useEffect, useMemo } from "react";
import Post from "../../components/Post";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersInformation } from "../../slices/userSlices";
import {
  push,
  getDatabase,
  ref,
  set,
  onValue,
  serverTimestamp,
} from "firebase/database";
import { userSList } from "../../Api/Fuctional";
import Loder from "../../components/Loder";
const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        dispatch(usersInformation(user));
        localStorage.setItem("userRegistationIfo", JSON.stringify(user));
      } else {
        setUser(null);
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
  useMemo(() => userSList(data, setUserList), []);

  let submitPost = () => {
    // console.log("post");
    set(push(ref(db, "posts/")), {
      username: userList.username,
      posts: value,
      userId: data.uid,
      photo: userList.profile_picture,
      timeStamp: serverTimestamp(),
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        user &&
        !user.emailVerified && (
          <div className="flex w-full absolute h-screen justify-center items-center z-50 bg-primary">
            <h3 className="text-5xl bg-white text-primary text-center p-7  font-pop font-bold">
              please verify your mail
            </h3>
          </div>
        )
      )}
      {user && (
        <div className="grid grid-cols-12 h-screen overflow-hidden">
          <div className="col-span-3 w-[500px] bg-white relative">
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
           {/*  <div>
              <input type="text" onChange={sendPost} />
              <button onClick={submitPost}>post</button>
            </div> */}
            <div className="h-[100vh] overflow-x-hidden flex justify-center items-center">
              {/*  {allPosts
                .sort((a, b) => b.timeStamp - a.timeStamp)
                .map((item) => (
                  <Post item={item} />
                ))} */}
              <h1 className="text-2xl font-pophins font-bold text-primary">Wellcome to Dream Chat {data.displayName}</h1>
            </div>
          </div>
          <div className="col-span-3">
            <Profile />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

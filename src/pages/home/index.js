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
import { Transition } from "@headlessui/react";
import { BsBarChartSteps } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleWindowResize = () =>
    {
      if (window.innerWidth <= 1280) {
        setIsOpen(true);
      } else
      {
        setIsOpen(false);
      }
    };

    // Update the state based on the initial window width
    handleWindowResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
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
    } else {
      setLoading(false);
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
        <div className="flex h-screen overflow-hidden  relative ">
          <div className=" w-[500px] max-mb580:w-full max-mb768:w-[50%] max-mb991:w-[45%] max-pad1024:w-[50%] max-pad1280:w-[35%] bg-white ">
            <div className="h-[180px] max-mb580:h-[180px] max-mb768:h-[100px]">
              <div className=" hidden  justify-end pr-6 max-pad1280:flex absolute right-[-25px] max-pad1024:right-0 top-5">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white focus:outline-none z-50"
                  onClick={handleClick}
                >
                  {isOpen ? (
                    <BsBarChartSteps className="text-2xl" />
                  ) : (
                    <AiOutlineCloseCircle className="text-2xl" />
                  )}
                </button>
              </div>
              <Sidebar active="home" />
            </div>
            <div className="pl-8 max-pad1280:px-5 max-w-full">
              <h1 className="hidden max-mb580:block max-mb580:mb-5 max-mb580:pb-3 max-mb580:border-b max-mb580:border-solid max-mb580:border-primary text-3xl font-pophins font-bold text-heading/90 capitalize leading-10">
                Wellcome to Dream Chat
                <span className="text-primary"> {data.displayName}</span>
              </h1>
              <UserList />
            </div>
          </div>
          <div
            className="flex-1 pt-16 relative "
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

            <div className="border-t border-solid border-primary max-mb580:hidden h-[100vh]  overflow-x-hidden flex justify-center items-center">
              {/*  {allPosts
                .sort((a, b) => b.timeStamp - a.timeStamp)
                .map((item) => (
                  <Post item={item} />
                ))} */}

              <h1 className=" max-mb580:hidden  max-pad1280:text-center max-pad1280:leading-10 text-3xl max-pad1280:text-2xl font-pophins font-bold text-primary capitalize">
                Wellcome to Dream Chat {data.displayName}
              </h1>
            </div>
          </div>
          <Transition
            show={!isOpen}
            enter="transition duration-300 ease-out transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition duration-200 ease-in transform"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
            className={`max-mb768:absolute max-mb768:bg-slate-200 max-mb580:top-20 max-mb580:left-0 max-mb768:left-1/2 h-screen`}
          >
            <div className="w-[400px] max-pad1024:w-full max-pad1280:w-[300px]">
              <Profile />
            </div>
          </Transition>
        </div>
      )}
    </>
  );
};

export default Home;

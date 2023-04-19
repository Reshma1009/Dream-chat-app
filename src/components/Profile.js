import React, { useState, useEffect, useRef } from "react";
import Flex from "./Flex";
import Images from "./Images";
import { MdCloudUpload } from "react-icons/md";
import Accordion from "./Accordian";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import Cropper, { ReactCropperElement } from "react-cropper";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getDatabase,
  ref as dRef,
  onValue,
  query,
  orderByChild,
  equalTo,
  update,
  off,
} from "firebase/database";
import { usersInformation } from "../slices/userSlices";
import { getCurrentUser } from "../Api/Fuctional";
const Profile = () => {
  const auth = getAuth();
  const db = getDatabase();
  const storage = getStorage();
  let dispatch = useDispatch();

  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [loginUser, setLoginUser] = useState({});
  console.log(friendList);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    getCurrentUser(data, setLoginUser);
  }, []);
  const [im, setIm] = useState([]);

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = useRef(null);
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    const storage = getStorage();
    const storageRef = ref(storage, "proflicPic/" + data && data.uid);
    // Data URL string
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        setIsOpen(false);
        setCropData();
        update(dRef(db, "users/" + auth.currentUser.uid), {
          profile_picture: downloadURL,
        });
        // Update the user's info in all their posts
        const updatedPosts = posts.map((post) => {
          return {
            // [`/posts/${post.id}/username`]: useName,
            [`/posts/${post.id}/authorPhotoUrl`]: downloadURL,
          };
        });
        update(dRef(db), Object.assign({}, ...updatedPosts));
      });
    });
  };
  /* Post update */

  const [useName, setUseName] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Create a query to find all posts by the current user
    const postsQuery = query(
      dRef(db, "posts/"),
      orderByChild("userId"),
      equalTo(data.uid)
    );

    // Set up a listener for the posts query
    const postsListener = onValue(postsQuery, (snapshot) => {
      const postsData = [];
      snapshot.forEach((childSnapshot) => {
        const postId = childSnapshot.key;
        const postData = childSnapshot.val();
        postsData.push({ id: postId, ...postData });
      });
      setPosts(postsData);
    });

    // Return a cleanup function to detach the listener when the component unmounts
    return () => {
      off(postsQuery, "value", postsListener);
    };
  }, [db, data]);
  // console.log("data", data);
  let usernameUpdate = (e) => {
    setUseName(e.target.value);
  };
  let updateProfile = () => {
    update(dRef(db, "users/" +  auth.currentUser.uid), {
      username: useName,
    });
    // Update the user's info in all their posts
    const updatedPosts = posts.map((post) => {
      return {
        [`/posts/${post.id}/username`]: useName,
        // [`/posts/${post.id}/authorPhotoUrl`]: newUserInfo.photoURL,
      };
    });
    update(dRef(db), Object.assign({}, ...updatedPosts));
  };
  console.log("posts", posts);
  /*  const [userList, setUserList] = useState({});
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
 }, []); */
  return (
    <>
      <Flex className="items-center flex flex-col pt-10">
        <div className="relative mb-5 group">
          <div className="w-[150px] h-[150px]">
            <Images
              imgSrc={data && data.photoURL}
              className="rounded-full w-full"
            />
          </div>
          <div
            onClick={toggleModal}
            className=" transition-all opacity-0 group-hover:opacity-100 absolute w-full h-full bg-[rgba(0,0,0,.4)] rounded-full top-0 left-0 flex justify-center items-center ease-out duration-[.4s] "
          >
            <MdCloudUpload className="text-4xl text-white" />
          </div>
        </div>
        {isOpen && (
          <Modal
            onClick={toggleModal}
            titel="Upload your Photo"
            show={true}
            sendImg={getCropData}
          >
            <div className="flex flex-col justify-center items-center">
              {image && (
                <Cropper
                  style={{ height: 400, width: "100%" }}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  ref={cropperRef}
                  viewMode={1}
                  guides={true}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  checkOrientation={false}
                />
              )}
              {image ? (
                <div className="w-[100px] h-[100px] mx-auto rounded-full overflow-hidden mb-5">
                  <div className="img-preview w-full h-full"></div>
                </div>
              ) : (
                <div className="w-[100px] h-[100px]">
                  <Images
                    imgSrc={data && data.photoURL}
                    className="rounded-full w-full"
                  />
                </div>
              )}

              <input className="self-start" type="file" onChange={onChange} />
            </div>
          </Modal>
        )}
        <h2 className="text-3xl font-bold font-pophins mb-5">
          {loginUser.username}
        </h2>
        <p className="font-pophins font-medium text-lg max-w-[400px] mx-auto text-center">
          Login Email: {data && data.email}
        </p>
        <input
          onChange={usernameUpdate}
          className="bg-slate-200"
          type="text"
          name=""
          id=""
        />
        <button onClick={updateProfile}>update</button>
      </Flex>
      <div className="border-black border-b border-solid mb-5 pb-5 px-5">
        {/* <Accordion items={items} /> */}
      </div>
      <div className="px-5">{/* <Accordion items={items2} /> */}</div>
      {/* {im.map((item) => (
        <img src={item._location.path_} alt="at" />
      ))} */}
    </>
  );
};

export default Profile;

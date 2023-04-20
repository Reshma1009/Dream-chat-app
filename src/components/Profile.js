import React, { useState, useEffect, useRef, useMemo } from "react";
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
} from "firebase/storage";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
  updateProfile,
} from "firebase/auth";
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
import { getCurrentUser, userSList } from "../Api/Fuctional";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [friendList, setFriendList] = useState([]);
  console.log(friendList);
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  /* Update Info  */
  const [inputInfo, setInputInfo] = useState({
    username: "",
    password: "",
    email: "",
  });
  let changeInfo = (e) => {
    const { name, value } = e.target;
    setInputInfo({
      ...inputInfo,
      [name]: value,
    });
  };
  console.log(inputInfo);
  const [image, setImage] = useState(null);
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
  const [userList, setUserList] = useState({});
  useMemo(() => userSList(data, setUserList), []);
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    const storage = getStorage();
    const storageRef = ref(storage, "profilePic/" + data.displayName);
    // Data URL string
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        })
          .then(() => {
            setCropData("");
            setImage(null);
            setIsOpen(false);
            update(dRef(db, "users/" + auth.currentUser.uid), {
              profile_picture: downloadURL,
            });
          })
          .catch((error) => {
            alert(error);
          });
      });
    });
  };
  /* Post update */

  const [useName, setUseName] = useState("");
  const [posts, setPosts] = useState([]);

  /* useEffect(() => {
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
  }, [db, data]);*/
  // console.log("data", data);

  let updateProfileInfo = () => {
    updateProfile(auth.currentUser, {
      displayName: inputInfo.username,
    }).then(() => {
      update(dRef(db, "users/" + auth.currentUser.uid), {
        username: inputInfo.username,
      });
    });

    inputInfo.username("");

    /*    // Update the user's info in all their posts
    const updatedPosts = posts.map((post) => {
      return {
        [`/posts/${post.id}/username`]: useName,
        // [`/posts/${post.id}/authorPhotoUrl`]: newUserInfo.photoURL,
      };
    });
    update(dRef(db), Object.assign({}, ...updatedPosts)); */
  };
  // console.log("posts", posts);
  let updateEmailInfo = () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      inputInfo.password
    );
    updateProfile(auth.currentUser, {
      email: inputInfo.email,
    })
      .then(() => {
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
          updateEmail(auth.currentUser, inputInfo.email)
            .then(() => {
              console.log( "Email updated!" );
              sendEmailVerification(auth.currentUser);
              update( dRef( db, "users/" + auth.currentUser.uid ), {email:inputInfo.email} );
              // navigate("/login");
            })
            .catch((error) => {
              alert( error);
            });
        });
      })
      .catch((error) => {
        console.log("update email", error);
      });
  };
  return (
    <>
      <Flex className="items-center flex flex-col pt-10">
        <div className="relative mb-5 group">
          <div className="w-[150px] h-[150px]">
            <Images
              imgSrc={userList.profile_picture}
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
                    imgSrc={userList.profile_picture}
                    className="rounded-full w-full"
                  />
                </div>
              )}

              <input className="self-start" type="file" onChange={onChange} />
            </div>
          </Modal>
        )}
        <h2 className="text-3xl font-bold font-pophins mb-5">
          {data && data.displayName}
        </h2>
      </Flex>
      <div className="border-black border-t border-solid mb-5 pb-5 px-5 pt-5">
        <h3 className=" pb-2 border-b border-solid font-pophins font-bold text-lg max-w-[400px] mx-auto text-center">
          Users Info:
        </h3>
        <p className="font-pophins font-medium text-lg max-w-[400px] mx-auto my-2">
          Name: {data &&data.displayName}
        </p>
        <p className="font-pophins font-medium text-lg max-w-[400px] mx-auto mb-2">
          Email: {data&&data.email}
        </p>
      </div>
      <div className="border-black border-t border-solid mb-5 pb-5 px-5 pt-5">
        <h3 className=" pb-2 border-b border-solid font-pophins font-bold text-lg max-w-[400px] mx-auto text-center">
          Update Info:
        </h3>
        <div className="my-4">
          <p className="font-pophins font-medium text-base max-w-[400px] mx-auto ">
            Change your Name:
          </p>
          <input
            onChange={changeInfo}
            className="bg-slate-200 px-5 py-2 rounded-tl-lg rounded-bl-lg w-[60%] ml-5 "
            type="text"
            value={inputInfo.username}
            placeholder="Name"
            name="username"
          />
          <button
            className="bg-primary capitalize text-white px-5 py-2 rounded-tr-lg rounded-br-lg disabled:cursor-not-allowed disabled:opacity-40"
            onClick={updateProfileInfo}
            disabled={!inputInfo.username}
          >
            update
          </button>
        </div>
        <div className="my-4">
          <p className="font-pophins font-medium text-base max-w-[400px] mx-auto">
            Change your Email:
          </p>
          <input
            onChange={changeInfo}
            className="bg-slate-200 px-5 py-2 rounded-lg rounded-bl-lg w-[60%] ml-5"
            type="text"
            value={inputInfo.email}
            placeholder="Email"
            name="email"
          />
        </div>
        <div>
          {/* <p className="font-pophins font-medium text-base max-w-[400px] mx-auto">
            Change your Password:
          </p> */}
          <input
            onChange={changeInfo}
            className="font-pophins font-medium bg-slate-200 px-5 py-2 rounded-lg  rounded-bl-lg w-[60%] ml-5"
            type="text"
            value={inputInfo.password}
            placeholder="Password"
            name="password"
          />
          <button
            className="bg-primary font-pophins font-medium text-white px-5 py-2 capitalize rounded-tr-lg rounded-lg disabled:cursor-not-allowed disabled:opacity-40 block ml-5 mt-5"
            onClick={updateEmailInfo}
            disabled={!inputInfo.password}
          >
            update
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;

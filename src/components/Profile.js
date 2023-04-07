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
import { getDatabase, ref as dRef, update, onValue } from "firebase/database";
import { usersInformation } from "../slices/userSlices";
const Profile = () => {
  const storage = getStorage();
  let dispatch = useDispatch();


  const auth = getAuth();
  const db = getDatabase();
  let data = useSelector((state) => state.allUserSInfo.userInfo);
  const [isOpen, setIsOpen] = useState(false);
 const [friendList, setFriendList] = useState([]);
/*  useEffect(() => {
   const friendsRef = ref(db, "friends/");
   onValue(friendsRef, (snapshot) => {
     let arr = [];
     snapshot.forEach((item) => {
       console.log(item.val());
       arr.push(item.val());
     });
     setFriendList(arr);
   });
 }, []); */
 console.log(friendList);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const items = [{ title: "Info", content: { email: "Email Address" } }];
  const items2 = [
    {
      title: "Settings",
      content: { editName: "Display Name", editBio: "Edit Your Bio" },
    },
  ];
  const [im, setIm] = useState([]);
  /*  useEffect(() => {
    const listRef = ref(storage, "/take-photo");

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log("folderRef", folderRef);
        });
        let arr = [];
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          // console.log("itemRef", itemRef);
          arr.push(itemRef);
        });
        setIm(arr);
      })
      .then(
        getDownloadURL(starsRef)
          .then((url) => {
            // Insert url into an <img> tag to "download"
          })
          .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect the server response
                break;
            }
          })
      )
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  }, []); */

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
    const storageRef = ref(storage, "proflicPic/" + auth.currentUser.uid);
    // Data URL string
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("File available at", downloadURL);
        updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        })
          .then(() => {
            setIsOpen(false);
            setCropData();
            update(dRef(db, "users/" + auth.currentUser.uid), {
              profile_picture: downloadURL,
            });
            /* update(dRef(db, "friends/" + receiverPhoto), {
              profile_picture: downloadURL,
            }); */
            // data2.email;
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      });
    });
  };
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
          {data && data.displayName}
        </h2>
        <p className="font-pophins font-medium text-lg max-w-[400px] mx-auto text-center">
          Login Email: {data && data.email}
        </p>
      </Flex>
      <div className="border-black border-b border-solid mb-5 pb-5 px-5">
        <Accordion items={items} />
      </div>
      <div className="px-5">
        <Accordion items={items2} />
      </div>
      {im.map((item) => (
        <img src={item._location.path_} alt="at" />
      ))}
    </>
  );
};

export default Profile;

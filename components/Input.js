import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRef, useState,useEffect } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";

function Input() {

  const {data:session} = useSession();
  const [input,setInput] = useState("");
  const [file,setFile] = useState(null);
  const filePickerRef = useRef(null);
  const [showEmojis,setShowEmojis] = useState(false);
  const [loading,setLoading] = useState(false);

  const sendPost = async() => {
    if(loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db,'posts'),{
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage,`posts/${docRef.id}/image`);

    if(file){
      await uploadString(imageRef,file,'data_url').then(async() => {
        const downloadUrl = await getDownloadURL(imageRef)
        await updateDoc(doc(db,'posts',docRef.id),{
          image:downloadUrl,
        });
      });

    }
    setLoading(false);
    setInput('');
    setFile(null);
    setShowEmojis('');
  }

  const AddImageToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setFile(readerEvent.target.result);
    }
  }

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };
  console.log(session)

  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll
    ${loading && 'opacity-60'}`}>
      <img src={session.user?.image}
      className='rounded-full h-10 w-10 cursor-pointer'  alt="" />
      <div className='w-full divide-y divide-gray-700'>
        <div className={`${file && "pb-7"} ${input && 'space-y-2.5'}`}>
          <textarea rows={2} 
          onChange={ (e) => {setInput(e.target.value)}}
          className='bg-transparent outline-none w-full text-[#d9d9d9] 
          min-h-[50px] text-lg place-holder-gray-500 tracking-wide' placeholder='Whats happening?' value={input}></textarea>
          {file && (
            <div className="relative">
            <div  
              className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
              onClick={() => setFile(null)}
            >
              <XIcon className="text-white h-5" />
            </div>
            <img
              src={file}
              alt=""
              className="rounded-2xl max-h-80 object-contain"
            />
          </div>
          )}
        </div>
        {!loading && (
          <div className='flex items-center justify-between pt-2.5' >
          <div className="flex items-center">
            <div className='icon' onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className='h-[22px] text-[#f01d4e]'/>
              <input type="file" hidden onChange={AddImageToPost} ref={filePickerRef} />
            </div>
            <div className="icon rotate-90">
                <ChartBarIcon className="text-[#f01d4e] h-[22px]" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-[#f01d4e] h-[22px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-[#f01d4e] h-[22px]" />
              </div>

              {showEmojis && (
                  <Picker
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                    background:'black'
                  }}
                  theme="dark"
                />
              )}
          </div>
          <button
              className="bg-[#f01d4e] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#f01d4e] disabled:opacity-50 disabled:cursor-default"
              disabled={!input && !file}
              onClick={sendPost}
            >
              Tweet
            </button>
        </div>
        )}
      </div>
    </div>
  )
}

export default Input
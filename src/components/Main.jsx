import { useEffect, useState } from "react";
import TweetForm from "./TweetForm";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import Post from "./Post";

const Main = () => {
  const [tweets, setTweets] = useState(null);
  const tweetCol = collection(db, "tweets");

  useEffect(() => {
    // abone olduğumuz tweetleri filtreleme/sıralama
    const queryOption = query(tweetCol, orderBy("createdAt", "desc"));
    //koleksşyondaki değişimi izler
    onSnapshot(tweetCol, (snapshot) => {
      //geçici olarak tweetleri tuttuğumuz dizi
      const temptTweets = [];

      //documentleri dönüp ihtiyacımız olan diziyi aktarma
      snapshot.forEach((doc) =>
        temptTweets.push({ ...doc.data(), id: doc.id })
      );

      //state i twetlere aktarma
      setTweets(temptTweets);
    });
  }, []);
  return (
    <main className=" main col-span-3 md:col-span-2 xl:col-span-2 border border-gray-800 overflow-y-auto ">
      <header className="font-bold p-4 border-b-2 border-gray-800">
        Ana Sayfa
      </header>
      <TweetForm />
      {/* LOADİNG */}
      {!tweets && <p className="text-center mt-[ 200px]">Yükleniyor....</p>}

      {/* twetleri listeleme */}
      {tweets?.map((tweet) => (
        <Post key={tweet?.id} tweet={tweet} />
      ))}
    </main>
  );
};

export default Main;

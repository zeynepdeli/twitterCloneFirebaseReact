import { auth, db, storage } from "../firebase/config";
import { BsCardImage } from "react-icons/bs";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const TweetForm = () => {
  //koleksiyonu referans alma
  const tweetsCol = collection(db, "tweets");

  //resmi storage a yükler ve url sini döndürür
  const uploadImage = async (image) => {
    //gçnderilen dosyayı kontrol etme
    if (!image) {
      return null;
    }
    //resmin storage daki yerini ayarlama
    const storageRef = ref(storage, `${new Date().getTime()}${image.name}`);
    //resmi ayarladığım konuma yükleme
    const url = await uploadBytes(storageRef, image)
      //yülkleme bittiğinde remin url sini al
      .then((res) => getDownloadURL(res.ref))
      .catch(() => toast.error("Resmi yüklerken hata oluştu"));
    //fonksiyonun çağrıldığı yere url gönderme
    return url;
  };

  //formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();

    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // resmi storage'a yükleyip url'ini alma
    const url = await uploadImage(imageContent);

    if (!textContent) {
      toast.info("Tweet içeriği ekleyin..");
      return;
    }

    //tweeti koleksiyona ekleme

    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      likes: [],
    });

    //inputları sıfırla
    e.target[0].value = "";
    e.target[1].value = null;
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-2 border-b-gray-800"
    >
      <img className="rounded-full h-[50px]" src="/profil.jpg" />

      <div className="w-full">
        <input
          placeholder="Neler Oluyor"
          className="w-full bg-transparent my-2 outline-none placeholder:text-lg"
          type="text"
        />

        <div className="flex h-[45px] items-center justify-between">
          <div className="hover:bg-gray-800 transition p-4 cursor-pointer rounded-full ">
            <label htmlFor="picture">
              <BsCardImage />
            </label>
            <input className="hidden" id="picture" type="file" />
          </div>
          <button className="bg-blue-600 px-4 rounded-full transition hover:bg-blue-500">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;

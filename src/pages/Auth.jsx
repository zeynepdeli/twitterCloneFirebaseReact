import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
  const [signUp, setSignup] = useState(true);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //formdaki değerlere erişme
    const mail = e.target[0].value;
    const pass = e.target[1].value;

    if (signUp) {
      //hesap oluştur
      createUserWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          navigate("/feed");
          toast.success("Hesabınız oluşturuldu");
        })
        .catch((err) => {
          console.dir(err);
          toast.error(`Üzgünüz bir hata oluştu:${err.code}`);
        });
    } else {
      //giriş yap
      signInWithEmailAndPassword(auth, mail, pass)
        .then(() => {
          navigate("/feed");
          toast.success("Hesabınıza giriş yapıldı");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-login-credentials") {
            setIsError(true);
          }
          toast.error(`Üzgünüz bir hata oluştu ${err.code}`);
        });
    }
  };

  // şifre sıfırlama
  const handlePassReset = () => {
    sendPasswordResetEmail(auth, email).then(() =>
      toast.info("Mailinize sıfırlama e-postası gönderildi")
    );
  };

  //google ile giriş yap

  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      navigate("/feed");
      toast.success("Google hesabınız ile giriş yapıldı.");
    });
  };
  return (
    <section className="h-screen bg-zinc-800 grid place-items-center">
      <div className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center ">
          <img className="h-[60px]  bg-white " src="/twitter.png" />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter'a Giriş Yap</h1>
        <div
          onClick={handleGoogle}
          className="flex items-center bg-white py-2 px-10 rounded-full cursor-pointer gap-3 hover:bg-gray-200"
        >
          <img src="/google.jpg" className="h-[40px]" />
          <span className="text-black">
            Google ile {signUp ? "Kayıt ol" : "Giriş yap"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            autoComplete="email"
            type="email"
            className="text-black rounded mt-1 p-2 shadow-lg focus:shadow-[gray]"
          />
          <label className="mt-5"> Şifre</label>
          <input
            autoComplete="password"
            type="password"
            className="text-black rounded mt-1 p-2 shadow-lg  focus:shadow-[gray]"
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {signUp ? "Kayıt ol" : "Giriş yap"}
          </button>

          <p className="mt-5">
            <span className="text-gray-500 me-2">
              {signUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
            </span>
            <span
              onClick={() => setSignup(!signUp)}
              className="cursor-pointer text-blue-500"
            >
              {signUp ? "Giriş Yap" : "Kaydol"}
            </span>
          </p>

          {/* hata varsa */}
          {isError && !signUp && (
            <p
              onClick={handlePassReset}
              className="text-red-400 mt-4 cursor-pointer"
            >
              Şifrenizi mi unuttunuz?
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Auth;

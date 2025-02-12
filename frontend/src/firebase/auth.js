import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase";

export const doSignInWithGoogle = async() =>{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth , provider);
    // console.log(result)
    return result;
}

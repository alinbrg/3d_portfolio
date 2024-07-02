import  {Suspense, useRef, useState} from "react";
import emailjs from '@emailjs/browser';
import {Canvas} from "@react-three/fiber";
import Fox from "../modals/Fox";
import Loader from "../components/Loader.jsx";
import useAlert from "../hooks/useAlert.js";
import Alert from "../components/Alert.jsx";

const initialForm = {
  name: '',
  email: '',
  message: ''
}
const Contact = () => {
  const [form, setForm] = useState({...initialForm})
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const [currentAnimation, setCurrentAnimation] = useState('idle')
  const {alert, showAlert, hideAlert} = useAlert()
  const handleChanges = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }
  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation('hit')

    emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Alina",
          from_email: form.email,
          to_email: 'alinbrg.0@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
    ).then(response => {
      setLoading(false);
      showAlert({show: true, text: "Message sent successfully", type: 'success'});
      setTimeout(() => {
          hideAlert();
          setForm({...initialForm});
          setCurrentAnimation('idle');
      }, 3000);

    }).catch((e)=>{
      setLoading(false);
      showAlert({show: true, text: "I didn't receive your message", });
      setCurrentAnimation('idle')

    })
  }
  return (
      <section className={'relative flex lg:flex-row flex-col max-container'}>
        { alert.show && <Alert {...alert} /> }
        <div className={'flex-1 min-w-[50%] flex flex-col'}>
          <h1 className={'head-text'}>
            Get in Touch
          </h1>
          <form
              action=""
              className={'w-full flex flex-col gap-7 mt-14'}
              onSubmit={handleSubmit}
          >
            <label htmlFor="name" className={'text-black-500 font-semibold'}>
              Name
              <input type="text" name={'name'}
                     className={'input'}
                     placeholder={"Jane"}
                     required
                     value={form.name}
                     onChange={handleChanges}
                     onFocus={handleFocus}
                     onBlur={handleBlur}
              />
            </label>
            <label htmlFor="email" className={'text-black-500 font-semibold'}>
              Email
              <input type="email" name={'email'}
                     className={'input'}
                     placeholder={"example@gmail.com"}
                     required
                     value={form.email}
                     onChange={handleChanges}
                     onFocus={handleFocus}
                     onBlur={handleBlur}
              />
            </label>
            <label htmlFor="message" className={'text-black-500 font-semibold'}>
              Your Message
              <textarea name={'message'}
                        className={'textarea'}
                        rows={4}
                        placeholder={"message..."}
                        required
                        value={form.message}
                        onChange={handleChanges}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
              />
            </label>
            <button type={'submit'}
                    className={'btn'}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        <div className={'lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'}>
          <Canvas
              camera={{
                position: [0,0,5],
                fov: 75,
                near: 0.1,
                far: 1000
              }}
          >
            <directionalLight intensity={2.5} position={[0,0,1]} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Fox position={[0.5, 0.85, 0]}
                   rotation={[12.6, -0.6, 0]}
                   scale={[0.5, 0.5, 0.5]}
                   currentAnimation={currentAnimation}
              />
            </Suspense>

          </Canvas>
        </div>
      </section>
  )
}

export default Contact
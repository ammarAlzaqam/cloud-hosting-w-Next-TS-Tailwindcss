import { ToastContainer, Bounce } from "react-toastify";
export default function ReactToast() {
  return (
    <ToastContainer
      position="top-center" //! position of the toast
      autoClose={3000} //! duration in milliseconds
      hideProgressBar={false} // hide progress bar
      newestOnTop={false} // show newest toast on top
      closeOnClick // close toast on click
      rtl={false} // right to left
      limit={5} // limit the number of toast
      draggable // قابلة للسحب
      pauseOnHover // pause on hover
      theme="colored" //! theme of the toast
      transition={Bounce} //! transition of the toast by default Bounce
    />
  );
}

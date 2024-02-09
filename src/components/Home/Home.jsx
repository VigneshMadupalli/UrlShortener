import React, { useState } from "react";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import validURL from "valid-url";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import { urlThunk } from "../../redux/urlSlice";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false); // State to track if the URL is being processed
  const [url, setUrl] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validURL.isWebUri(url)) {
      toast.error("Invalid url", {
        position: "top-right",
        theme: "dark",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setIsProcessing(true); // Start processing
      toast.info("Processing...", {
        position: "top-right",
        theme: "dark",
        autoClose: false, // Prevent the toast from closing automatically
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(urlThunk(url))
        .then((res) => {
          setShortenedURL(res.payload.data.shortURL);
          setStatus(true);
          toast.dismiss(); // Dismiss the 'Processing...' toast
          toast.success("URL shortened successfully!", {
            position: "top-right",
            theme: "dark",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((err) => {
          toast.dismiss(); // Dismiss the 'Processing...' toast
          toast.error("Error shortening URL", {
            position: "top-right",
            theme: "dark",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .finally(() => {
          setIsProcessing(false); // End processing
        });
    }
  };

  const handleReset = () => {
    setUrl("");
    setStatus(false);
    setShortenedURL("");
  };

  const handleCopy = () => {
    toast.success("Copied to Clipboard", {
      position: "top-right",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      <div className="container">
        <h1 className="head">URL SHORTENER</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              className="form-control form-control-lg"
              name="url"
              type="text"
              placeholder="Enter a URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isProcessing} // Disable input while processing
            />
          </div>
          <button className="button" type="submit" disabled={isProcessing}>
            Shorten
          </button>
          <button className="button" type="button" onClick={handleReset} disabled={isProcessing}>
            Reset
          </button>
          <div class="Create-account">
          <Link to="/signup" className="link-one">
            I don't have any account
          </Link>
          </div>
        </form>
        {status && (
          <div className="">
            <h1 className="head">SHORT URL:</h1>
            <div className="">
              <a href={`${"https://url-shortener-wkbn.onrender.com"}${shortenedURL}`}>
                {shortenedURL}
              </a>
            </div>
            <CopyToClipboard
              text={`${"https://url-shortener-wkbn.onrender.com"}${shortenedURL}`}
              onCopy={handleCopy}
            >
              <button className="" disabled={!status || isProcessing}>
                Copy URL to Clipboard
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;

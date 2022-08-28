import React, { useEffect } from "react";

export default function useClickOutside(ref, closeCallback) {
  const handleClose = (e) => {
    if (!ref.current.contains(e.target)) {
      closeCallback();
    }
  };

  useEffect(() => {
    if (ref.current) {
      window.addEventListener("click", handleClose);
    }
  }, [ref]);
}

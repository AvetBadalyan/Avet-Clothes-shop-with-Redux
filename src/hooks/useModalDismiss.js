import { useEffect, useRef } from "react";

/**
 * Shared overlay behaviour for modals and drawers: closes on Escape and
 * locks body scroll while open. Restores both on cleanup.
 *
 * The onClose callback can be an inline arrow function — it is kept in a ref
 * so the effect only re-runs when `open` changes.
 *
 * @param {boolean} open - whether the overlay is currently open
 * @param {() => void} onClose - called when Escape is pressed
 */
export function useModalDismiss(open, onClose) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
}

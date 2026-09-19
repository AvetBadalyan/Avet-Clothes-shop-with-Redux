import { useDispatch, useSelector } from 'react-redux'

// Thin re-exports so components import store hooks from one place.
// (Kept JS; if the project migrates to TS these become typed variants.)
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

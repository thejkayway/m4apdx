export const useFocus = ref => {
  const setFocus = () => {
    ref.current && ref.current.click()
  }

  return setFocus
}

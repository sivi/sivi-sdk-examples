import React from 'react'

function useSessionStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = sessionStorage.getItem(key)
      if (!item) return initialValue

      try {
        return JSON.parse(item)
      } catch {
        return item
      }
    } catch (error) {
      console.error('Error reading sessionStorage key:', key, error)
      return initialValue
    }
  })

  React.useEffect(() => {
    try {
      if (storedValue === null || storedValue === undefined) {
        sessionStorage.removeItem(key)
      } else {
        sessionStorage.setItem(key, JSON.stringify(storedValue))
      }
    } catch (error) {
      console.error('Error setting sessionStorage key:', key, error)
    }
  }, [key, storedValue])

  const removeStoredValue = React.useCallback(() => {
    try {
      sessionStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error('Error removing sessionStorage key:', key, error)
    }
  }, [key, initialValue])

  return [storedValue, setStoredValue, removeStoredValue]
}

export default useSessionStorage

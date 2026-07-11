import React from 'react'
import confetti from 'canvas-confetti'
import { LayoutStateContext } from './LayoutStateContext'

export const LayoutStateProvider = ({ children, registerEventHandler, openDesignVariantEditor }) => {
  const selectedVisualRef = React.useRef(null)
  const [visualShapes, setVisualShapes] = React.useState({})
  const [imageVariantMap, setImageVariantMap] = React.useState({})
  const [currentLayoutId, setCurrentLayoutId] = React.useState(null)

  const initializeLayout = React.useCallback((layoutDef) => {
    if (layoutDef.id !== currentLayoutId) {
      const shapes = {}
      layoutDef.elements.forEach(element => {
        if (element.type === 'visual') {
          shapes[element.id] = { imageUrl: null }
        }
      })
      setVisualShapes(shapes)
      setCurrentLayoutId(layoutDef.id)
    }
  }, [currentLayoutId])

  const setSelectedVisual = React.useCallback((visualId) => {
    selectedVisualRef.current = visualId
  }, [])

  React.useEffect(() => {
    if (registerEventHandler) {
      const handleSiviEvents = async (event, responseCallback) => {
        if (event.type === 'SIVI_WIDGET_EVENT_DESIGN_VARIANT_SELECTED') {
          if (selectedVisualRef.current) {
            const URL = event.data.variantImageUrl + '?timestamp=' + Date.now()
            const variantId = event.data.variantId
            const variantType = event.data.variantType

            setImageVariantMap(prev => ({ ...prev, [URL]: { variantId, variantType } }))
            setVisualShapes(prev => ({ ...prev, [selectedVisualRef.current]: { imageUrl: URL, variantId, variantType } }))

            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#5662EC', '#EF9AB2', '#FFD700', '#FF6B6B', '#4ECDC4']
            })
          } else {
            console.error("No selected visual, please select a visual!")
          }
          responseCallback("done")
        }
      }

      const unregister = registerEventHandler(handleSiviEvents)
      return unregister
    }
  }, [registerEventHandler])

  const handleEditImage = React.useCallback((imageUrl) => {
    const mapping = imageVariantMap[imageUrl]
    if (mapping?.variantId && openDesignVariantEditor) {
      openDesignVariantEditor({ variantId: mapping.variantId, variantType: mapping.variantType })
    }
  }, [imageVariantMap, openDesignVariantEditor])

  return (
    <LayoutStateContext.Provider value={{ visualShapes, imageVariantMap, setSelectedVisual, initializeLayout, handleEditImage }}>
      {children}
    </LayoutStateContext.Provider>
  )
}

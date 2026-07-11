import React from 'react'
import { designSystemOptions } from '../designSystems'
import useSessionStorage from '../hooks/useSessionStorage'

const DesignSystemSelector = ({ onDesignSystemChange }) => {
  const [selectedId, setSelectedId] = useSessionStorage('siviSelectedDesignSystemId', 'resetToDefault')
  const [jsonText, setJsonText] = React.useState('')
  const [jsonError, setJsonError] = React.useState(null)
  const textareaRef = React.useRef(null)

  // Restore jsonText and notify parent when selectedId is loaded from sessionStorage
  React.useEffect(() => {
    const option = designSystemOptions.find((opt) => opt.id === selectedId)
    if (option && !option.resetToDefault) {
      setJsonText(JSON.stringify(option.theme, null, 2))
      onDesignSystemChange(option.theme)
    } else {
      setJsonText('')
      onDesignSystemChange({ resetToDefault: true })
    }
  }, [])

  const isResetToDefault = (option) => !!option?.resetToDefault

  const handleSelectChange = React.useCallback((e) => {
    const id = e.target.value
    const option = designSystemOptions.find((opt) => opt.id === id)
    if (option) {
      setSelectedId(id)
      setJsonError(null)
      if (isResetToDefault(option)) {
        console.log('[DSSelector] Reset to Default selected, calling onDesignSystemChange with', { resetToDefault: true })
        setJsonText('')
        onDesignSystemChange({ resetToDefault: true })
      } else {
        console.log('[DSSelector] Theme selected:', option.id, 'calling onDesignSystemChange with theme')
        const jsonStr = JSON.stringify(option.theme, null, 2)
        setJsonText(jsonStr)
        onDesignSystemChange(option.theme)
      }
    }
  }, [onDesignSystemChange])

  const handleJsonChange = React.useCallback((e) => {
    const text = e.target.value
    setJsonText(text)
    try {
      const parsed = JSON.parse(text)
      setJsonError(null)
      onDesignSystemChange(parsed)
    } catch (err) {
      setJsonError('Invalid JSON: ' + err.message)
    }
  }, [onDesignSystemChange])

  const handleFormat = React.useCallback(() => {
    try {
      const parsed = JSON.parse(jsonText)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonText(formatted)
      setJsonError(null)
    } catch (err) {
      setJsonError('Cannot format: ' + err.message)
    }
  }, [jsonText])

  const selectedOption = designSystemOptions.find((opt) => opt.id === selectedId)
  const showJsonEditor = !isResetToDefault(selectedOption)

  return (
    <div className="design-system-selector">
      <label className="ds-label">Design System</label>
      <select className="ds-dropdown" value={selectedId} onChange={handleSelectChange}>
        {designSystemOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {showJsonEditor && (
        <>
          <div className="ds-editor-header">
            <span className="ds-editor-title">Theme JSON Editor</span>
            <button className="ds-format-btn" onClick={handleFormat}>
              Format
            </button>
          </div>
          <textarea
            ref={textareaRef}
            className={`ds-json-editor ${jsonError ? 'ds-json-error' : ''}`}
            value={jsonText}
            onChange={handleJsonChange}
            spellCheck={false}
            rows={20}
          />
          {jsonError && <div className="ds-error-msg">{jsonError}</div>}
        </>
      )}
      {!showJsonEditor && (
        <p className="ds-default-hint">Using Sivi's built-in default theme.</p>
      )}
    </div>
  )
}

export default DesignSystemSelector

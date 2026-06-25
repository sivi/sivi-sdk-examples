import React from 'react'
import { designSystemOptions } from '../designSystems'

const DesignSystemSelector = ({ onDesignSystemChange }) => {
  const [selectedId, setSelectedId] = React.useState('sivi')
  const [jsonText, setJsonText] = React.useState(() => JSON.stringify(designSystemOptions[0].theme, null, 2))
  const [jsonError, setJsonError] = React.useState(null)
  const textareaRef = React.useRef(null)

  const handleSelectChange = React.useCallback((e) => {
    const id = e.target.value
    const option = designSystemOptions.find((opt) => opt.id === id)
    if (option) {
      setSelectedId(id)
      const jsonStr = JSON.stringify(option.theme, null, 2)
      setJsonText(jsonStr)
      setJsonError(null)
      onDesignSystemChange(option.theme)
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
    </div>
  )
}

export default DesignSystemSelector

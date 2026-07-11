import './App.css'
import React from 'react'
import { LayoutSelector, LayoutPreview } from './components/Layout'
import UserManagement from './components/UserManagement'
import useSiviSDK from './hooks/useSiviSDK'

const USER_FLOWS = [
  { key: 'login-user', label: 'Login / Create User' },
  { key: 'delete-user', label: 'Delete User' },
  { key: 'set-user-credit-limit', label: 'Set Credit Limit' },
]

function App() {
  const [currentLayout, setCurrentLayout] = React.useState(1)
  const [activeTab, setActiveTab] = React.useState('design') // 'design' | 'users'
  const [userFlow, setUserFlow] = React.useState(USER_FLOWS[0].key)

  const {
    isAIStudioOpen,
    handleVisualClick,
    hideAIStudio,
    showAIStudio,
    openDesignVariantEditor,
    registerEventHandler,
    IFRAME_CONTAINER_ID
  } = useSiviSDK()

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Web Editor</h1>
        <nav className="app-nav">
          <button
            className={activeTab === 'design' ? 'active' : ''}
            onClick={() => setActiveTab('design')}
          >
            Design
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
        </nav>
      </header>

      <div className="app-content">
        <aside className="sidebar">
          {isAIStudioOpen ? (
            <div className="visual-panel">
              <div id={IFRAME_CONTAINER_ID} className="iframe-container" />
              <button className="back-button" onClick={hideAIStudio}>
                Back to Home
              </button>
            </div>
          ) : (
            <div className="control-panel">
              <div className="control-content">
                {activeTab === 'design' && (
                  <LayoutSelector
                    currentLayout={currentLayout}
                    onLayoutChange={setCurrentLayout}
                  />
                )}
                {activeTab === 'users' && (
                  <div className="layout-selector">
                    <label className="layout-label">Choose User Management Flow</label>
                    <select
                      className="layout-select"
                      value={userFlow}
                      onChange={(e) => setUserFlow(e.target.value)}
                    >
                      {USER_FLOWS.map((flow) => (
                        <option key={flow.key} value={flow.key}>{flow.label}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {activeTab === 'design' && (
                <button onClick={showAIStudio} className="ai-studio-button">
                  AI Design Studio
                </button>
              )}
            </div>
          )}
        </aside>

        <main className="main-content">
          {activeTab === 'design' && (
            <LayoutPreview
              currentLayout={currentLayout}
              onVisualClick={handleVisualClick}
              registerEventHandler={registerEventHandler}
              openDesignVariantEditor={openDesignVariantEditor}
            />
          )}
          {activeTab === 'users' && (
            <UserManagement flowKey={userFlow} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App

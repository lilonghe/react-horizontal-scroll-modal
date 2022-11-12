import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Index from './index'

document.body.style.margin = '0';
const App = () => {
  const [showModal, setShowModal] = useState(false)
  const styles = {
    width: 800,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <div>
      <div>
        <button onClick={() => setShowModal(true)}>show modal</button>
      </div>
      <Index
        visible={showModal}
        closeNode={<button onClick={() => setShowModal(false)}>Close</button>}>
        <div style={styles}>asa</div>
        <div style={styles}>12</div>
        <div style={styles}>asadfsa</div>
      </Index>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

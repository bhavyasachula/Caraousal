import { useRef } from 'react'

function UploadModal({ onClose, onSubmit }) {
  const urlRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(urlRef.current.value)
    urlRef.current.value = ''
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <p className="modal-title">Add Image</p>

        <form onSubmit={handleSubmit}>
          <label className="modal-label">Image URL</label>
          <input
            type="text"
            ref={urlRef}
            placeholder="https://example.com/photo.jpg"
            className="modal-input"
            autoFocus
          />
          <div className="modal-actions">
            <button type="submit" className="btn-submit">Add to Gallery</button>
            <button type="button" className="btn-close" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadModal
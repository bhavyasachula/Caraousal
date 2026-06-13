function Navbar({ totalImages, currentIndex, onUploadClick }) {
  const paddedIndex = String(currentIndex + 1).padStart(2, '0')
  const paddedTotal = String(totalImages).padStart(2, '0')

  return (
    <nav className="nav-bar">
      <span className="nav-brand">Gallery</span>

      {totalImages > 0 && (
        <div className="nav-center">
          <span className="nav-counter">{paddedIndex}</span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span>{paddedTotal}</span>
        </div>
      )}

      <div className="nav-right">
        <span className="hint-text">← → navigate</span>
        <button className="upload-btn" onClick={onUploadClick}>
          + Upload
        </button>
      </div>
    </nav>
  )
}

export default Navbar
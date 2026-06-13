import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [index, setIndex] = useState(0)
  const [showinput, setShowInput] = useState(false)
  const [fadeKey, setFadeKey] = useState(0)
  const intervalref = useRef(null)
  const [image, setgetImages] = useState([])
  const url = useRef()

  async function getImagesUrl() {
    const response = await axios.get("http://localhost:2000/fetchUrl")
    setgetImages(response.data)
  }

  useEffect(() => {
    getImagesUrl()
  }, [])

  function nextImg() {
    setIndex((index + 1) % image.length)
    setFadeKey(k => k + 1)
  }

  function prevImg() {
    setIndex(index === 0 ? image.length - 1 : index - 1)
    setFadeKey(k => k + 1)
  }

  useEffect(() => {
    intervalref.current = setInterval(() => {
      setIndex(prev => (prev + 1) % image.length)
      setFadeKey(k => k + 1)
    }, 3000)
    return () => clearInterval(intervalref.current)
  }, [image.length])

  const handleInput = () => setShowInput(!showinput)

  const stopSlider = () => clearInterval(intervalref.current)

  const startSlider = () => {
    clearInterval(intervalref.current)
    intervalref.current = setInterval(() => {
      setIndex(prev => (prev + 1) % image.length)
      setFadeKey(k => k + 1)
    }, 2500)
  }

  const handleForm = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:2000/upload", { url: url.current.value })
    } catch (error) {
      console.log(error)
    }
    setShowInput(false)
    url.current.value = ""
  }

  const paddedIndex = String(index + 1).padStart(2, '0')
  const paddedTotal = String(image.length).padStart(2, '0')

  return (
    <>
      <div className="app-root">

        {/* ── NAV ── */}
        <nav className="nav-bar">
          <span className="nav-brand select-none">Gallery</span>

          {image.length > 0 && (
            <div className="nav-center">
              <span className="nav-counter">{paddedIndex}</span>
              <span style={{ opacity: 0.3 }}>/</span>
              <span>{paddedTotal}</span>
            </div>
          )}

          <div className="nav-right">
            <span className="hint-text">← → navigate</span>
            <button className="upload-btn" onClick={handleInput}>
              + Upload
            </button>
          </div>
        </nav>

        {/* ── STAGE ── */}
        <main className="stage">
          <div className="frame-wrap">

            {image.length > 0 ? (
              <>
                <button className="nav-arrow prev" onClick={prevImg} aria-label="Previous">&#8592;</button>
                <button className="nav-arrow next" onClick={nextImg} aria-label="Next">&#8594;</button>

                <div
                  className="image-frame"
                  onMouseEnter={stopSlider}
                  onMouseLeave={startSlider}
                >
                  <img key={fadeKey} src={image[index]} alt={`Slide ${index + 1}`} />
                </div>

                {/* filmstrip dots */}
                <div className="dots-row">
                  {image.map((_, i) => (
                    <button
                      key={i}
                      className={`dot ${i === index ? 'active' : ''}`}
                      onClick={() => { setIndex(i); setFadeKey(k => k + 1) }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">⬚</div>
                <p className="empty-text">No images yet — upload one to begin</p>
              </div>
            )}

          </div>
        </main>

        {/* ── UPLOAD MODAL ── */}
        {showinput && (
          <div className="modal-backdrop" onClick={() => setShowInput(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <p className="modal-title">Add Image</p>

              <form onSubmit={handleForm}>
                <label className="modal-label">Image URL</label>
                <input
                  type="text"
                  ref={url}
                  placeholder="https://example.com/photo.jpg"
                  className="modal-input"
                  autoFocus
                />
                <div className="modal-actions">
                  <button type="submit" className="btn-submit">Add to Gallery</button>
                  <button type="button" className="btn-close" onClick={() => setShowInput(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default App
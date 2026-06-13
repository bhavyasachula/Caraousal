import { useEffect, useState } from 'react'
import './App.css'

import { fetchImages, uploadImage } from './api/imageApi'
import { useSlider } from './hooks/useSlider'

import Navbar      from './components/Navbar'
import ImageFrame  from './components/ImageFrame'
import DotsRow     from './components/DotsRow'
import EmptyState  from './components/EmptyState'
import UploadModal from './components/UploadModal'

function App() {
  const [images, setImages] = useState([])
  const [showModal, setShowModal] = useState(false)

  const { index, fadeKey, nextImg, prevImg, goTo, stopSlider, startSlider } = useSlider(images)

  useEffect(() => {
    fetchImages().then(setImages).catch(console.error)
  }, [])

  const handleUpload = async (url) => {
    try {
      await uploadImage(url)
      const updated = await fetchImages()
      setImages(updated)
    } catch (error) {
      console.error(error)
    } finally {
      setShowModal(false)
    }
  }

  return (
    <div className="app-root">

      <Navbar
        totalImages={images.length}
        currentIndex={index}
        onUploadClick={() => setShowModal(true)}
      />

      <main className="stage">
        <div className="frame-wrap">
          {images.length > 0 ? (
            <>
              <ImageFrame
                src={images[index]}
                index={index}
                fadeKey={fadeKey}
                onPrev={prevImg}
                onNext={nextImg}
                onMouseEnter={stopSlider}
                onMouseLeave={startSlider}
              />
              <DotsRow
                total={images.length}
                activeIndex={index}
                onDotClick={goTo}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onSubmit={handleUpload}
        />
      )}

    </div>
  )
}

export default App
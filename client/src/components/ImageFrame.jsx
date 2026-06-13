function ImageFrame({ src, index, fadeKey, onPrev, onNext, onMouseEnter, onMouseLeave }) {
  return (
    <>
      <button className="nav-arrow prev" onClick={onPrev} aria-label="Previous">
        &#8592;
      </button>

      <div
        className="image-frame"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <img key={fadeKey} src={src} alt={`Slide ${index + 1}`} />
      </div>

      <button className="nav-arrow next" onClick={onNext} aria-label="Next">
        &#8594;
      </button>
    </>
  )
}

export default ImageFrame
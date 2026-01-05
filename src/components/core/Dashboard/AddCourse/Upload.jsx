import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )

  const inputRef = useRef(null)

  // onDrop handler
  const onDrop = (acceptedFiles) => {
    console.log("onDrop called, files:", acceptedFiles)
    const file = acceptedFiles && acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    // disableClick: true // <- we keep default (false) so dropzone tries to handle click,
    // but we'll also add fallback click below
  })

  // preview creation
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

useEffect(() => {
  register(name, {
    required: !editData, // 👈 EDIT MODE me required false
  })
}, [register, editData, name])

  useEffect(() => {
    setValue(name, selectedFile)
    // eslint-disable-next-line
  }, [selectedFile, setValue])

  useEffect(() => {
  if (editData && !selectedFile) {
    // tell react-hook-form that thumbnail already exists
    setValue(name, editData)
    }
  }, [editData, name, selectedFile, setValue])

  // fallback click: call inputRef.click() if dropzone wrapper click doesn't open dialog
  const handleWrapperClickFallback = (event) => {
    try {
      // small log to debug which event fired
      console.log("wrapper clicked. isDragActive:", isDragActive)
      // If native input exists, trigger it
      if (inputRef && inputRef.current) {
        // ensure it's not disabled
        if (!inputRef.current.disabled) {
          inputRef.current.click()
        } else {
          console.warn("file input is disabled")
        }
      } else {
        console.warn("inputRef.current is null")
      }
    } catch (err) {
      console.error("fallback click error:", err)
    }
  }

  // useEffect(() => {
  //   if (viewData) {
  //     setPreviewSource(viewData)
  //   } else if (editData) {
  //     setPreviewSource(editData)
  //   }
  // }, [viewData, editData])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      {/* MAIN DROPZONE WRAPPER */}
      <div
        {...getRootProps()}
        // Add fallback click explicitly. If getRootProps already supplies an onClick, it'll run too.
        onClick={(e) => {
          // Allow dropzone's own handler to run, but also call fallback (safe)
          handleWrapperClickFallback(e)
        }}
        // accessibility + ensure it can receive clicks
        tabIndex={0}
        role="button"
        aria-label={`Upload ${video ? "video" : "image"} for ${label}`}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        style={{ outline: "none" }}
      >
        {/* Input is always present and wired to dropzone */}
        {/* We keep input visually hidden but available for clicks */}
        <input
          {...getInputProps()}
          ref={inputRef}
          // style kept minimal; dropzone may set hidden; we keep display none to avoid duplicate UI
          style={{ display: "none" }}
        />

        {/* PREVIEW */}
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
                // ensure image doesn't intercept pointer events that block wrapper onClick
                style={{ pointerEvents: "none" }}
              />
            ) : (
              <div style={{ pointerEvents: "none" }}>
                <Player aspectRatio="16:9" playsInline src={previewSource} />
              </div>
            )}

            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  // stop propagation so this button click doesn't retrigger file dialog
                  e.stopPropagation()
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          // DEFAULT UI
          <div className="flex w-full flex-col items-center p-6 pointer-events-none">
            {/* wrapper has pointer-events, children set to none so wrapper gets the clicks */}
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800 pointer-events-auto">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200 pointer-events-auto">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a file
            </p>

            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200 pointer-events-auto">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024 x 576</li>
            </ul>
          </div>
        )}
      </div>

      {/* Error */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}





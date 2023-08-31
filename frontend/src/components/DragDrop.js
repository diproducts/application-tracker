import { useState } from "react";

const DragDrop = ({ mode }) => {
    const title = mode === "resume"
        ? "upload the resume used for application:"
        : "upload the cover letter used for application:"

    const background = mode === "resume"
        ? "linear-gradient(136deg, #E2EEFF, rgba(151, 193, 255, 0.02))"
        : "linear-gradient(136deg, #EAE2FF 0%, rgba(165, 151, 255, 0.02) 100%)"

    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileUpload = () => {
        if (selectedFile) {

        } else {
            console.log('No file selected for upload.');
        }
    };

    const handleChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setSelectedFile(file)
        }
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    return (
        <div className="upload-container">
            <h3 className="upload-title">{title}</h3>
            <div
                className={`drag-drop-area ${isDragging && "drag-over"}`}
                style={{ background }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="input-file"
                    className="upload-input"
                    onInput={(event) => handleChange(event)} />
                <label className="upload-label" htmlFor="input-file">upload</label>
                <p>or drag & drop here</p>
                {selectedFile && <p>Selected file: {selectedFile.name}</p>}
            </div>
        </div>
    )
}

export default DragDrop;
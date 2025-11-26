import { uploadImage } from "@/services/uploadImage";
import { useEffect, useRef, useState } from "react";

type ImageInputProps = {
    imageFileName: string | null;
    setImageFileName: (fileName: string | null) => void;
    imageError: string | null;
    setImageError: React.Dispatch<React.SetStateAction<string | null>>
}

export const ImageInput = ({ imageFileName: uploadedFileName, setImageFileName: setUploadedFileName, imageError: uploadError, setImageError: setUploadError }: ImageInputProps) => {
    console.log("ImageInput Rendered with:", { uploadedFileName, uploadError });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const isDisabled = !selectedImage;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            if (selectedImage) {
                dataTransfer.items.add(selectedImage);
                inputRef.current.files = dataTransfer.files;
            } else {
                inputRef.current.value = ''
            }

        }
    }, [selectedImage]);

    const onUploadClick = async () => {
        if (!selectedImage) {
            setUploadError("No image selected");
            setUploadedFileName(null);
            return;
        }
        else {
            try {
                const fileName = await uploadImage(selectedImage);
                setUploadedFileName(fileName);
                setUploadError(null);

            } catch (err) {
                setUploadError("Failed Upload Image");
                setUploadedFileName(null);
            }
        }
    }

    const onChangeFileClick = () => {
        setSelectedImage(null);
        setUploadedFileName(null);
        setUploadError(null);
    }

    return (
        <div>
            <label>Upload Image:
                <input type="file" accept="image/*" ref={inputRef} disabled={!!uploadedFileName} onChange={(e) => {
                    if (!e.target.files?.length) {
                        setSelectedImage(null);
                    } else {
                        setSelectedImage(e.target.files![0]);
                    }
                }}></input>
            </label>
            {
                uploadedFileName === null ?
                    <button disabled={isDisabled} className="btn upload-btn" onClick={onUploadClick}>
                        📤 Upload
                    </button> :
                    <button className="btn change-btn" onClick={onChangeFileClick}>
                        🔄 Change Image
                    </button>
            }

            {uploadError && (<div className="error">{uploadError}</div>)}
            {uploadedFileName && (<div className="success">Uploaded: {uploadedFileName}</div>)}
        </div >
    );
}
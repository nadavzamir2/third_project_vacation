import { uploadImage } from "@/services/uploadImage";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/joy";

const placeholderSrc = `${import.meta.env.VITE_API_BASE_URL}/images/uploadImagePlaceholder.png`;

type ImageInputProps = {
    imageFileName: string | null;
    setImageFileName: (fileName: string | null) => void;
    imageError: string | null;
    setImageError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ImageInput = ({
    imageFileName: uploadedFileName,
    setImageFileName: setUploadedFileName,
    imageError: uploadError,
    setImageError: setUploadError,
    
}: ImageInputProps) => {
    console.log("ImageInput Rendered with:", { uploadedFileName, uploadError });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const isDisabled = !selectedImage;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (uploadedFileName) {
            setPreviewUrl(`${import.meta.env.VITE_API_BASE_URL}${uploadedFileName}`);
        } else if (selectedImage) {
            const url = URL.createObjectURL(selectedImage);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [selectedImage, uploadedFileName]);

    useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            if (selectedImage) {
                setUploadError(null);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) {
            setSelectedImage(null);
        } else {
            setSelectedImage(e.target.files[0]);
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <label style={{ marginTop: '12px' }}>Upload Image:</label>

            <Box
                component="label"
                sx={{
                    width: 300,
                    height: 300,
                    border: '2px dashed',
                    borderColor: uploadedFileName ? 'success.500' : 'neutral.300',
                    borderRadius: 'md',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: uploadedFileName ? 'not-allowed' : 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    '&:hover': uploadedFileName ? {} : {
                        borderColor: 'primary.500',
                        backgroundColor: 'background.level1',
                    },
                    opacity: uploadedFileName ? 0.6 : 1,
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    disabled={!!uploadedFileName}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <Box
                    component="img"
                    src={previewUrl || placeholderSrc}
                    onError={() => {
                        setUploadError("Failed to load image");
                        setPreviewUrl(placeholderSrc);
                    }}
                    alt={previewUrl ? "Selected image preview" : uploadedFileName ? "Current image" : "Upload placeholder"}
                    sx={{
                        width: '100%',
                        height: '100%',

                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
                {!uploadedFileName ? (
                    <Button
                    className="btn upload-btn"
                        disabled={isDisabled}
                        onClick={onUploadClick}
                        startDecorator="📤"
                        color="primary"
                        variant="solid"
                    >
                        Upload
                    </Button>
                ) : (
                    <Button className="btn change-btn"
                        onClick={onChangeFileClick}
                        startDecorator="🔄"
                        variant="outlined"
                    >
                        Change Image
                    </Button>
                )}
            </Box>

            {uploadError && (
                <Typography level="body-sm" color="danger">
                    {uploadError}
                </Typography>
            )}
        </Box>
    );
}
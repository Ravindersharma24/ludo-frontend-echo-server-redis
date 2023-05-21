import { Lightbox } from "react-modal-image";
import { useState } from "react";

function FilePicker({
    handleFileSelect,
    selectedFile,
    label,
    name,
    clearFile,
}) {
    const [imageModal, setImageModal] = useState(false);
    const handleImageModal = () => {
        const image = selectedFile.type.includes("image")
            ? URL.createObjectURL(selectedFile)
            : false;
        setImageModal(image);
    };
    const closeImageModal = () => {
        setImageModal(false);
    };

    return (
        <>
            {imageModal && (
                <Lightbox
                    medium={imageModal}
                    large={imageModal}
                    onClose={closeImageModal}
                />
            )}
            <div style={{}} className="doc-upload mt-2">
                <input
                    onChange={handleFileSelect}
                    id={name}
                    name={name}
                    type="file"
                    accept="image/*"
                />
                {!(selectedFile instanceof File) ? (
                    <div className="cxy flex-column position-absolute">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/file-uploader-icon.png`}
                            width="17px"
                            alt=""
                        />
                        <div className="sideNav-text mt-2">{label}</div>
                    </div>
                ) : (
                    <div className="uploaded">
                        <button
                            type="button"
                            style={{ padding: "0px" }}
                            className="btn btn-light"
                            data-toggle="modal"
                            data-target="#exampleModal"
                        >
                            <img
                                onClick={handleImageModal}
                                src={
                                    selectedFile.type.includes("image")
                                        ? URL.createObjectURL(selectedFile)
                                        : `${process.env.PUBLIC_URL}/img/file-icon.png`
                                }
                                width="56px"
                                alt=""
                                style={{ marginRight: "20px" }}
                            />
                        </button>

                        <div
                            className="d-flex flex-column w-80 fileDetails"
                            onClick={handleImageModal}
                        >
                            <span style={{ height: "auto" }} className="name">
                                {selectedFile.name}
                            </span>
                            <span className="size">{(selectedFile.size / 1000000).toFixed(2)} MB</span>
                        </div>
                        <div
                            onClick={() => {
                                clearFile(name);
                            }}
                            className="image-block"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/img/global-cross.png`}
                                width="10px"
                                alt=""
                            />
                        </div>
                    </div>
                )}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img src="" width="100px" id="modalImage" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilePicker;

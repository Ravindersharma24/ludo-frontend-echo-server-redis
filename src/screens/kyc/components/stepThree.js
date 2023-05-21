import FilePicker from "../../common/components/filePicker";
function StepThree({
    formInputs: { docType, docNumber, frontPhoto, backPhoto },
    handleFormInput,
    handleClearFile,
}) {
    return (
        <>
            <p className="mt-2" style={{ color: "rgb(149, 149, 149)" }}>
                Upload photo of <span className="text-dark" style={{ fontWeight: 'bold' }}>{docType.name}</span>
                <span className="text-dark" style={{ fontWeight: 'bold' }}> : {docNumber}</span>
            </p>
            <br />
            <div style={{ marginTop: "10px" }}>
                <div className="mytext" style={{ fontSize: "1.1em" }}>
                    Ensure that your{" "}
                    <span style={{ fontWeight: 700 }}>Name</span>,
                    <span style={{ fontWeight: 700 }}> Birthday</span> and
                    <span style={{ fontWeight: 700 }}>
                        {" "}
                        Document number
                    </span>{" "}
                    are clearly visible in the document photo.
                </div>
            </div>
            <FilePicker
                key={`frontPhoto`}
                handleFileSelect={handleFormInput}
                selectedFile={frontPhoto}
                label={`Upload Front Photo`}
                name={"frontPhoto"}
                clearFile={handleClearFile}
            />

            <FilePicker
                key={`backPhoto`}
                handleFileSelect={handleFormInput}
                selectedFile={backPhoto}
                label={`Upload Back Photo`}
                name={"backPhoto"}
                clearFile={handleClearFile}
            />
        </>
    );
}

export default StepThree;

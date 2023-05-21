import { useSelector } from "react-redux";
import Dropdown from "../../common/components/dropdown";
function StepOne({
    formInputs: { docType, docNumber },
    handleSetDt,
    handleFormInput,
    toggleDropdown,
    dropdownVisible,
}) {
    const documentTypes = useSelector((state) => state.user.documentTypes);
    return (
        <>
            <p className="mt-2" style={{ color: "rgb(149, 149, 149)" }}>
                You need to submit a document that shows that you are
                <span style={{ fontWeight: 500 }}>above 18 years</span> of age
                and not a resident of
                <span style={{ fontWeight: 500 }}>
                    {" "}
                    Assam, Odisha, Sikkim, Nagaland, Telangana, Andhra Pradesh,
                    Tamil Nadu and Karnataka.
                </span>
            </p>
            <br />
            <Dropdown
                label={`Document Type`}
                toggleDropdown={toggleDropdown}
                selectedOption={docType}
                dropdownVisible={dropdownVisible}
                headerText={`Select Document`}
                options={documentTypes}
                handleSelectOption={handleSetDt}
            />
            <div style={{ marginTop: "50px" }}>
                <div
                    className={`kyc-doc-input ${
                        docType.id === 0 ? "hidden" : ""
                    }`}
                >
                    <input
                        onChange={handleFormInput}
                        type="text"
                        name="docNumber"
                        autoComplete="off"
                        value={docNumber}
                    />
                    <div className="label">Enter {docType.name} Number</div>
                    {docType.id === 1 &&
                    docNumber.length &&
                    docNumber.length != 12 ? (
                        <div className="invalid">Must be 12 characters</div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}

export default StepOne;

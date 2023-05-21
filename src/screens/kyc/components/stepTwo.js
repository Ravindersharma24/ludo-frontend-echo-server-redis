import { useSelector } from "react-redux";
import Dropdown from "../../common/components/dropdown";

function StepTwo({
    formInputs: { docType, docNumber, firstName, lastName, dob, state },
    handleFormInput,
    toggleDropdown,
    dropdownVisible,
    handleSetState,
}) {
    const pad2 = (n) => {
        return (n < 10 ? "0" : "") + n;
    };
    const states = useSelector((state) => state.user.states);
    var today = new Date();
    var month = pad2(today.getMonth() + 1); //months (0-11)
    var day = pad2(today.getDate()); //day (1-31)
    var year = today.getFullYear() - 18;
    const maxDate = `${year}-${month}-${day}`;
    return (
        <>
            <p className="mt-2" style={{ color: "rgb(149, 149, 149)" }}>
                Enter details of <span className="text-dark" style={{ fontWeight: 'bold' }}>{docType.name}</span>
                <span className="text-dark" style={{ fontWeight: 'bold' }}> : {docNumber}</span>
            </p>
            <br />
            <div style={{ marginTop: "10px" }}>
                <div className="kyc-doc-input">
                    <input
                        onChange={handleFormInput}
                        type="text"
                        name="firstName"
                        autoComplete="off"
                        value={firstName}
                    />
                    <div className="label">First Name</div>
                </div>
                <br />
                <div className="kyc-doc-input mt-4">
                    <input
                        onChange={handleFormInput}
                        type="text"
                        name="lastName"
                        autoComplete="off"
                        value={lastName}
                    />
                    <div className="label">Last Name</div>
                </div>
                <br />
                <div className="kyc-doc-input mt-4">
                    <div className="label">Date of Birth</div>
                    <input
                        onChange={handleFormInput}
                        id="dob"
                        name="dob"
                        max={maxDate}
                        label="Date of Birth"
                        type="date"
                        className="input-date"
                        value={dob}
                    />
                    {dob > maxDate ? (
                        <div className="invalid">
                            User must be 18 years old.
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <Dropdown
                    label={`State`}
                    toggleDropdown={toggleDropdown}
                    selectedOption={state || "Rajasthan"}
                    dropdownVisible={dropdownVisible}
                    headerText={`Select State`}
                    options={states}
                    handleSelectOption={handleSetState}
                />
            </div>
        </>
    );
}

export default StepTwo;

function Dropdown({ label, toggleDropdown, selectedOption, dropdownVisible, headerText, options, handleSelectOption }) {
    return (
        <>
            <div style={{ marginTop: '30px' }}>
                <span style={{ color: "rgb(149, 149, 149)", fontWeight: 500 }}
                >{label}</span>
                <div className="kyc-input mt-2" onClick={toggleDropdown}>
                    <div className="kyc-input-text">{selectedOption.name}</div>
                    <div className="arrow cxy">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronDown.png`}
                            width="15px"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="kyc-select">
                <div className="overlay" onClick={toggleDropdown} style={dropdownVisible ? { pointerEvents: 'auto', opacity: '0.87' } : {}}></div>
                <div
                    className={`box kyc-select-${dropdownVisible ? 'enter' : 'exit'}-done`}
                    style={{ bottom: '0px', position: 'absolute' }}
                >
                    <div className="bg-white">
                        <div className="header">
                            <div className="d-flex position-relative align-items-center">
                                <div className="header-text">{headerText}</div>
                            </div>
                        </div>
                        <div style={{ paddingTop: '80px' }}>
                            {
                                options.map((item, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className={`option d-flex align-items-center option ${selectedOption.id === item.id ? 'option-selected' : ''}`}
                                            onClick={() => handleSelectOption(item)}
                                        >
                                            <div className="option-text">{item.name}</div>
                                            <div className="option-tick">
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/img/select-blue-checkIcon.png`}
                                                    width="15px"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dropdown;

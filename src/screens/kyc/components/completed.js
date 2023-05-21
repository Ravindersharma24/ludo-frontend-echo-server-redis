import { useSelector } from "react-redux";

function Completed() {
    const kycStatus = useSelector((state) => state.user.details.kyc);

    return kycStatus !== false && kycStatus == 0 ? (
        <>
            <div className="cxy flex-column mx-5 mt-5">
                <picture
                    className="ml-4"
                    style={{ width: "80%", height: "auto" }}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/img/kyc-in-process.png`}
                        alt=""
                        style={{ maxWidth: "100%" }}
                    />
                </picture>
                <div className="font-11 mt-4">
                    Your KYC is in{" "}
                    <span className="text-danger">Validation</span>
                </div>
                <div className="my-3 text-center" style={{ width: "100%" }}>
                    <div className="footer-text" style={{ fontSize: "0.9em" }}>
                        We are verifying your details. You will be notified when
                        your KYC is completed.
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            <div className="cxy flex-column mx-5 mt-5">
                <picture
                    className="ml-4"
                    style={{ width: "80%", height: "auto" }}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/img/kyc-verified.png`}
                        alt=""
                        style={{ maxWidth: "100%" }}
                    />
                </picture>
                <div className="font-11 mt-4">
                    Your KYC is <span className="text-success">Verified</span>
                </div>
            </div>
        </>
    );
}

export default Completed;

import { Link } from "react-router-dom";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";

function RefundCancellationPolicy() {
    return (
        <>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="context m-3 px-3">
                    <h1 className="title">Refund Policy</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <span>/</span>
                        <li className="active">
                            <a href="#0">Refund Policy</a>
                        </li>
                    </ul>
                    <div className="content pb-5">
                        <h4><strong>Refund Policy</strong></h4>
                        <p>
                            Thanks for being a patron with JJ Ludo. If you are
                            not entirely satisfied with your subscription, we
                            are here to help.
                        </p>
                        <p>Refund</p>
                        <p>
                            Once we receive your Refund request, we will inspect
                            it and notify you on the status of your refund.
                        </p>
                        <p>
                            If your refund request is approved, we will initiate
                            a refund to your credit card (or original method of
                            payment) within 7 working days. You will receive the
                            credit within a certain amount of days, depending on
                            your card issuer's policies.
                        </p>
                        <p>
                            In case of unforeseen technical glitch, JJ Ludo would
                            refund subscription upon reviewing the complaint.
                            Final decision lies with the company.
                        </p>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}
export default RefundCancellationPolicy;

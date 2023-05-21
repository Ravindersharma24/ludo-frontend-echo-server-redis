import { Link } from "react-router-dom";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";

function ContactUs() {
    return (
        <>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="context m-3 contact">
                    <h1 className="title">Contact Us</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <span>/</span>
                        <li className="active">
                            <a href="#0">Contact Us</a>
                        </li>
                    </ul>
                    <div className="content pb-5">
                        <p>
                            For any kind of queries, please contact us on the
                            below mention details
                        </p>
                        <h4><strong>CONTACT:</strong></h4>
                        <ul className="pb-3 pt-1">
                            <li className="mb-2">
                                <Link to="/">www.jjludo.com</Link>
                            </li>
                            <li className="mb-2">
                                <a href="mailto:support@jjludo.com">
                                    support@jjludo.com
                                </a>
                            </li>
                        </ul>
                        <h4 className="pb-2"><strong>Operational Address:</strong></h4>
                        <p className="pb-4">
                            <span className="d-block">
                                Gazick Private Limited,
                            </span>
                            <span className="d-block">
                                G-11, Shikhar Bhavan, Near Pushkrani Park,
                            </span>{" "}
                            <span className="d-block">Satna, M.P - 485001</span>
                        </p>
                        <h4><strong>To submit your game write to us:</strong></h4>
                        <p>
                            <a href="#0">business@jjludo.com</a>
                        </p>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}
export default ContactUs;

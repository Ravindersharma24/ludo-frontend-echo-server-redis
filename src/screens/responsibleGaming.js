import { Link } from "react-router-dom";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";

function ResponsibleGaming() {
    return (
        <>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="context m-3 contact px-3">
                    <h1 className="title"><strong>Responsible Gaming</strong></h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <span>/</span>
                        <li className="active">
                            <a href="#0">Responsible Gaming</a>
                        </li>
                    </ul>
                    <div className="content pb-5">
                        <h4><strong>Our Mission Statement</strong></h4>
                        <p> Play Games 24x7 encourages all its players to play
                            responsibly. We are committed to helping players who
                            wish to stop playing or who wish to limit the amount
                            that they play.</p>
                        <h4>Ensure Responsible Play</h4>
                        <ul className="pl-3">
                            <li>
                                Players must be 18 years of age to play skill
                                games for real money.
                            </li>
                            <li>
                                Players can request for their accounts to be
                                temporarily blocked, if they want to
                                self-exclude themselves for some time.
                            </li>
                            <li>
                                Players can follow our ‘Guide to Responsible
                                Play’ in order to keep a check on their play
                                behaviour.
                            </li>
                        </ul>
                        <h4><strong>Guide to Responsible Play</strong></h4>
                        <ul className="pl-3">
                            <li>Sometimes, players may find it hard to recognize
                                that their online play is getting out of control. A
                                common reaction is to minimize, hide or deny such
                                problems and the harm it could be causing. Some
                                people will lie to themselves about how much money
                                or time is being spent on online playing.</li>
                        </ul>
                        <p>
                            <strong className="pb-3 d-block">
                                Following are some of the best practices to help
                                you play responsibly:
                            </strong>
                            <ul className="pl-3">
                                <li>
                                    Play in moderation and only for
                                    entertainment.
                                </li>
                                <li>
                                    Do not play to make money or escape
                                    problems.
                                </li>
                                <li>Never chase your losses while playing.</li>
                                <li>Set aside an entertainment budget.</li>
                                <li>
                                    Keep track of the time and monitor the
                                    amount of money you spend.
                                </li>
                                <li>
                                    Use the Add Cash limit option to help
                                    control the amount you spend.
                                </li>
                                <li>
                                    Balance the time you spend on playing online
                                    games with other leisure activities.
                                </li>
                            </ul>
                        </p>
                        <h4>
                            Recognize whether you are not playing responsibly
                        </h4>
                        <p>
                            <span>Do you do any of the following:</span>
                            <ul className="pl-3">
                                <li>
                                    Do you spend more money and time than you
                                    intend to playing games?
                                </li>
                                <li>
                                    Do you feel guilty or ashamed while game
                                    playing habits?
                                </li>
                                <li>Do you try to win back your losses?</li>
                                <li>
                                    Do you miss important things in life such as
                                    family time, work, leisure activities,
                                    appointments to play games?
                                </li>
                                <li>
                                    Do you think about your gameplay all day
                                    long?
                                </li>
                                <li>
                                    Do you have arguments with friends or family
                                    about you playing habits?
                                </li>
                                <li>
                                    Do you lie or steal to get money to play
                                    games?
                                </li>
                                <li>
                                    Do you have debts or struggled financially
                                    to play games?
                                </li>
                                <li>
                                    Has playing games negatively impacted your
                                    professional life?
                                </li>
                                <li>
                                    Do you have relationship problems like
                                    arguments, disagreements or loss of
                                    Connection with friends and family?
                                </li>
                                <li>
                                    Have you experienced an increase in stress,
                                    depression or panic attacks due to playing
                                    games?
                                </li>
                            </ul>
                        </p>
                        <h4>Game Prudence</h4>
                        <p>
                            Game Prudence is an independent body which aims to
                            help players, playing on skill-gaming websites, in
                            incorporating responsible gaming habits into their
                            lifestyles. Game Prudence is a non-judgemental
                            platform providing you with private, confidential
                            and free of cost psychological counselling, wherein
                            you can identify how healthy your gaming habits are
                            as well as receive professional guidance from
                            experts. All Game Prudence experts are certified by
                            iGaming Academy.
                        </p>
                        <h4>Get Help from Game Prudence</h4>
                        <p>
                            If you suspect that you are facing any of the issues
                            mentioned above and as a result have not been
                            playing responsibly, or if you know someone who is
                            facing similar issues, kindly seek help immediately.
                            You can get help by registering your request at
                            Game Prudence.
                        </p>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}
export default ResponsibleGaming;

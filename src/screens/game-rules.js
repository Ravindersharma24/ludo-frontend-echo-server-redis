import { Link } from "react-router-dom";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";

function GameRules() {
    return (
        <>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="context m-3 privacy pb-5">
                    <h2 className="title"><strong>Ludo Rules</strong></h2>
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <span>/</span>
                        <li className="active">
                            <a href="#0">Game Rules</a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-12">
                            <h4><strong>Game Rules:</strong></h4>
                            <ol className="rules-list pl-3">
                                <li>
                                    On winning both players have to update their
                                    results in following manner: If you have won
                                    the battle, select I Won option and upload
                                    winning screenshot of the game. If you have
                                    lost the battle, select I Lost option. If
                                    your battle is not started and your opponent
                                    doesn't want to play, select Cancel option.
                                </li>
                                <li>
                                    A player must have to record every game, and
                                    if any player is hacking or cheating in a
                                    game, please contact support with video
                                    proof.
                                </li>
                                <li>
                                    If your game is not started, and if you
                                    haven't played a single move yourself,
                                    please show us a recording of the game as
                                    proof. The game will be canceled only if you
                                    have recorded.
                                </li>
                                <li>
                                    If you don't have any proof against player
                                    cheating and error in the game, then you
                                    will be considered as lost for a particular
                                    battle.
                                </li>
                                <li>
                                    If you haven't moved a single pawn or no
                                    pawn is open yet, i.e. all pawns are at
                                    home, then your game will be cancelled.
                                </li>
                                <li>
                                    If your opponent leaves match purposely in
                                    starting or initial game, and the opponent
                                    doesn't have any valid proof of
                                    cancellation, you will be awarded a 50% win.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h4>Commission Rates:</h4>
                            <ol className="rules-list pl-3">
                                <li>
                                    Battle below ₹250, <strong>10% commission</strong> will be
                                    charged on battle amount.
                                </li>
                                <li>
                                    Battle between ₹250 to ₹500, <strong>flat ₹25</strong>
                                    commission will be charged.
                                </li>
                                <li>
                                    Battle above ₹500, <strong>5% commission</strong>  will be
                                    charged on battle amount.
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}
export default GameRules;

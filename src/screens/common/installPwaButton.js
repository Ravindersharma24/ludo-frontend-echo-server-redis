import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/fontawesome-free-solid";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { parseInJSON } from "../../common/utils";
import { useEffect, useState } from "react";
function PwaInstall() {
    useEffect(() => {
        if (
            /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            setIsMobile(true);
            checkBrowser();
        }
        else {
            setIsMobile(false);
        }
    }, []);

    function checkBrowser() {
        // Get the user-agent string
        let userAgentString =
            navigator.userAgent;

        // Detect Chrome
        let chromeAgent =
            userAgentString.indexOf("Chrome") > -1;

        // Detect Internet Explorer
        let IExplorerAgent =
            userAgentString.indexOf("MSIE") > -1 ||
            userAgentString.indexOf("rv:") > -1;

        // Detect Firefox
        let firefoxAgent =
            userAgentString.indexOf("Firefox") > -1;

        // Detect Safari
        let safariAgent =
            userAgentString.indexOf("Safari") > -1;

        // Detect Opera
        let operaAgent =
            userAgentString.indexOf("OP") > -1;

        if (chromeAgent) {
            // console.log("chrome", chromeAgent);
            const checkIncognito = async () => {
                const { quota } = await navigator.storage.estimate();
                if (quota < performance.memory.jsHeapSizeLimit) {
                    // console.log("gotcha: this is incognito tab"); //quota = 1102885027
                    setIsMobile(false);
                } else {
                    // console.log("this is a normal tab"); //quota = 296630877388
                    setIsMobile(true);
                }
            }
            checkIncognito();
        }
        if (firefoxAgent) {
            // console.log("firefox", firefoxAgent);
            var db = indexedDB.open("test");
            db.onerror = function () {
                // console.log("open")
                setIsMobile(false)
            };
            db.onsuccess = function () {
                // console.log("closed")
                setIsMobile(true)
            };
        }

        if (IExplorerAgent) {
            if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) {
                // console.log("private");
                setIsMobile(false)
            } else {
                // console.log("not private");
                setIsMobile(true)
            }
        }
        if (safariAgent) {
            // console.log("safari", safariAgent);
            var checkIncognito = parseInJSON(localStorage.getItem("test"));
            if (checkIncognito) {
                // console.log("normal mode");
                setIsMobile(true)
            } else {
                // console.log("incognito mode");
                setIsMobile(false)
            }
        }

    }
    const [isMobile, setIsMobile] = useState(false);
    let deferredPrompt = useSelector((state) => state.ui.beforeinstallprompt);
    const installPwa = async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                deferredPrompt(null);
            }
        }
    };
    return (
        <>
            {isMobile ? (
                <div className="pwaWrapper">
                    <button
                        className="btn btn-dark btn-sm"
                        onClick={() => installPwa()}
                    >
                        <FontAwesomeIcon icon={faAndroid} color="red" />
                        <span className="px-3 text">DOWNLOAD OUR APP</span>
                        <FontAwesomeIcon icon={faDownload} color="red" />
                    </button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
export default PwaInstall;

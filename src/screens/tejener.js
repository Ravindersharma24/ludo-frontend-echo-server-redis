// Libs
import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { css } from "emotion";
import tinycolor from "tinycolor2";
import InfiniteScroll from "react-infinite-scroller";

// Components
import StaffCard from "./StaffCard";
import Spinner from "../../ui/Spinner";

// Actions
import { addToast } from "../../../actions/uiActions";

// Styles
import colors from "../../../styles/colors";
import { breakPoint } from "../../../styles/breakPoints";

const StaffSelection = (props) => {
  const booking = props.booking;
  const {
    appliedShifts,
    selectedShifts,
    unwantedShifts,
    doubleBookedShifts,
    grayShifts,
    sickShifts,
    removedShifts,
    bookedStaff,
    loading,
  } = props.shifts;

  const itemsPerPage = 10;
  const [loadedRecords, setLoadedRecords] = useState({selectedShifts: itemsPerPage, appliedShifts: itemsPerPage});

  // Redux state
  const { user, takenOverCorporation } = useSelector((state) => state.auth);
  const loader = (title = "Indlæser...") => {
    console.log("loader")
    return (
      <Spinner
        title={title}
        style={{ margin: "2rem 0" }}
        key={0}
      />
    )
  }

  const loadMore = (type) => {
    console.log("loadmore", loadedRecords)
    console.log("condition", loadedRecords[type] >= props.shifts[type].length)
      if (loadedRecords[type] >= props.shifts[type].length) {
        console.log("dont load more", [type])

          setLoadedRecords({...loadedRecords, [type]: 100});
        } else {
          console.log("load more", [type])

          setTimeout(() =>  setLoadedRecords({...loadedRecords, [type]: loadedRecords[type]+itemsPerPage}), 2000);
        }
  };
  const renderShifts = (shifts, type, card_type) => {
    console.log("renderShifts", loadedRecords[type])
    var items = [];
    for (var i = 0; i < loadedRecords[type]; i++) {
      shifts[i] && items.push(
        <StaffCard
          key={i}
          isAdmin={card_type == "applied" ? user.is_admin || takenOverCorporation : false}
          staffType={booking.staff_type}
          showRemove={card_type == "applied" ? true : false}
          setShift={props.updateShiftStatus}
          shift={shifts[i]}
          type={card_type}
          showAddToApplied={card_type == "unwanted" ? true : false}
        />
      );
    }
    return items;
  }
  return (
    <div className={componentStyle(colors)}>
      <div className="container-staff-selection">
        <div className="selected-container">
          {loading && (
            <div className="loading-container">
              <Spinner />
            </div>
          )}
          {!loading && (
            <>
              {booking.number_of_staff > 0 ? (
                <p className="title">{`BOOKET: (${bookedStaff}/${booking.number_of_staff})`}</p>
              ) : (
                <p className="title">{`BOOKET:`}</p>
              )}
              {/* <InfiniteScroll
                key={'selectedShifts'}
                pageStart={0}
                loadMore={() => loadMore('selectedShifts')}
                hasMore={loadedRecords.selectedShifts ? true : false}
                loader={loader()}
                useWindow={false}
              >
              { renderShifts(selectedShifts, 'selectedShifts', "selected") }
              </InfiniteScroll> */}

              {selectedShifts.length === 0 && (
                <p className="title-not-shifts">
                  Du har ikke tilføjet nogen endnu
                </p>
              )}
            </>
          )}
        </div>
        <div className="applied">
          {loading && (
            <div className="loading-container">
              <Spinner />
            </div>
          )}

          {!loading && (
            <div className="employee-container">
              <p className="title">ANSØGNINGER</p>
              {console.log("hasmore", loadedRecords.appliedShifts ? true : false)}
              <InfiniteScroll
                pageStart={0}
                loadMore={() => loadMore('appliedShifts')}
                hasMore={loadedRecords.appliedShifts ? true : false}
                // loader={loader()}
                useWindow={false}
              >
              { renderShifts(appliedShifts, 'appliedShifts', "applied") }
              </InfiniteScroll>
              {!loading && appliedShifts.length === 0 && (
                <p className="title-not-shifts">Ikke flere ansøgninger</p>
              )}
            </div>
          )}
          {!loading && removedShifts.length > 0 && (
            <div className="applied-container">
              <p className="title" style={{ color: colors.darkerRed }}>
                FJERNEDE
              </p>
              <>
                {removedShifts.map((shift, i) => (
                  <StaffCard
                    key={i}
                    staffType={booking.staff_type}
                    setShift={props.updateShiftStatus}
                    shift={shift}
                    type={
                      user.is_admin || takenOverCorporation ? "applied" : "gray"
                    }
                  />
                ))}
              </>
            </div>
          )}

          {!loading && sickShifts.length > 0 && (
            <div className="applied-container">
              <p className="title" style={{ color: colors.darkestGrey }}>
                AFMELDINGER
              </p>
              <>
                {sickShifts.map((shift, i) => (
                  <StaffCard
                    key={i}
                    staffType={booking.staff_type}
                    setShift={props.updateShiftStatus}
                    shift={shift}
                    type={"gray"}
                  />
                ))}
              </>
            </div>
          )}

          {!loading && grayShifts.length > 0 && (
            <div className="applied-container">
              <p className="title" style={{ color: colors.darkestGrey }}>
                TIDLIGERE ANSØGERE
              </p>
              <>
                {grayShifts.map((shift, i) => (
                  <StaffCard
                    key={i}
                    staffType={booking.staff_type}
                    setShift={props.updateShiftStatus}
                    shift={shift}
                    type={"gray"}
                  />
                ))}
              </>
            </div>
          )}

          {!loading && doubleBookedShifts.length > 0 && (
            <div className="applied-container">
              <p className="title" style={{ color: colors.darkerGrey }}>
                BOOKET ANDETSTED
              </p>
              <>
                {doubleBookedShifts.map((shift, i) => (
                  <StaffCard
                    key={i}
                    staffType={booking.staff_type}
                    setShift={props.updateShiftStatus}
                    shift={shift}
                    type={"double"}
                  />
                ))}
                {doubleBookedShifts.length === 0 && (
                  <p className="title-not-shifts">Ingen dobbelt bookede</p>
                )}
              </>
            </div>
          )}

          {!loading &&
            unwantedShifts.length > 0 &&
            (user.is_admin || takenOverCorporation) && (
              <div className="applied-container">
                <p className="title" style={{ color: colors.darkerRed }}>
                  SKJULTE MEDARBEJDERE
                </p>
                <>
                  {unwantedShifts.map((shift, i) => (
                    <StaffCard
                      key={i}
                      staffType={booking.staff_type}
                      showAddToApplied={true}
                      setShift={props.updateShiftStatus}
                      shift={shift}
                      type={"unwanted"}
                    />
                  ))}
                  {unwantedShifts.length === 0 && (
                    <p className="title-not-shifts">
                      Ingen fjernede ansøgninger
                    </p>
                  )}
                </>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

const componentStyle = (colors) => css`
  height: 100%;

  .container-staff-selection {
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;

    @media screen and (max-width: ${breakPoint.sm}px) {
      flex-direction: column;
    }
  }

  .loading-container {
    display: flex;
    justify-content: center;
    padding: 5rem;
  }

  .selected-container {
    width: 50%;
    height: 100vh;
    background-color: ${colors.lightGreen};

    @media screen and (max-width: ${breakPoint.sm}px) {
      width: 100%;
    }
  }

  .title-not-shifts {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.85rem;
    color: ${colors.darkGrey};
  }

  .employee-container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .applied-container {
    margin-top: 2rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .title {
    font-weight: 500;
    text-align: center;
    font-size: 1.125rem;
    letter-spacing: 0.05em;
  }

  .applied {
    width: 50%;

    @media screen and (max-width: ${breakPoint.sm}px) {
      width: 100%;
    }
  }

  .applied-types-container {
    display: flex;
    justify-content: space-around;
    margin-top: 0.5rem;

    p {
      font-size: 0.65rem;
      border: 1px solid ${colors.black};
      border-radius: 3px;
      padding: 0.2rem 0.75rem;
      background-color: ${colors.white};
      cursor: pointer;
      font-weight: 600;
    }

    p:hover {
      background-color: ${tinycolor(colors.grey)
        .desaturate(50)
        .setAlpha(0.1)
        .toRgbString()};
      transition: background-color 60ms ease;
    }

    p:active {
      background-color: ${tinycolor(colors.grey)
        .desaturate(50)
        .setAlpha(0.2)
        .toRgbString()};
      transition: background-color 100ms ease;
    }

    .selected {
      background-color: ${colors.mediumGrey};
    }

    .selected:hover {
      background-color: ${tinycolor(colors.grey)
        .desaturate(50)
        .setAlpha(0.1)
        .toRgbString()};
      transition: background-color 60ms ease;
    }

    .selected:active {
      background-color: ${tinycolor(colors.grey)
        .desaturate(50)
        .setAlpha(0.2)
        .toRgbString()};
      transition: background-color 60ms ease;
    }
  }

  .submit-booking-container {
    position: sticky;
    bottom: -1rem;
    flex-direction: column;
    justify-content: center;
    background-color: ${colors.darkerGrey};
    height: 3rem;
    display: flex;
    width: 98%;
    margin: auto;
    border-radius: 5px;

    .btn-container {
      display: flex;
      justify-content: flex-end;
      padding: 0 1rem;
    }

    button {
      background-color: ${colors.green};
      color: ${colors.white};
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.25rem 3rem;
      border-radius: 5px;
      border: 1px solid ${colors.darkGrey};
      letter-spacing: 1px;
      outline: none;
    }

    button:hover {
      background-color: ${colors.darkerGreen};
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  addToast: bindActionCreators(addToast, dispatch),
});

export default connect(null, mapDispatchToProps)(StaffSelection);

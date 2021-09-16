import React, { ReactElement, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import EventForm from "./event-form/EventForm";
import ParticipantsList from "./participants-list/ParticipantsList";

export default function App(): ReactElement {
  const [showMessage, setShowMessage] = useState(false);
  const [buttonState, setButtonState] = useState({ registerpage: true });
  const submitMassageClassNames = `OnSubmitMassage  ${
    showMessage ? "show" : ""
  }`;
  const buttonClassNames = `button ${
    !buttonState.registerpage ? "greenbg" : ""
  }`;
  return (
    <>
      <Router>
        <div className={submitMassageClassNames}>
          {/* it shows after submitting the form */}
          <p>Successfully Submitted!</p>
        </div>
        <div className="buttons">
          <button type="button" className={buttonClassNames}>
            {buttonState.registerpage ? (
              <Link to="/participants">Participants List</Link>
            ) : (
              <Link to="/">Attend Now</Link>
            )}
          </button>
        </div>
        <div className="App">
          <h1>DUC Event</h1>
          <h3>
            Event For Students Who Haven&apos;t Gotten Back Their Registration
            Fees From College
          </h3>
          <Switch>
            <Route exact path="/">
              <EventForm
                showMessage={setShowMessage}
                buttonState={setButtonState}
              />
            </Route>
            <Route exact path="/participants">
              <ParticipantsList buttonState={setButtonState} />
            </Route>
          </Switch>
          <footer>
            <p>
              Developed and Maintained By:{" "}
              <a href="https://www.instagram.com/jubayer_amb/">
                {" "}
                Jubayer Al Mamun
              </a>{" "}
            </p>
          </footer>
        </div>
      </Router>
    </>
  );
}

import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import addParticipant from "../../db/crudConfig";

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 1.5em 1em;
  border-radius: 10px;
  background-color: #b6e8ffc5;
`;
const Div = styled.div`
  width: 100%;
  max-width: 700px;
  margin: auto;
  padding: 2em;
`;
const LabelDiv = styled.div`
  display: block;
  text-align: left;
  font-weight: bold;
  letter-spacing: 1px;
  input,
  textarea,
  select {
    display: block;
    width: 100%;
    margin: 0.5em 0;
    padding: 8px 12px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    outline: none;
  }
`;
const Button = styled.button`
  padding: 1em;
  margin: 1em auto 0;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 10px;
  background: #f1356d;
  color: #fff;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const CheckboxContainer = styled.div`
  margin-top: 1em;
  text-align: left;
`;
const Span = styled.span`
  margin-right: 15px;
  font-weight: bold;
  letter-spacing: 1px;
`;

// types
interface EventFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showMessage: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonState: any;
}

// main component starts from here
const EventForm = ({
  showMessage,
  buttonState,
}: EventFormProps): ReactElement => {
  interface InitialState {
    pName: string;
    roll: string;
    group: string;
    section: string;
    shift: string;
  }
  const initialState: InitialState = {
    pName: "",
    roll: "",
    group: "",
    section: "",
    shift: "",
  };
  const [formData, setFormData] = useState(initialState);

  const { pName, roll, group, section } = formData;

  useEffect(() => {
    buttonState({ registerpage: true });
  }, [buttonState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { name, value } = target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(formData);
    const datas = addParticipant(formData);
    const fullfilled = (await datas).done;
    showMessage(fullfilled);
    setFormData(initialState);
    setTimeout(() => {
      showMessage(false);
    }, 1500);
  };

  return (
    <>
      <Div>
        <Form onSubmit={handleSubmit}>
          <LabelDiv>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                name="pName"
                required
                value={pName}
                onChange={handleInputChange}
              />
            </label>
          </LabelDiv>
          <LabelDiv>
            <label htmlFor="roll">
              Roll:
              <input
                type="number"
                name="roll"
                required
                value={roll.toString().slice(0, 6)}
                onChange={handleInputChange}
              />
            </label>
          </LabelDiv>
          <LabelDiv>
            <label htmlFor="group">
              Group:
              <select
                name="group"
                value={group}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Group</option>
                <option value="Science">Sceience</option>
                <option value="Arts">Arts</option>
                <option value="Commerce">Commerce</option>
              </select>
            </label>
          </LabelDiv>
          <LabelDiv>
            <label htmlFor="section">
              Section:
              <input
                type="text"
                name="section"
                required
                value={section.toLocaleUpperCase().slice(0, 1)}
                onChange={handleInputChange}
              />
            </label>
          </LabelDiv>
          <CheckboxContainer>
            <Span>Shift:</Span>
            <label htmlFor="day">
              <input
                type="radio"
                required
                name="shift"
                id="day"
                value="Day"
                onChange={handleInputChange}
              />
              &nbsp;Day &nbsp; &nbsp; &nbsp;
            </label>
            <label htmlFor="morning">
              <input
                type="radio"
                name="shift"
                id="morning"
                value="Morning"
                onChange={handleInputChange}
              />
              &nbsp;Morning
            </label>
          </CheckboxContainer>
          <Button type="submit">Attend Event</Button>
        </Form>
      </Div>
    </>
  );
};

export default EventForm;

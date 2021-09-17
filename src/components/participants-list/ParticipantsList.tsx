import { collection, getDocs } from "firebase/firestore";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import db from "../../db";

// styles
const Table = styled.table`
  border-collapse: collapse;
  margin: 2em auto;
  width: 95%;
  th,
  td {
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #ffffff;
  }
  th {
    background-color: #70cef3;
    color: #000000;
    letter-spacing: 1px;
  }
`;
const H1 = styled.h1`
  margin: 3em auto;
`;
// types
interface ParticipantsListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonState: any;
}
const ParticipantsList = ({
  buttonState,
}: ParticipantsListProps): ReactElement => {
  // states
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // fetch function started here.
  const fetch = async () => {
    const ref = collection(db, "participants");
    const dataSnapshot = await getDocs(ref);
    return dataSnapshot;
  };
  useEffect(() => buttonState({ registerpage: false }), [buttonState]);
  // fetch ends here.
  useEffect(() => {
    fetch().then((datas) => {
      setIsLoading(false);
      setList(datas.docs);
    });
  }, []);
  // defining serial for first coloumn of the table
  let serial = 0;
  return (
    <div>
      {isLoading && <H1>Loading...</H1>}
      {!isLoading && (
        <Table>
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Roll</th>
              <th>Section</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {list.map((doc) => {
              serial += 1;
              return (
                <tr key={doc.id}>
                  <td>{serial}</td>
                  <td>{doc.data().pName}</td>
                  <td>{doc.data().roll}</td>
                  <td>{doc.data().section}</td>
                  <td>{doc.data().group}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default ParticipantsList;

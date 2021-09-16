import { addDoc, collection } from "firebase/firestore";
import db from "./index";

interface ParticipantData {
  id?: string | number;
  done?: boolean;
  pName: string;
  roll: number;
  group: string;
  section: string;
}
const addParticipant = async (
  participantData: ParticipantData
): Promise<ParticipantData> => {
  const ref = await addDoc(collection(db, "participants"), participantData);
  return {
    id: ref.id,
    done: true,
    ...participantData,
  };
};
export default addParticipant;

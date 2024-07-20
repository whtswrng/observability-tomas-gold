import axios from "axios";
import { DATA_SERVICE_ENDPOINT } from "../config";

interface Entity {
  type: string;
  name: string;
  id: string;
}
export const getEntities = async (jwt): Promise<Array<Entity>> => {
  const d = await axios.get(`${DATA_SERVICE_ENDPOINT}/api/data/v1/entities`, {
    headers: {
      // In production, we'd use Authorization header
      Cookie: "token=" + jwt,
    },
  });
  return d.data;
};

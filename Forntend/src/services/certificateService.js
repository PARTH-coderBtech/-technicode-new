import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;


export const verifyCertificate = async (
  certificateId
) => {

  const response =
    await axios.get(

      `${API_URL}/certificates/verify/${certificateId}`

    );

  return response.data;

};
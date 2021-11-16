import axios from "axios";

const fileApi ={
  upload: (formFile: FormData)=>
  axios.post<string>(`${"http://15.164.54.15:8081/"}/files`, formFile,{
    headers:{"content-type":"multipart/form-data"},
  }),
  remove: (objectKey:string)=>
  axios.delete(`${"http:/15.164.54.15:8081/"}/files/${objectKey}`),
}

export default fileApi;
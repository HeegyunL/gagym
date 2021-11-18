import axios from "axios";

const fileApi ={
  upload: (formFile: FormData)=>
  axios.post<string>(`${"http://localhost:8080/partner/"}/files`, formFile,{
    headers:{"content-type":"multipart/form-data"},
  }),
  remove: (objectKey:string)=>
  axios.delete(`${"http://localhost:8080/partner/"}/files/${objectKey}`),
}

export default fileApi;
import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { uploadDocument as uploadForDonor } from "../services/donorService";
import Toast from "../shared/Toast";

export default function UploadDocuments() {
  const { user } = useAuth();
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("PDF");
  const [filePath, setFilePath] = useState("");
  const [toast, setToast] = useState(null);

  const upload = async (e) => {
    e.preventDefault();
    try{
      await uploadForDonor(user.id, { fileName, fileType, filePath });
      setToast({ type:"success", message:"Document uploaded" });
      setFileName(""); setFileType("PDF"); setFilePath("");
    }catch(e){
      setToast({ type:"error", message:"Upload failed" });
    }
  };

  return (
    <form className="form" onSubmit={upload}>
      <div>
        <label className="label">File Name</label>
        <input className="input" value={fileName} onChange={e=>setFileName(e.target.value)} required />
      </div>
      <div>
        <label className="label">File Type</label>
        <select value={fileType} onChange={e=>setFileType(e.target.value)} className="select">
          <option className="option">PDF</option><option className="option">JPG</option><option className="option">PNG</option>
        </select>
      </div>
      <br></br>
      <div style={{ gridColumn:"1 / -1" }}>
        <label className="label">File Path (server path)</label>
        <input className="input" value={filePath} onChange={e=>setFilePath(e.target.value)} required />
      </div>
      <div style={{ gridColumn:"1 / -1" }}>
        <button className="btn primary" type="submit">Upload</button>
      </div>
      {toast && <Toast {...toast} onClose={()=>setToast(null)} />}
    </form>
  );
}

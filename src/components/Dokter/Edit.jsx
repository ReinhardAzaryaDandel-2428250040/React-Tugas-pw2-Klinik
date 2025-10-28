import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

export default function EditDokter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [spesialis, setSpesialis] = useState("");
  const [telepon, setTelepon] = useState("");

  useEffect(() => {
    axios
      .get(`https://if-3-b-klinik-reinhardd.vercel.app/api/api/dokters/${id}`)
      .then((res) => {
        setNama(res.data.Data.nama);
        setSpesialis(res.data.Data.spesialis);
        setTelepon(res.data.Data.no_telp);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://if-3-b-klinik-reinhardd.vercel.app/api/api/dokters/${id}`, {
        nama, spesialis, no_telp: telepon
      });
      Swal.fire("Sukses", "Dokter berhasil diupdate", "success");
      navigate("/dokters");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Terjadi kesalahan", "error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-lg border-0">
        <div className="card-header bg-warning text-white text-center">
          Edit Dokter
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama Dokter</label>
              <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Spesialis</label>
              <input type="text" className="form-control" value={spesialis} onChange={(e) => setSpesialis(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">No. Telepon</label>
              <input type="text" className="form-control" value={telepon} onChange={(e) => setTelepon(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-warning w-100">Update Dokter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

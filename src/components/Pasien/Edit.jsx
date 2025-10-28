import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPasien() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [dokterId, setDokterId] = useState("");
  const [dokterList, setDokterList] = useState([]);

  useEffect(() => {
    axios.get("https://if-3-b-klinik-reinhardd.vercel.app/api/api/dokters")
      .then(res => setDokterList(res.data.Data));
    axios.get(`https://if-3-b-klinik-reinhardd.vercel.app/api/api/pasiens/${id}`)
      .then(res => {
        setNama(res.data.Data.nama);
        setUmur(res.data.Data.umur);
        setAlamat(res.data.Data.alamat);
        setDokterId(res.data.Data.dokter_id);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://if-3-b-klinik-reinhardd.vercel.app/api/api/pasiens/${id}`, {
        nama, umur, alamat, dokter_id: dokterId
      });
      Swal.fire("Sukses", "Pasien berhasil diupdate", "success");
      navigate("/pasiens");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Terjadi kesalahan", "error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-lg border-0">
        <div className="card-header bg-warning text-white text-center">Edit Pasien</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama Pasien</label>
              <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Umur</label>
              <input type="number" className="form-control" value={umur} onChange={(e) => setUmur(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Alamat</label>
              <input type="text" className="form-control" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Dokter</label>
              <select className="form-select" value={dokterId} onChange={(e) => setDokterId(e.target.value)}>
                <option value="">Pilih Dokter</option>
                {dokterList.map(d => <option key={d.id} value={d.id}>{d.nama}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-warning w-100">Update Pasien</button>
          </form>
        </div>
      </div>
    </div>
  );
}

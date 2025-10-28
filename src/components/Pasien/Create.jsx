import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreatePasien() {
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [dokterId, setDokterId] = useState("");
  const [dokterList, setDokterList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://if-3-b-klinik-reinhardd.vercel.app/api/api/dokters")
      .then(res => setDokterList(res.data.Data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !umur || !alamat || !dokterId) {
      Swal.fire("Perhatian", "Semua field wajib diisi!", "warning");
      return;
    }

    try {
      await axios.post("https://if-3-b-klinik-reinhardd.vercel.app/api/api/pasiens", {
        nama, umur, alamat, dokter_id: dokterId
      });
      Swal.fire("Sukses", "Pasien berhasil ditambahkan", "success");
      navigate("/pasiens");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Terjadi kesalahan", "error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white text-center">
          Tambah Pasien Baru
        </div>
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
            <button type="submit" className="btn btn-primary w-100">Tambahkan Pasien</button>
          </form>
        </div>
      </div>
    </div>
  );
}



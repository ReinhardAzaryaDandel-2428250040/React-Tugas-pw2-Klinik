import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateDokter() {
  const [nama, setNama] = useState("");
  const [spesialis, setSpesialis] = useState("");
  const [telepon, setTelepon] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !spesialis || !telepon) {
      Swal.fire("Perhatian", "Semua field wajib diisi!", "warning");
      return;
    }

    try {
      await axios.post(
        "https://if-3-b-klinik-reinhardd.vercel.app/api/api/dokters",
        { nama, spesialis, no_telp: telepon }
      );
      Swal.fire("Sukses", "Dokter berhasil ditambahkan", "success");
      navigate("/dokters");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Terjadi kesalahan", "error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white text-center">
          Tambah Dokter Baru
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama Dokter</label>
              <input
                type="text"
                className="form-control"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Spesialis</label>
              <input
                type="text"
                className="form-control"
                value={spesialis}
                onChange={(e) => setSpesialis(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">No. Telepon</label>
              <input
                type="text"
                className="form-control"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Tambahkan Dokter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

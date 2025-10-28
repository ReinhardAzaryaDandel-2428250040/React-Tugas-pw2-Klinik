import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListPasien() {
  const [pasiens, setPasiens] = useState([]);

  useEffect(() => {
    axios.get("https://if-3-b-klinik-reinhardd.vercel.app/api/api/pasiens")
      .then((res) => setPasiens(res.data.Data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Hapus pasien ${nama}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://if-3-b-klinik-reinhardd.vercel.app/api/api/pasiens/${id}`)
          .then(() => {
            setPasiens(pasiens.filter((p) => p.id !== id));
            Swal.fire("Terhapus!", "Pasien berhasil dihapus.", "success");
          });
      }
    });
  };

  return (
    <div>
      <h2>List Pasien</h2>
      <NavLink to="/pasiens/create" className="btn btn-primary mb-3">Tambah Pasien</NavLink>
      <table className="table table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Nama</th>
            <th>Umur</th>
            <th>Alamat</th>
            <th>Dokter</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pasiens.map((p) => (
            <tr key={p.id}>
              <td>{p.nama}</td>
              <td>{p.umur}</td>
              <td>{p.alamat}</td>
              <td>{p.dokter.nama}</td>
              <td>
                <NavLink to={`/pasiens/edit/${p.id}`} className="btn btn-warning btn-sm me-2">Edit</NavLink>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id, p.nama)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

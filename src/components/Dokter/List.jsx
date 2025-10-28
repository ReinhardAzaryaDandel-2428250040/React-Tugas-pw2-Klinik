import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListDokter() {
  const [dokters, setDokters] = useState([]);

  useEffect(() => {
    axios
      .get("https://if-3-b-klinik-reinhardd.vercel.app/api/api/dokters")
      .then((res) => setDokters(res.data.Data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Konfirmasi",
      text: `Hapus dokter ${nama}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://if-3-b-klinik-reinhardd.vercel.app/api/api/dokters/${id}`)
          .then(() => {
            setDokters(dokters.filter((d) => d.id !== id));
            Swal.fire("Terhapus!", "Dokter berhasil dihapus.", "success");
          });
      }
    });
  };

  return (
    <div>
      <h2>List Dokter</h2>
      <NavLink to="/dokters/create" className="btn btn-primary mb-3">
        Tambah Dokter
      </NavLink>
      <table className="table table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Nama</th>
            <th>Spesialis</th>
            <th>No. Telepon</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dokters.map((dokter) => (
            <tr key={dokter.id}>
              <td>{dokter.nama}</td>
              <td>{dokter.spesialis}</td>
              <td>{dokter.no_telp}</td>
              <td>
                <NavLink
                  to={`/dokters/edit/${dokter.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </NavLink>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(dokter.id, dokter.nama)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

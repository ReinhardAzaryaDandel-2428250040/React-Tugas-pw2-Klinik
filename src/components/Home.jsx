import React from "react";

export default function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Selamat Datang di Klinik</h1>
      <p className="lead">Kelola Dokter dan Pasien dengan mudah</p>
      <img
        src="https://images.unsplash.com/photo-1588776814546-1b7b3f6d144d"
        alt="Klinik"
        className="img-fluid rounded shadow-lg"
        style={{ maxHeight: "400px" }}
      />
    </div>
  );
}



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { mahasiswaList } from "@/Data/Dummy";
import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";

const Mahasiswa = () => {
  const navigate = useNavigate();
  
  // State untuk data mahasiswa (NIM, Nama, status)
  const [mahasiswa, setMahasiswa] = useState([]);
  
  // State untuk modal (true/false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  // State untuk form (NIM, Nama, status)
  const [form, setForm] = useState({ nim: "", nama: "", status: true });

  // Load data mahasiswa saat komponen dimount
  useEffect(() => {
    setTimeout(() => {
      setMahasiswa(mahasiswaList);
    }, 500);
  }, []);

  // Fungsi CRUD: Create (Tambah Mahasiswa)
  const addMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]);
  };

  // Fungsi CRUD: Update (Edit Mahasiswa)
  const updateMahasiswa = (nim, newData) => {
    const updated = mahasiswa.map((mhs) => 
      mhs.nim === nim ? {...mhs, ...newData} : mhs
    );
    setMahasiswa(updated);
  };

  // Fungsi CRUD: Delete (Hapus Mahasiswa)
  const deleteMahasiswa = (nim) => {
    const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
    setMahasiswa(filtered);
  };

  // Event Handling: handleChange - menangkap perubahan data ke state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ 
      ...form, 
      [name]: name === "status" ? value === "true" : value 
    });
  };

  // Event Handling: handleSubmit - memperbarui data ke state
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form Validation: Data kurang terisi
    if (!form.nim || !form.nama) {
      alert("NIM dan Nama wajib diisi!");
      return;
    }

    if (isEdit) {
      // Validasi konfirmasi ketika update
      if (confirm(`Apakah Anda yakin ingin mengubah data mahasiswa dengan NIM ${form.nim}?`)) {
        updateMahasiswa(form.nim, form);
        alert("Data berhasil diperbarui!");
      }
    } else {
      // Form Validation: NIM unique
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        alert("NIM sudah terdaftar! Silakan gunakan NIM lain.");
        return;
      }
      addMahasiswa(form);
      alert("Data berhasil ditambahkan!");
    }

    // Reset form
    setForm({ nim: "", nama: "", status: true });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  // Buka modal untuk tambah mahasiswa
  const openAddModal = () => {
    setIsModalOpen(true);
    setForm({ nim: "", nama: "", status: true });
    setIsEdit(false);
  };

  // Buka modal untuk edit mahasiswa
  const handleEdit = (mhs) => {
    setForm({ nim: mhs.nim, nama: mhs.nama, status: mhs.status });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // Handle hapus mahasiswa dengan validasi konfirmasi
  const handleDelete = (nim) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data mahasiswa dengan NIM ${nim}?`)) {
      deleteMahasiswa(nim);
      alert("Data berhasil dihapus!");
    }
  };

  // Handle detail mahasiswa
  const handleDetail = (nim) => {
    navigate(`/admin/mahasiswa/${nim}`);
  };

  // Tutup modal
  const handleClose = () => {
    setIsModalOpen(false);
    setForm({ nim: "", nama: "", status: true });
    setIsEdit(false);
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
          <Button onClick={() => openAddModal()}>+ Tambah Mahasiswa</Button>
        </div>

        <MahasiswaTable
          data={mahasiswa}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={handleDetail}
        />
      </Card>

      <MahasiswaModal
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Mahasiswa;
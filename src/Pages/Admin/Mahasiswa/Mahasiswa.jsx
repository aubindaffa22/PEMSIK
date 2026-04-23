import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { mahasiswaList } from "@/Data/Dummy";
import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";

const Mahasiswa = () => {
  const navigate = useNavigate();

  const [mahasiswa, setMahasiswa] = useState([]);

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMahasiswa(mahasiswaList);
    }, 500);
  }, []);

  const storeMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]);
  };

  const updateMahasiswa = (nim, newData) => {
    const updated = mahasiswa.map((mhs) =>
      mhs.nim === nim ? { ...mhs, ...newData } : mhs
    );
    setMahasiswa(updated);
  };

  const deleteMahasiswa = (nim) => {
    const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
    setMahasiswa(filtered);
  };

  const openAddModal = () => {
    setIsModalOpen(true);
    setSelectedMahasiswa(null);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (selectedMahasiswa) {
      confirmUpdate(() => {
        updateMahasiswa(selectedMahasiswa.nim, formData);
        toastSuccess("Data berhasil diperbarui");
        setIsModalOpen(false);
        setSelectedMahasiswa(null);
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === formData.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }
      storeMahasiswa(formData);
      toastSuccess("Data berhasil ditambahkan");
      setIsModalOpen(false);
      setSelectedMahasiswa(null);
    }
  };

  const handleDelete = (nim) => {
    confirmDelete(() => {
      deleteMahasiswa(nim);
      toastSuccess("Data berhasil dihapus");
    });
  };

  const handleDetail = (nim) => {
    navigate(`/admin/mahasiswa/${nim}`);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedMahasiswa(null);
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          <Button onClick={() => openAddModal()}>+ Tambah Mahasiswa</Button>
        </div>

        <MahasiswaTable
          data={mahasiswa}
          openEditModal={openEditModal}
          onDelete={handleDelete}
          onDetail={handleDetail}
        />
      </Card>

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </>
  );
};

export default Mahasiswa;
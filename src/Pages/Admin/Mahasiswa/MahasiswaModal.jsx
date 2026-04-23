import { useState, useEffect } from "react";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";
import Button from "@/Pages/Admin/Components/Button";

const MahasiswaModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMahasiswa
}) => {
  // State untuk form
  const [form, setForm] = useState({
    nim: "",
    nama: "",
    status: true
  });

  // useEffect: ketika selectedMahasiswa ada maka setForm di isi dengan detail selectedMahasiswanya,
  // ketika tidak maka setForm dengan null semua, dan sembari memanggil (selectedMahasiswa, setModalOpen)
  useEffect(() => {
    if (selectedMahasiswa) {
      // Isi form dengan detail selectedMahasiswa
      setForm({
        nim: selectedMahasiswa.nim || "",
        nama: selectedMahasiswa.nama || "",
        status: selectedMahasiswa.status !== undefined ? selectedMahasiswa.status : true
      });
    } else {
      // Reset form dengan null semua
      setForm({
        nim: "",
        nama: "",
        status: true
      });
    }
  // Dependency hanya pada selectedMahasiswa sesuai ketentuan tugas
  // selectedMahasiswa adalah dependency yang benar karena form perlu di-update saat nilainya berubah
  }, [selectedMahasiswa]);

  // handleChange: untuk form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value
    }));
  };

  // handleSubmit: panggil onSubmit dengan parameter state form lalu panggil onClose, dengan tetap trigger form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validasi: berikan validasi validasi yang diperlukan
    if (!form.nim || !form.nim.trim()) {
      alert("NIM wajib diisi!");
      return;
    }
    if (!form.nama || !form.nama.trim()) {
      alert("Nama wajib diisi!");
      return;
    }

    // Panggil onSubmit dengan parameter state form
    onSubmit(form);

    // Panggil onClose
    onClose();
  };

  // tambahkan baris kondisi ketika isModelOpen false maka null
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input
              type="text"
              name="nim"
              id="nim"
              value={form.nim}
              onChange={handleChange}
              readOnly={!!selectedMahasiswa}
              placeholder="Masukkan NIM"
              required
            />
          </div>
          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input
              type="text"
              name="nama"
              id="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama"
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value={true}>Aktif</option>
              <option value={false}>Tidak Aktif</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MahasiswaModal;
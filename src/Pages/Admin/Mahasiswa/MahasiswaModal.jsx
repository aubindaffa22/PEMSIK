import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";
import Button from "@/Pages/Admin/Components/Button";

const MahasiswaModal = ({
  isOpen,
  isEdit,
  form,
  onChange,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input
              type="text"
              name="nim"
              value={form.nim}
              onChange={onChange}
              readOnly={isEdit}
              placeholder="Masukkan NIM"
              required
            />
          </div>
          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input
              type="text"
              name="nama"
              value={form.nama}
              onChange={onChange}
              placeholder="Masukkan Nama"
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
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
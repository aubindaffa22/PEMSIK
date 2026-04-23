import Button from "@/Pages/Admin/Components/Button";

const MahasiswaTable = ({ data = [], openEditModal, onDelete, onDetail }) => {
  const handleDelete = (nim) => {
    onDelete(nim);
  };

  const handleDetail = (nim) => {
    onDetail(nim);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Status</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                Data mahasiswa belum ada
              </td>
            </tr>
          ) : (
            data.map((mhs, index) => (
              <tr
                key={mhs.nim}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4">{mhs.nim}</td>
                <td className="py-2 px-4">{mhs.nama}</td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      mhs.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {mhs.status ? "Aktif" : "Tidak Aktif"}
                  </span>
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  {/* Tombol Detail, Edit dan Hapus */}
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleDetail(mhs.nim)}
                  >
                    Detail
                  </Button>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => openEditModal(mhs)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(mhs.nim)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MahasiswaTable;
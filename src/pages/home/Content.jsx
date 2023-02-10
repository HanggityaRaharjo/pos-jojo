import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const Content = () => {
  const convetToRupiah = (bilangan) => {
    var reverse = bilangan.toString().split('').reverse().join('');
    var ribuan = reverse.match(/\d{1,3}/g);
    var ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const getProducts = () => {
    axios.get('http://localhost:8000/api/product').then(({ data }) => {
      const result = data.data.map((product) => {
        return {
          label: product.product_name,
          value: product.uuid,
        };
      });
      setProducts(result);
    });
  };

  const handleSelectedValue = (event) => {
    axios.get(`http://localhost:8000/api/product/${event}`).then(({ data }) => setSelectedProduct(data[0][0]));
  };
  console.log(Object.keys(selectedProduct).length === 0 && selectedProduct.constructor === Object);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="p-5">
      <div className="grid grid-cols-2 gap-2 items-center mb-5">
        <div className="stats bg-primary shadow-md text-primary-content">
          <div className="stat">
            <div className="stat-title">Pendapatan Hari Ini</div>
            <div className="stat-value">RP. 120.000</div>
            <div className="stat-actions">
              <button className="btn btn-sm btn-success">Add funds</button>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Pendapatan terakhir</div>
            <div className="stat-value">RP. 120.000</div>
            <div className="stat-actions">
              <button className="btn btn-sm">Withdrawal</button>
              <button className="btn btn-sm">deposit</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white shadow-md p-2 rounded-xl flex justify-between items-center">
            <div>
              <h5 className="font-bold">Product</h5>
              <p>20 qty</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-md flex justify-center items-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
          </div>
          <div className="bg-white shadow-md p-2 rounded-xl flex justify-between items-center">
            <div>
              <h5 className="font-bold">Product</h5>
              <p>20 qty</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-md flex justify-center items-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
          </div>
          <div className="bg-white shadow-md p-2 rounded-xl flex justify-between items-center">
            <div>
              <h5 className="font-bold">Product</h5>
              <p>20 qty</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-md flex justify-center items-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
          </div>
          <div className="bg-white shadow-md p-2 rounded-xl flex justify-between items-center">
            <div>
              <h5 className="font-bold">Product</h5>
              <p>20 qty</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-md flex justify-center items-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-2 rounded-xl shadow-md mb-5 relative z-50">
        <h1 className="text-2xl font-bold mb-2">Kasir</h1>

        <form>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <Select className="mb-2" options={products} id="select" onChange={(e) => handleSelectedValue(e.value)} />
              <input type="number" className="input w-full border border-gray-300" placeholder="Jumlah" />
            </div>
            {Object.keys(selectedProduct).length === 0 && selectedProduct.constructor === Object ? (
              <div className="bg-primary text-white p-2 flex justify-center items-center rounded-md">
                <h4 className="text-center font-extrabold text-xl">Belum ada data yang dipilih</h4>
              </div>
            ) : (
              <div className="bg-primary p-2  rounded-md">
                <h4 className="text-center font-extrabold text-xl">{selectedProduct.product_name}</h4>
                <h4 className="">Harga : Rp. {convetToRupiah(selectedProduct.price)}</h4>
                <h4 className="">Kode Barang : {selectedProduct.code}</h4>
              </div>
            )}
          </div>
          <div className="text-right">
            <button className="btn btn-primary text-white">Submit</button>
          </div>
        </form>
      </div>

      {/* Invoice */}
      <div className="flex gap-2">
        <div className="bg-primary p-2 rounded-xl shadow-md w-[70%]">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-blue-400 text-white">No</th>
                <th className="bg-blue-400 text-white">Code</th>
                <th className="bg-blue-400 text-white">Nama Barang</th>
                <th className="bg-blue-400 text-white">Jumlah</th>
                <th className="bg-blue-400 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>P-2023-01-22</td>
                <td>SANIA Minyak Goreng 120 L</td>
                <td>5</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white p-2 shadow-md w-[30%]">
          <h2 className="text-center">Struk Pembarayan</h2>
        </div>
      </div>
      {/* End Invoice */}
    </main>
  );
};

export default Content;

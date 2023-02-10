import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const PopupDelete = (props) => {
  const handleDelete = () => {
    console.log(props.id);
    document.getElementById(`my-modal-3-${props.id}`).checked = false;
    axios.delete(`http://localhost:8000/api/product/${props.id}`).then((res) => console.log(res));
  };
  return (
    <>
      <label htmlFor={`my-modal-3-${props.id}`} className="btn  btn-primary btn-outline btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </label>
      <input type="checkbox" id={`my-modal-3-${props.id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor={`my-modal-3-${props.id}`} className="btn btn-sm text-white btn-primary btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold text-center mb-2">YAKIN UNTUK MENGHAPUS DATA INI?</h3>
          <div className="flex justify-end gap-2">
            <button className="btn btn-sm btn-primary text-white" onClick={handleDelete}>
              Delete
            </button>
            <label htmlFor={`my-modal-3-${props.id}`} className="btn btn-sm btn-primary btn-outline">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

const TableProduct = (props) => {
  const [products, setProducts] = useState([]);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [filterPage, setFilterPage] = useState('');
  const getDataProducts = () => {
    axios.get('http://localhost:8000/api/product').then(({ data }) => {
      setProducts(data.data.data);
      setNextPage(data.data.next_page_url);
      setPreviousPage(data.data.prev_page_url);
    });
  };
  const handleNextPage = () => {
    document.getElementById('next-button').disabled = true;
    setProducts([]);
    axios.get(nextPage).then(({ data }) => {
      setPreviousPage(data.data.prev_page_url);
      setProducts(data.data.data);
    });
    document.getElementById('next-button').disabled = false;
  };
  const handlePreviousPage = () => {
    document.getElementById('prev-button').disabled = true;
    setProducts([]);
    axios.get(previousPage).then(({ data }) => {
      setNextPage(data.data.next_page_url);
      setProducts(data.data.data);
    });
    document.getElementById('prev-button').disabled = false;
  };
  const handleFilterPage = (e) => {
    setProducts([]);
    axios.get(`http://localhost:8000/api/filter/product/${e.target.value}`).then(({ data }) => {
      setProducts(data.data.data);
    });
  };
  useEffect(() => {
    getDataProducts();
  }, []);
  useEffect(() => {
    getDataProducts();
  }, [props.onALertChange]);
  return (
    <>
      <div className="flex justify-between mb-5">
        <select className="select   border border-gray-400" defaultValue={'DEFAULT'} onChange={handleFilterPage}>
          <option value="DEFAULT" disabled>
            Filter
          </option>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <label htmlFor="my-modal-4" className="btn bg-primary text-white border-0">
          Create Data Product
        </label>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="bg-primary text-white">Code</th>
            <th className="bg-primary text-white">Product Name</th>
            <th className="bg-primary text-white">Price</th>
            <th className="bg-primary text-white">Stock</th>
            <th className="bg-primary text-white"></th>
          </tr>
        </thead>
        <tbody>
          {products == 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-lg font-bold text-primary">
                <div className="radial-progress text-primary animate-spin" style={{ '--value': 70 }}></div>
              </td>
            </tr>
          ) : (
            products &&
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.code}</td>
                <td>{product.product_name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <PopupDelete id={product.uuid} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-end gap-2 mt-2">
        <button id="prev-button" onClick={handlePreviousPage} className="btn btn-primary text-white">
          Previous
        </button>
        <button id="next-button" onClick={handleNextPage} className="btn btn-primary text-white">
          Next
        </button>
      </div>
    </>
  );
};

const CreateProductModal = (props) => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const getDataKategori = () => {
    axios.get('http://localhost:8000/api/category').then(({ data }) => setCategories(data.data));
  };
  useEffect(() => {
    getDataKategori();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/product', {
        category_id: categoryId,
        product_name: productName,
        price: price,
        stock: stock,
        description: description,
      })
      .then((res) => {
        props.handleALertChange(res.status);
        setMessage('Product Created');
      });

    document.getElementById('my-modal-4').checked = false;
  };

  return (
    <div>
      {message != '' ? (
        <div className="alert alert-success shadow-lg mb-2">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Success Create Product</span>
          </div>
        </div>
      ) : (
        ''
      )}

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label htmlFor="my-modal-4" className="btn btn-sm text-white btn-primary btn-circle absolute right-2 top-2">
            ✕
          </label>

          {message == '' ? (
            <form onSubmit={handleSubmit}>
              <div>
                <h3 className="text-lg font-bold">Create Product</h3>
                <div className="mb-2">
                  <label htmlFor="">Nama Barang</label>
                  <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Masukan Nama Barang" className="input w-full  border border-gray-400" />
                </div>
                <div className="mb-2">
                  <label htmlFor="">Kategori</label>
                  <select className="select w-full  border border-gray-400" defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>
                      Select Category
                    </option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.category_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className=" mb-2">
                  <label htmlFor="">Harga</label>
                  <input type="number" value={price} placeholder="asdasd" onChange={(e) => setPrice(e.target.value)} className="input w-full border border-gray-400" />
                </div>
                <div className="mb-2">
                  <label htmlFor="">Stock</label>
                  <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" placeholder="Masukan Nama Barang" className="input w-full border border-gray-400" />
                </div>
                <div className="mb-2">
                  <label htmlFor="">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea w-full border border-gray-400" placeholder="Description"></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button className="btn btn-primary text-white">Submit</button>
                <label htmlFor="my-modal-4" className="btn btn-outline btn-primary">
                  Close
                </label>
              </div>
            </form>
          ) : (
            <div className="alert alert-success shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Success Create Product</span>
              </div>
            </div>
          )}
        </label>
      </label>
    </div>
  );
};

const ProductPage = () => {
  const [sidebar, setSidebar] = useState(true);
  const [alert, setAlert] = useState('');
  console.log(alert);
  return (
    <div className="bg-gray-200 min-h-screen flex">
      <Sidebar showSidebar={sidebar} />
      <div className={sidebar ? 'w-full pl-64 transition-all' : 'pl-0 w-full transition-all'}>
        <Navbar sidebarfn={setSidebar} sidebarStatus={sidebar} location="Product" />
        <main className="p-5">
          <CreateProductModal handleALertChange={setAlert} alertStatus={alert} />
          <TableProduct onALertChange={alert} />
        </main>
      </div>
    </div>
  );
};

export default ProductPage;

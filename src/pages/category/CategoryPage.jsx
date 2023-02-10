import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const TableCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/category').then(({ data }) => setCategories(data.data));
  }, []);
  console.log(categories);
  return (
    <>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="bg-primary text-white">Code</th>
            <th className="bg-primary text-white">Category Name</th>
            <th className="bg-primary text-white">Slug</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.code}</td>
                <td>{category.category_name}</td>
                <td>{category.slug}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

const CategoryPage = () => {
  const [sidebar, setSidebar] = useState(true);
  function handleSidebar(status) {
    setSidebar(status);
  }
  return (
    <div className="bg-gray-200 min-h-screen flex">
      <Sidebar showSidebar={sidebar} />

      <div className={sidebar ? 'w-full pl-64 transition-all' : 'pl-0 w-full transition-all'}>
        <Navbar sidebarfn={handleSidebar} sidebarStatus={sidebar} location="Category" />
        <main className="p-5">
          <TableCategory />
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;

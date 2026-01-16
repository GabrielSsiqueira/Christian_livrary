import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4 bg-light">
          {children}
        </main>
      </div>
    </>
  );
}

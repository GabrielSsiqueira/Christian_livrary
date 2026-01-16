import Navbar from './navbar';
import Sidebar from './sidebar';

export default function Layout({ children }) {
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

import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">{children}</div>
    </div>
  );
}

export default Layout;

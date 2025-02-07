const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };
  return (
    <div className="bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="mb-4">You have successfully logged in!</p>
      <button
        onClick={handleLogout}
        className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};
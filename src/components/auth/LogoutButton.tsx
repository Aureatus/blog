const Logout = () => {
  const logout = () => {
    localStorage.removeItem("bearerToken");
  };

  return (
    <button type="button" onClick={() => logout}>
      Logout
    </button>
  );
};

export default Logout;

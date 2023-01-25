const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen max-w-4xl px-4 mx-auto">
        {children}
      </div>
    </>
  );
};

export default Layout;

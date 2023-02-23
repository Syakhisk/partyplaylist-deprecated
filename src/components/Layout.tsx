import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen max-w-4xl px-4 mx-auto">{children}</div>
    </>
  );
};

export default Layout;

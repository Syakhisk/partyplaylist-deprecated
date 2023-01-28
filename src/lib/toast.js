import { toast } from "react-toastify";

const config = {
  autoClose: 3000,
};

export const _t = {
  loading: toast.loading,
  success: (id, render) =>
    toast.update(id, { render, isLoading: false, type: "success", ...config }),
  fail: (id, render) =>
    toast.update(id, { render, isLoading: false, type: "error", ...config }),
};

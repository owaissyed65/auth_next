import React from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const FormError = ({ message }: { message: string }) => {
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <FaExclamationTriangle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};
const FormMessage = ({ message }: { message: string }) => {
  return (
    <div className="bg-emerald-500/25 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-700">
      <FaCheckCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};

export { FormError, FormMessage };

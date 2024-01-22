"use client";
import React, { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { RiseLoader } from "react-spinners";

import { FormError, FormMessage } from "@/components/auth/form-message";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/new-verification";
const VerificationCard = () => {
  const [errorMessage, setError] = React.useState<string>("");
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  const token = useSearchParams().get("token");
  const onSubmit = useCallback(() => {
    if (errorMessage || successMessage) return;
    if (!token) {
      setSuccessMessage("Token is not provided!");
      return;
    }

    newVerification(token)
      .then((res) => {
        setError(res.error!);
        setSuccessMessage(res.success!);
      })
      .catch((err) => {
        setError(err.error!);
      });
  }, [token]);
  useEffect(() => {
    onSubmit();

    // this is a hack to prevent infinite loop
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming Your Verification!"
      backButtonHref="/auth/login"
      backButtonText="Back to login!"
      showSocialButton={false}
    >
      <div className="flex items-center justify-center flex-col gap-y-3">
        {!errorMessage && !successMessage && <RiseLoader color="blue" />}
        {errorMessage && <FormError message={errorMessage} />}
        {successMessage && <FormMessage message={successMessage} />}
      </div>
    </CardWrapper>
  );
};

export default VerificationCard;

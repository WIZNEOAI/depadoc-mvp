import React from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import { useAuthPage } from "@/hooks/useAuthPage";

export default function AuthPage() {
  const {
    mode,
    loading,
    form,
    loginForm,
    error,
    formRef,
    handleRegister,
    handleLogin,
    handleRegisterFormChange,
    handleLoginFormChange,
    handleSwitchToLogin,
    handleSwitchToRegister,
    handleForgotPassword,
  } = useAuthPage();

  const authContainerProps = {
    isLogin: mode === "login",
    loginForm: loginForm,
    registerForm: form,
    loading: loading,
    error: error,
    onLoginFormChange: handleLoginFormChange,
    onRegisterFormChange: handleRegisterFormChange,
    onLoginSubmit: handleLogin,
    onRegisterSubmit: handleRegister,
    onSwitchMode: mode === "login" ? handleSwitchToRegister : handleSwitchToLogin,
    onForgotPassword: handleForgotPassword,
    registerFormRef: formRef,
  };

  return <AuthContainer {...authContainerProps} />;
}
"use client";

import React, { useState } from "react";

import { useTranslations } from "next-intl";

import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";
import { TextAreaField } from "../molecules/TextAreaField";

export const ContactForm: React.FC = () => {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("messageRequired");
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4 w-full max-w-[400px]">
      <FormField
        id="name"
        label={t("nameLabel")}
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        errorMessage={errors.name}
        required
        disabled={isSubmitting}
      />

      <FormField
        id="email"
        label={t("emailLabel")}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        errorMessage={errors.email}
        required
        disabled={isSubmitting}
      />

      <TextAreaField
        id="message"
        label={t("messageLabel")}
        value={formData.message}
        onChange={handleChange}
        errorMessage={errors.message}
        required
        disabled={isSubmitting}
      />

      {submitStatus === "success" && (
        <p className="text-green-600 text-sm font-sans">{t("submitSuccess")}</p>
      )}

      {submitStatus === "error" && (
        <p className="text-red-600 text-sm font-sans">{t("submitError")}</p>
      )}

      <Button
        label={t("submitButton")}
        onClick={() => {}}
        disabled={isSubmitting}
      />
    </form>
  );
};




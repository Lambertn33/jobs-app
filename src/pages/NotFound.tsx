import { AppNotFound } from "@/components";

export const Notfound = () => {
  return (
    <AppNotFound
      linkLabel="Back to Homepage"
      linkUrl="/"
      message="Sorry, we can't find that page."
    />
  );
};

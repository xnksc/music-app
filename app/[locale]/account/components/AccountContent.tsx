"use client";
import { Button } from "@/components/Button";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AccountContent = () => {
  const t = useTranslations("Account");
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const { isLoading, subscription, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirect = async () => {
    setLoading(true);

    try {
      const { url, error } = await postData({
        url: `/${locale}/api/create-portal-link`,
      });
      window.location.assign(url);
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>{t("unsub")}</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            {t("subscribe")}
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>{t("sub")}</p>
          <Button
            onClick={redirect}
            className="w-[300px] bg-cyan-600 hover:bg-cyan-700"
            disabled={loading || isLoading}
          >
            {t("manage")}
          </Button>
        </div>
      )}
    </div>
  );
};

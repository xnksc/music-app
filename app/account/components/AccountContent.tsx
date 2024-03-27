"use client";
import { Button } from "@/components/Button";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
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
      const { url, error } = await postData({ url: "/api/create-portal-link" });
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
          <p>No active subscribtion</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>You already subscribed!</p>
          <Button
            onClick={redirect}
            className="w-[300px] bg-cyan-600 hover:bg-cyan-700"
            disabled={loading || isLoading}
          >
            Manage Subscribtion
          </Button>
        </div>
      )}
    </div>
  );
};

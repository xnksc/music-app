import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Modal } from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useEffect } from "react";

export const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  const { session } = useSessionContext();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, onClose, router]);
  return (
    <Modal
      className="z-20"
      title="Welcome back"
      description="Sign in"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={["google"]}
        magicLink
        theme="dark"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                // COLOR ON MODAL BTN
                brand: "#404040",
                brandAccent: "#0891b2",
              },
            },
          },
        }}
      ></Auth>
    </Modal>
  );
};

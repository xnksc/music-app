import { Header } from "@/components/Header";
import { AccountContent } from "./components/AccountContent";

const Account = () => {
  return (
    <div
      className="
          bg-neutral-800 
          rounded-lg 
          h-full 
          w-full 
          overflow-hidden 
          overflow-y-auto
        "
    >
      <Header className="bg-gradient-to-b from-neutral-700">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Account</h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default Account;

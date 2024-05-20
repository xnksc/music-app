"use client";
import { useDebounce } from "@/hooks/useDebounce";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useRouter } from "@/navigation";

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput = ({ placeholder = "" }: SearchInputProps) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 200);
  useEffect(() => {
    const query = {
      title: debouncedValue,
    };
    const url = queryString.stringifyUrl({
      url: "/search",
      query: query,
    });
    router.push(url);
  }, [debouncedValue, router]);
  return (
    <Input
      placeholder={placeholder}
      className="text-[#fffbf3] border-[#7E6363] focus:border-[#c5b79d]"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    ></Input>
  );
};

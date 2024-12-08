import MainTable from "../features/main/table";
import { Input } from "@/components/ui/input";
export default function Home() {
  return (
    <article>
      <Input placeholder="Cari murid" />
      <MainTable />
    </article>
  );
}

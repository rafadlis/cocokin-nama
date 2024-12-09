import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export function SearchNamaLainComponent() {
  return (
    <Form className="w-full max-w-sm flex flex-row gap-2" action={"/"}>
      <Input name="q" placeholder="Cari nama quizziz..." className="w-full" />
      <Button type="submit">Cari</Button>
    </Form>
  );
}

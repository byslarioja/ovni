import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertOctagon } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import { ToggleLanguage } from "@/components/toggle-language";

export const Route = createFileRoute("/delete-account")({
  component: Page,
});

const schema = z.object({ email: z.string().email() });

function Page() {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
  }

  return (
    <main className="grid h-screen place-content-center bg-zinc-100 p-6">
      <ToggleLanguage className="absolute right-5 top-5" />
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <AlertOctagon className="h-9 w-9 stroke-destructive" />
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            {t("deleteAccount:title")}
          </h1>
        </div>

        <p className="mb-2">{t("deleteAccount:why")}</p>

        <p className="mb-8">{t("deleteAccount:sideeffects")}</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("deleteAccount:placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("deleteAccount:description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{t("deleteAccount:submit")}</Button>
          </form>
        </Form>
      </Card>
    </main>
  );
}

function Card({ children }: PropsWithChildren) {
  return (
    <div className="min-w-[400px] rounded-xl bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.05)] ring-1 ring-white/[0.05] dark:bg-zinc-900 dark:ring-zinc-800 md:w-[640px] lg:pb-10">
      {children}
    </div>
  );
}

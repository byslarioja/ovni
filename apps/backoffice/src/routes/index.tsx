import { Link, createFileRoute } from "@tanstack/react-router";
import { Server, Users, Video } from "lucide-react";
import React, { ReactElement, ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: WelcomePage,
});

export function WelcomePage() {
  return (
    <>
      <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative  flex flex-col items-center justify-center selection:bg-primary selection:text-white">
          <main className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <PresentationCard
                title="Gestión de Videos"
                icon={<Video />}
                link="/videos"
              >
                Administra tus vídeos. Descarga, elimina y obtén información
                telemétrica detallada de cada vídeo y del usuario que lo grabó.
              </PresentationCard>

              <PresentationCard title="Usuarios" icon={<Users />} link="/users">
                Accede a la lista completa de usuarios registrados y visualiza
                su información detallada. Además, tienes la capacidad de
                bloquear el acceso a usuarios específicos cuando sea necesario.
              </PresentationCard>

              <PresentationCard title="Soporte y Alojamiento" icon={<Server />}>
                ¿Buscas alojamiento dedicado para tu aplicación? ¿Necesitas
                realizar modificaciones o añadir nuevas funcionalidades?{" "}
                <a
                  target="_blank"
                  href="mailto:sntlln.93@gmail.com"
                  className="rounded-sm underline font-bold hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:hover:text-white"
                >
                  No dudes en escribirme
                </a>
                .
              </PresentationCard>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function PresentationCard({ link, title, children, icon }: CardProps) {
  const Cont = link ? Link : "div";

  const props = link
    ? {
        to: link,
        className:
          "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.05)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-primary lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-primary",
      }
    : {
        className:
          "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.05)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800",
      };

  return (
    <Cont {...props}>
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:size-16">
        {React.cloneElement(icon, {
          className: "size-5 sm:size-6 stroke-primary",
        })}
      </div>

      <div className="pt-3 sm:pt-5">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h2>

        <p className="mt-4 text-sm/relaxed">{children}</p>
      </div>

      {link && (
        <svg
          className="size-6 shrink-0 self-center stroke-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      )}
    </Cont>
  );
}

type CardProps = {
  link?: string;
  title: string;
  children: ReactNode;
  icon: ReactElement;
};

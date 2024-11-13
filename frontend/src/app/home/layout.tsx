import { Sidebar } from "@/components/Sidebar";

const usuarioLogado = "https://github.com/AugustoRibeiro7.png";

export default function AplicationLayout({ children }: { children: React.ReactNode }) {
    return (
    <>
        <div className="flex min-h-[100vh]">
            <Sidebar />
            <main className="flex-grow px-8 pt-10 ">
                {children}
            </main>
        </div>
    </>

    );
  }
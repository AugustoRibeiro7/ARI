import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from 'nookies';
import { SignOut } from "phosphor-react";

export function Logout() {
    const cookies = parseCookies();
    const token = cookies.authToken; // Aqui você pega o token armazenado no cookie
    const router = useRouter();

    const handleLogout = async ()=>{
        // Requisição para o back-end
        try {
            const response = await fetch('http://localhost:3001/usuario/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Envie o token aqui, se necessário
                  },
            });
            if (response.ok) {
                //Remoção do cookie
                destroyCookie(null, 'authToken');

                // Redirecionar para Home
                router.push("/");
            } else {
                alert('Erro ao Deslogar');
            }
        } catch (error) {
            alert('Erro na requisição:'+ error);
            console.error('Erro na requisição:', error);
        }
    }



    return(
        <>
            <button 
                onClick={handleLogout}
                className="border rounded-box px-3 py-2 items-center gap-3 inline-flex text-zinc-500 hover:text-red-900 hover:border-red-900"
            >
                <SignOut className="w-8 h-8 " />
                <p>Sair da Conta</p>
            </button>
        </>
    )
}
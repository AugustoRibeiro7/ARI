import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

// Função para verificar o token, armazená-lo no estado e redirecionar se necessário
export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.authToken;

    if (token) {
      setToken(token); // Armazena o token no estado
    } else {
      router.push('/login'); // Redireciona se o token não for encontrado
    }
  }, [router]);

  return token;
};
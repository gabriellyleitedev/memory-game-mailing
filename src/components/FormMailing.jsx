import React from "react";
import { useState } from "react";

export default function FormMailing({ onStart }) {
    // Um único estado criado que armazena os dados do formulário, ao invés de criar um estado para cada campo
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        celular: '',
        cargo: '',
    });

    // Essa funcção atualiza o estado do formulário, captura e atualiza o estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, // Mantém os dados anteriores do formulário (o que já foi preenchido)
            [name]: value, // Atualiza somente o campo que foi alterado usando "name" no input
        });
    }

    // Essa função gerencia o clique no botão de enviar, 
    const handleSubmit = (e) => {
        e.preventDefault(); // preventDefault para evitar recarregar a página
        onStart(formData); // Passa os dados pro componente pai (App)
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl md:max-w-md max-w-xs w-full border border-slate-100 mx-auto mt-0">
            <h2 className="text-2xl font-bold mb-2 text-slate-800 text-center">Grupo Today</h2>
            <div className="text-slate-600 text-sm mb-6 bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-2">
                <p className="font-semibold text-slate-700 text-center text-base">Desafio do Jogo da Memória!</p>
                <p className="text-xs text-slate-500 font-medium">
                    O objetivo é encontrar todos os 9 pares de cartas correspondentes antes que o cronômetro chegue a zero.
                </p>
                <p className="text-xs text-slate-500 font-medium">
                    Você terá exatamente 1 minuto (60s) para concluir. Preencha seus dados abaixo para liberar o tabuleiro!
                </p>
            </div>

            { /* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Nome completo
                    </label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required // Sinaliza que o campo é obrigatório
                        className="w-full px-4 py-2 bg-slate-50 text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all duration-200"
                        placeholder="Digite seu nome"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required // Sinaliza que o campo é obrigatório
                        className="w-full px-4 py-2 bg-slate-50 text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all duration-200"
                        placeholder="Digite seu email"
                    />
                </div>

                <div>
                    <label htmlFor="celular" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Celular
                    </label>
                    <input
                        type="text"
                        id="celular"
                        name="celular"
                        value={formData.celular}
                        onChange={handleChange}
                        required // Sinaliza que o campo é obrigatório
                        className="w-full px-4 py-2 bg-slate-50 text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all duration-200"
                        placeholder="Digite seu celular"
                    />
                </div>

                <div>
                    <label htmlFor="cargo" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Cargo ou Função
                    </label>
                    <input
                        type="text"
                        id="cargo"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        required // Sinaliza que o campo é obrigatório
                        className="w-full px-4 py-2 bg-slate-50 text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-all duration-200"
                        placeholder="Digite seu cargo"
                    />
                </div>

                <div className="pt-2">
                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-all duration-300 cursor-pointer shadow-md shadow-orange-500/20">
                        Iniciar Desafio
                    </button>
                </div>
            </form>
        </div>
    );
}
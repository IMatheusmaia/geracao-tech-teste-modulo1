# 🚀 Como rodar o projeto

## Requisitos

- **Node.js** versão 20 ou superior
- **Chave de API do Google Gemini**

## Instalação e Configuração

1. **Clone o repositório**
```bash
   git clone [URL_DO_REPOSITORIO]
   cd [NOME_DO_PROJETO]
```

2. **Instale as dependências**
```bash
   npm install
```

3. **Configure a chave de API**
   - Crie um arquivo `.env` no diretório raiz do projeto
   - Adicione sua chave de API do Gemini:
```env
     GEMINI_API_KEY=sua_chave_aqui
```

4. **Execute o projeto**
```bash
   npm run dev
```

5. **Acesse a aplicação**
   - Abra seu navegador e acesse: `http://localhost:3000`

---

## ⚙️ Configurações Avançadas

### Ajustando o modelo do Gemini

Para modificar os parâmetros de geração do modelo, edite o arquivo `src/ai/genkit.ts`:
```typescript
genkit({
  context: {
    temperature: 0.7,      // Controla a criatividade (0.0 - 1.0)
    maxOutputTokens: 1024, // Limite de tokens na resposta
    topP: 0.95,            // Amostragem nucleus
    topK: 40               // Diversidade de tokens
  }
})
```

**Dica:** Valores mais baixos de `temperature` geram respostas mais determinísticas e previsíveis, enquanto valores mais altos aumentam a criatividade.

### Personalizando o tom do assistente

Para ajustar o comportamento e personalidade do assistente:

1. Navegue até `src/ai/flows/generate-response.ts`
2. Modifique a propriedade `prompt` no método `.definePrompt()`
3. Defina as instruções e tom desejados para o assistente

**Exemplo:**
```typescript
.definePrompt({
  prompt: "Você é um assistente prestativo e amigável que responde em português..."
})
```

---

## 📝 Notas

- Certifique-se de manter sua chave de API segura e nunca a compartilhe publicamente
- O arquivo `.env` não deve ser commitado no repositório (já está no `.gitignore`)

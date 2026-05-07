# Quiz V ou F

Site estático para responder questões de Verdadeiro ou Falso sorteadas aleatoriamente a partir do arquivo `questoes.json`.

## Como editar as questões

Abra o arquivo `questoes.json` e siga este formato:

```json
[
  {
    "categoria": "Processo Civil",
    "pergunta": "Os prazos processuais civis, em regra, são contados em dias úteis.",
    "resposta": true,
    "explicacao": "É a regra do art. 219 do CPC."
  }
]
```

Use `true` para verdadeiro e `false` para falso.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os arquivos `index.html`, `style.css`, `app.js` e `questoes.json` para a raiz do repositório.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, selecione:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
5. Salve e aguarde o GitHub gerar o link.

## Observação

O site usa `fetch("questoes.json")`. Por isso, ele funciona normalmente no GitHub Pages ou em um servidor local. Se você abrir o `index.html` diretamente pelo computador, o navegador pode bloquear o carregamento do JSON.

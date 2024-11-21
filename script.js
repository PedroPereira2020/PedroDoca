// Dados para cada fase
const fases = {
    fase1: [
        { nome: 'Bia Arantes', imagem: 'bia-arantes.jpg' },
        { nome: 'Marina Ruy Barbosa', imagem: 'marina-ruy-barbosa.jpg' },
        { nome: 'Bruna Marquezine', imagem: 'bruna-marquezine.jpg' }
    ],
    fase2: [
        { nome: 'Giovanna Chaves', imagem: 'Giovanna-Chaves.jpg' },
        { nome: 'Larissa Manoela', imagem: 'Larissa-Manoela.jpg' },
        { nome: 'Maisa Silva', imagem: 'Maisa-Silva.jpg' }
    ],
    fase3: [
        { nome: 'Lívia Inhudes', imagem: 'Lívia-Inhudes.jpg' },
        { nome: 'Giovanna Grigio', imagem: 'Giovanna-Grigio.jpg' },
        { nome: 'Júlia Gomes', imagem: 'Júlia-Gomes.jpg' }
    ],
    fase4: [
        { nome: 'Aysha Benelli', imagem: 'Aysha-Benelli.jpg' },
        { nome: 'Giulia Garcia', imagem: 'Giulia-Garcia.jpg' },
        { nome: 'Cinthia Cruz', imagem: 'Cinthia-Cruz.jpg' }
    ],
    fase5: [
        { nome: 'Fernanda Concon', imagem: 'Fernanda-Concon.jpg' },
        { nome: 'Victória Diniz', imagem: 'Victória-Diniz.jpg' },
        { nome: 'Esther Marcos', imagem: 'Esther-Marcos.jpg' }
    ],
    fase6: [
        { nome: 'Ana Zimerman', imagem: 'Ana-Zimerman.jpg' },
        { nome: 'Heloisa Camargo', imagem: 'Heloisa-Camargo.jpg' },
        { nome: 'Nyvi Estephan', imagem: 'Nyvi-Estephan.jpg' }
    ],
    fase7: [
        { nome: 'Peyton Roi List', imagem: 'Peyton-Roi-List.jpg' },
        { nome: 'Mary Mouser', imagem: 'Mary-Mouser.jpg' },
        { nome: 'Hannah Kepple', imagem: 'Hannah-Kepple.jpg' }
    ],
    // Adicione mais fases conforme necessário
};

let faseAtual = 'fase1';
let pessoasEscolhidas = []; // Lista para armazenar as pessoas escolhidas na opção "Pego"

// Função para carregar a fase
function carregarFase(fase) {
    const faseTitle = document.getElementById('fase-title');
    const options = document.getElementById('options');
    
    // Atualiza o título da fase
    faseTitle.textContent = `Fase ${fase.charAt(fase.length - 1)}`;
    
    // Limpa as opções anteriores
    options.innerHTML = '';
    
    // Adiciona as novas opções
    fases[fase].forEach((person, index) => {
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');
        personDiv.id = `person${index + 1}`;
        
        personDiv.innerHTML = `
            <img src="${person.imagem}" alt="${person.nome}">
            <p class="name">${person.nome}</p>
            <div class="buttons">
                <button onclick="choose('Pego', 'person${index + 1}')">Pego</button>
                <button onclick="choose('Penso', 'person${index + 1}')">Penso</button>
                <button onclick="choose('Passo', 'person${index + 1}')">Passo</button>
            </div>
        `;
        
        options.appendChild(personDiv);
    });
}

// Carrega a fase 1 ao iniciar a página
carregarFase(faseAtual);

// Objeto para armazenar as escolhas feitas
let choices = {};

// Função chamada ao clicar em uma opção (Pego, Penso, Passo)
function choose(option, person) {
    // Seleciona os dados da pessoa (imagem e nome)
    let personImage = document.querySelector(`#${person} img`).src;
    let personName = document.querySelector(`#${person} .name`).textContent;

    // Salva a escolha no objeto `choices`
    choices[person] = {
        name: personName,
        image: personImage,
        choice: option
    };

    // Adiciona a pessoa à lista de escolhidas na opção "Pego"
    if (option === 'Pego') {
        pessoasEscolhidas.push({ name: personName, image: personImage });
    }

    // Verifica se todas as escolhas foram feitas
    if (Object.keys(choices).length === 3) {
        // Exibe a notificação com todas as escolhas
        showNotification();

        // Mantém a notificação visível por 10 segundos e depois a remove
        setTimeout(() => {
            const notification = document.querySelector('#notification');
            notification.classList.remove('show'); // Esconde a notificação
            notification.innerHTML = ""; // Limpa o conteúdo
            choices = {}; // Reseta as escolhas
        }, 1000); // 1 segundo
    }
}

// Função para exibir a notificação com as escolhas
function showNotification() {
    const notification = document.querySelector('#notification');

    // Cria o conteúdo da notificação com as escolhas feitas
    let notificationContent = "<h3>Suas escolhas:</h3><div class='choices'></div>";

    // Insere a mensagem na notificação
    notification.innerHTML = notificationContent;

    // Seleciona o div onde as escolhas serão inseridas
    const choicesDiv = notification.querySelector('.choices');

    // Adiciona cada escolha à notificação
    for (const key in choices) {
        const person = choices[key];
        const personDiv = document.createElement('div');
        personDiv.classList.add('notification-item');
        personDiv.innerHTML = `
            <img src="${person.image}" alt="${person.name}">
            <p><strong>${person.name}</strong></p>
            <p>${person.choice}</p>
        `;
        choicesDiv.appendChild(personDiv);
    }

    // Exibe a notificação
    notification.classList.add('show');
}

// Função para avançar para a próxima fase
function proximaFase() {
    const faseNumero = parseInt(faseAtual.charAt(faseAtual.length - 1));
    const proximaFase = `fase${faseNumero + 1}`;

    if (fases[proximaFase]) {
        faseAtual = proximaFase;
        carregarFase(faseAtual);
    } else {
        showFinalNotification(); // Exibe a notificação final
    }
}

// Função para exibir a notificação final com as pessoas escolhidas na opção "Pego"
function showFinalNotification() {
    const notification = document.querySelector('#notification');

    // Cria o conteúdo da notificação com as escolhas finais
    let notificationContent = "<h3>Parabéns! Você finalizou as fases e pegou:</h3><div class='choices'></div>";

    // Insere a mensagem na notificação
    notification.innerHTML = notificationContent;
    
    // Seleciona o div onde as escolhas serão inseridas
    const choicesDiv = notification.querySelector('.choices');
    
    // Adiciona cada pessoa escolhida à notificação
    pessoasEscolhidas.forEach((person, index) => {
        if (index % 3 === 0) {  // Aqui é onde se define quantas imagens por linha
            const row = document.createElement('div');
            row.classList.add('row');
            choicesDiv.appendChild(row);
        }
        const lastRow = choicesDiv.lastChild;
        const personDiv = document.createElement('div');
        personDiv.classList.add('notification-item-final');
        personDiv.innerHTML = `
            <img src="${person.image}" alt="${person.name}">
            <p><strong>${person.name}</strong></p>
        `;
        lastRow.appendChild(personDiv);
    });

    // Exibe a notificação
    notification.classList.add('show');
}
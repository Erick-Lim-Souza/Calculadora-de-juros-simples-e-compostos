document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const timeInput = document.getElementById('time');
    const interestTypeSelect = document.getElementById('interest-type');
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    const resultText = document.getElementById('result-text');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    
    // Carregar histórico do localStorage
    loadHistory();
    
    // Event Listeners
    calculateBtn.addEventListener('click', calculateInterest);
    clearBtn.addEventListener('click', clearForm);
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Função para calcular juros
    function calculateInterest() {
        const principal = parseFloat(principalInput.value);
        const rate = parseFloat(rateInput.value);
        const time = parseInt(timeInput.value);
        const interestType = interestTypeSelect.value;
        
        // Validação
        if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
        
        let amount, interest;
        
        if (interestType === 'simple') {
            // Juros simples: A = P(1 + rt)
            interest = principal * (rate / 100) * time;
            amount = principal + interest;
            resultText.innerHTML = `
                Juros Simples:<br>
                Montante Final: R$ ${amount.toFixed(2)}<br>
                Juros Acumulados: R$ ${interest.toFixed(2)}
            `;
        } else {
            // Juros compostos: A = P(1 + r)^t
            amount = principal * Math.pow(1 + (rate / 100), time);
            interest = amount - principal;
            resultText.innerHTML = `
                Juros Compostos:<br>
                Montante Final: R$ ${amount.toFixed(2)}<br>
                Juros Acumulados: R$ ${interest.toFixed(2)}
            `;
        }
        
        // Salvar no histórico
        saveToHistory(principal, rate, time, interestType, amount, interest);
    }
    
    // Função para limpar o formulário
    function clearForm() {
        principalInput.value = '';
        rateInput.value = '';
        timeInput.value = '';
        resultText.textContent = '-';
    }
    
    // Função para salvar no histórico
    function saveToHistory(principal, rate, time, interestType, amount, interest) {
        let history = JSON.parse(localStorage.getItem('interestHistory')) || [];
        
        const calculation = {
            date: new Date().toLocaleString(),
            principal,
            rate,
            time,
            interestType,
            amount,
            interest
        };
        
        history.unshift(calculation); // Adiciona no início do array
        localStorage.setItem('interestHistory', JSON.stringify(history));
        
        loadHistory();
    }
    
    // Função para carregar o histórico
    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('interestHistory')) || [];
        historyList.innerHTML = '';
        
        if (history.length === 0) {
            historyList.innerHTML = '<p>Nenhum cálculo no histórico.</p>';
            return;
        }
        
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const typeText = item.interestType === 'simple' ? 'Juros Simples' : 'Juros Compostos';
            
            historyItem.innerHTML = `
                <p><strong>${item.date}</strong> - ${typeText}</p>
                <p>Capital: R$ ${item.principal.toFixed(2)} | Taxa: ${item.rate}% | Tempo: ${item.time} meses</p>
                <p>Montante: R$ ${item.amount.toFixed(2)} | Juros: R$ ${item.interest.toFixed(2)}</p>
            `;
            
            historyList.appendChild(historyItem);
        });
    }
    
    // Função para limpar o histórico
    function clearHistory() {
        if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
            localStorage.removeItem('interestHistory');
            loadHistory();
        }
    }
});

// ... (mantenha todo o código existente) ...

// Adicione no final do arquivo:

// Controle do menu lateral
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu
    const menuInicio = document.getElementById('menu-inicio');
    const menuInformativo = document.getElementById('menu-informativo');
    const menuVersao = document.getElementById('menu-versao');
    
    // Conteúdos
    const mainContent = document.querySelector('.main-content .container');
    const infoContent = document.querySelector('.info-content');
    const versionContent = document.querySelector('.version-content');
    
    // Event listeners para os menus
    menuInicio.addEventListener('click', function() {
        setActiveMenu(menuInicio);
        mainContent.style.display = 'block';
        infoContent.style.display = 'none';
        versionContent.style.display = 'none';
    });
    
    menuInformativo.addEventListener('click', function() {
        setActiveMenu(menuInformativo);
        mainContent.style.display = 'none';
        infoContent.style.display = 'block';
        versionContent.style.display = 'none';
    });
    
    menuVersao.addEventListener('click', function() {
        setActiveMenu(menuVersao);
        mainContent.style.display = 'none';
        infoContent.style.display = 'none';
        versionContent.style.display = 'block';
    });
    
    // Função para definir o menu ativo
    function setActiveMenu(activeItem) {
        document.querySelectorAll('.sidebar-menu li').forEach(item => {
            item.classList.remove('active');
        });
        activeItem.classList.add('active');
    }
});
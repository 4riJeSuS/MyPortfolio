const track = document.querySelector('.horizontal-track');
let isDown = false;
let startX;
let scrollLeft;
let moved = false;

// LÓGICA DE ARRASTAR COM O RATO
track.addEventListener('mousedown', (e) => {
    if (document.querySelector('.card.expanded')) return;
    isDown = true;
    moved = false;
    track.classList.add('active');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseleave', () => {
    isDown = false;
});

track.addEventListener('mouseup', () => {
    isDown = false;
});

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - track.offsetLeft;
    const dist = x - startX;
    if (Math.abs(dist) > 5) { // Se moveu mais de 5px, é um arrasto
        moved = true;
        e.preventDefault();
        const walk = dist * 2;
        track.scrollLeft = scrollLeft - walk;
    }
});

// FUNÇÃO DE EXPANDIR CARD (Apenas para abrir)
function expandCard(card) {
    // Se estivermos a arrastar ou se o card já estiver aberto, não faz nada
    if (moved || card.classList.contains('expanded')) return;

    const container = document.querySelector('.container');

    // Fecha qualquer outro card que possa estar aberto
    document.querySelectorAll('.card').forEach(c => c.classList.remove('expanded'));

    // Abre o card selecionado
    card.classList.add('expanded');
    container.style.overflowY = 'hidden';
    
    // Centraliza o card no ecrã após a animação
    setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 100);
}

// FUNÇÃO PARA FECHAR O CARD (Chamada pelo botão Voltar)
function closeCard(event, button) {
    // Impede que o clique "atravesse" o botão e chegue ao card (o que causaria conflitos)
    event.stopPropagation();
    
    const card = button.closest('.card');
    const container = document.querySelector('.container');
    
    card.classList.remove('expanded');
    container.style.overflowY = 'scroll';
}

// FECHAR COM A TECLA ESCAPE
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll('.card').forEach(c => c.classList.remove('expanded'));
        document.querySelector('.container').style.overflowY = 'scroll';
    }
});
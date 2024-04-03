//modelo de objeto 
// array
let participantes = [
  {
    nome: "Walter Barros",
    email: "walterb@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "André Souza",
    email: "andres@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 10, 30),
    dataCheckIn: null
  },
  {
    nome: "Maria Silva",
    email: "marias@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 14, 45),
    dataCheckIn: new Date(2024, 2, 24, 18, 15)
  },
  {
    nome: "João Santos",
    email: "joaos@gmail.com",
    dataInscricao: new Date(2024, 2, 19, 8, 0),
    dataCheckIn: new Date(2024, 2, 22, 10, 30)
  },
  {
    nome: "Carla Oliveira",
    email: "carlao@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 16, 20),
    dataCheckIn: new Date(2024, 2, 21, 19, 45)
  },
  {
    nome: "Pedro Costa",
    email: "pedroc@gmail.com",
    dataInscricao: new Date(2024, 2, 17, 11, 10),
    dataCheckIn: null
  },
  {
    nome: "Ana Vieira",
    email: "anav@gmail.com",
    dataInscricao: new Date(2024, 2, 16, 9, 30),
    dataCheckIn: new Date(2024, 2, 19, 11, 45)
  },
  {
    nome: "Ricardo Ferreira",
    email: "ricardof@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 13, 15),
    dataCheckIn: new Date(2024, 2, 18, 15, 30)
  },
  {
    nome: "Sofia Santos",
    email: "sofias@gmail.com",
    dataInscricao: new Date(2024, 2, 14, 18, 40),
    dataCheckIn: null
  },
  {
    nome: "Daniel Lima",
    email: "danil@gmail.com",
    dataInscricao: new Date(2024, 2, 13, 20, 50),
    dataCheckIn: new Date(2024, 2, 16, 23, 20)
  }
];
// (ano, mês (zero based), dia, hora, minuto)
// função arrow 
const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
   let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
// condicional
   if(participante.dataCheckIn == null) {
dataCheckIn = `
    <button
    data-email= "${participante.email}"
    onclick="fazerCheckIn(event)"
    >
    Confirmar check-in
    </button>
`
   }
  return ` <tr><td><strong> ${participante.nome} </strong><br><small> ${participante.email} </small></td><td> ${dataInscricao} </td><td> ${dataCheckIn} </td></tr> `
}
// deve ser usado o acento grave (crase) para concatenar os elementos
const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição
  for(let participante of participantes) {
      output = output + criarNovoParticipante(participante)
  }
    // substituir informação do HTML
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosFormulario = new FormData(event.target)

  const participante = {
    nome : dadosFormulario.get('nome'),
    email: dadosFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )
 
  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }
  

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar
  event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[email="email"]').value = ""

}

const fazerCheckIn = (event) => {
    //confirmar fazer checkin
    const mensagemConfirmacao = 'Tem certeza que deseja fazer Check-In?'

    if(confirm(mensagemConfirmacao) == false) {
        return
    }
  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  //atualizar a lista de participantes
  participante.dataCheckIn = new Date()
  // atualizar a lista de participantes
  atualizarLista(participantes)

}
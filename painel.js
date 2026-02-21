<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATJ3395a1qbFwThnszljqiVtstKFGggBI",
  authDomain: "barbearia-229f6.firebaseapp.com",
  projectId: "barbearia-229f6",
  storageBucket: "barbearia-229f6.firebasestorage.app",
  messagingSenderId: "161670457315",
  appId: "1:161670457315:web:4de0968caea1643e5c62d6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("formAgendamento");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const servico = document.getElementById("servico").value;

  try {

    // 🔎 Verificar se já existe agendamento nesse horário
    const q = query(
      collection(db, "agendamentos"),
      where("data", "==", data),
      where("horario", "==", hora)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      alert("Esse horário já está ocupado!");
      return;
    }

    // 💾 Salvar se estiver livre
    await addDoc(collection(db, "agendamentos"), {
      nome,
      servico,
      data,
      horario: hora,
      status: "pendente",
      criadoEm: serverTimestamp()
    });

    alert("Agendamento salvo!");
    form.reset();

  } catch (erro) {
    console.error(erro);
    alert("Erro ao salvar");
  }
});
</script>
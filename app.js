const express = require('express');

const app = express();
const port = 3000;

// Her isteğin saatini, yöntemini ve adresini terminale yaz.
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

const defaultTaskFields = {
  description: '',
  assignee: '',
  status: 'pending',
  priority: 'medium',
};

const tasks = [
  {
    id: 1,
    title: 'Kasım harcamalarını kontrol et',
    description: 'Alışveriş fişlerini ve abonelik ödemelerini gözden geçir.',
    assignee: 'Deniz',
    status: 'pending',
    priority: 'medium',
  },
];

let nextId = 2;
const taskNotFound = { message: 'Görev bulunamadı.' };

function findTaskIndex(id) {
  const taskId = Number(id);
  return tasks.findIndex((task) => task.id === taskId);
}

function readTaskFields(body, defaults = defaultTaskFields) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'Görev bilgilerini JSON nesnesi olarak gönder.' };
  }

  const {
    title = defaults.title,
    description = defaults.description,
    assignee = defaults.assignee,
    status = defaults.status,
    priority = defaults.priority,
  } = body;

  if (typeof title !== 'string' || title.trim() === '') {
    return { error: 'Görev başlığı zorunlu.' };
  }

  const textFields = [description, assignee, status, priority];
  if (!textFields.every((value) => typeof value === 'string')) {
    return { error: 'Açıklama, atanan kişi, durum ve öncelik metin olmalı.' };
  }

  return { fields: { title: title.trim(), description, assignee, status, priority } };
}

// Bütün görevleri listele.
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Bir görevin detayını getir.
app.get('/tasks/:id', (req, res) => {
  const index = findTaskIndex(req.params.id);
  if (index === -1) {
    return res.status(404).json(taskNotFound);
  }

  res.json(tasks[index]);
});

// Yeni görev ekle. Yeni görev bekleyen durumda başlar.
app.post('/tasks', (req, res) => {
  const { fields, error } = readTaskFields({ ...req.body, status: 'pending' });
  if (error) {
    return res.status(400).json({ message: error });
  }

  const task = { id: nextId, ...fields };
  nextId += 1;
  tasks.push(task);
  res.status(201).json(task);
});

// Bir görevin gönderilen alanlarını güncelle.
app.patch('/tasks/:id', (req, res) => {
  const index = findTaskIndex(req.params.id);
  if (index === -1) {
    return res.status(404).json(taskNotFound);
  }

  const currentTask = tasks[index];
  const { fields, error } = readTaskFields(req.body, currentTask);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const task = { id: currentTask.id, ...fields };
  tasks[index] = task;
  res.json(task);
});

// Bir görevi sil.
app.delete('/tasks/:id', (req, res) => {
  const index = findTaskIndex(req.params.id);
  if (index === -1) {
    return res.status(404).json(taskNotFound);
  }

  const [removedTask] = tasks.splice(index, 1);
  res.json({ id: removedTask.id, message: 'Görev silindi.' });
});

app.listen(port, '127.0.0.1').once('listening', () => {
  console.log(`TaskFlow çalışıyor: http://127.0.0.1:${port}/tasks`);
});
